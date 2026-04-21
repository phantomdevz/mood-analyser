import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Fallback Media in case the Supabase table 'media_vault' is empty
// Fallback Media: Real, official Spotify Editorial Playlists
const FALLBACK_MEDIA: Record<string, string> = {
  relax: 'spotify:playlist:37i9dQZF1DX4sWSpwq3LiO', // Chill Hits
  uplift: 'spotify:playlist:37i9dQZF1DXdPec7aLTmlC', // Happy Hits
  focus: 'spotify:playlist:37i9dQZF1DWWQRwui0ExPn', // Lofi Beats
  balance: 'spotify:playlist:37i9dQZF1DXcBWIGoYBM5M' // Today's Top Hits
};

// Dynamic Vibe Categorization
function getVibeCategory(energy: number, stress: number): string {
  if (stress > 70) return 'relax';
  if (energy < 30) return 'uplift';
  if (energy > 70 && stress < 40) return 'focus';
  return 'balance';
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // 1. Identity Check
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = authData.user;

    const body = await req.json();
    const { energy, stress, context, notes } = body;
    const userNote = context || notes || "";

    if (energy === undefined || stress === undefined) {
      return NextResponse.json({ error: "Missing energy or stress values" }, { status: 400 });
    }

    // 2. Categorization
    const vibe = getVibeCategory(energy, stress);

    let activities = null;
    let cacheHit = false;

    // 3. The Cache (Feature 1)
    try {
      const { data: cachedData, error: cacheError } = await supabase
        .from('cached_interventions')
        .select('response_json')
        .eq('vibe_category', vibe)
        .maybeSingle();

      if (!cacheError && cachedData && cachedData.response_json) {
        activities = typeof cachedData.response_json === 'string'
          ? JSON.parse(cachedData.response_json)
          : cachedData.response_json;
        cacheHit = true;
      }
    } catch (e) {
      console.warn("Cache read failed, proceeding to fallback", e);
    }

    // 4. AI Fallback
    if (!cacheHit) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API key is missing from .env.local");
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are a mood-analysis AI. 
      The user's energy level is ${energy}/100. 
      The user's stress level is ${stress}/100. 
      Their 'vibe' is categorized as: ${vibe}.
      The user's context note is: "${userNote || 'No note provided'}". 
      
      Suggest 3 short, highly specific, actionable activities to help them balance their state.
      
      IMPORTANT: You must respond ONLY with a valid JSON array. Do not include markdown formatting like \`\`\`json. 
      The JSON array must contain objects with exact keys: "title", "duration", "description".`;

      const result = await model.generateContent(prompt);
      const output = result.response.text();

      const cleaned = output.replace(/```json/g, "").replace(/```/g, "").trim();
      activities = JSON.parse(cleaned);

      // Cache the response
      try {
        await supabase.from('cached_interventions').insert({
          vibe_category: vibe,
          response_json: activities
        });
      } catch (e) {
        console.warn("Failed to write to cache", e);
      }
    }

    // Logging User Insight safely
    console.log("Saving to DB for user:", user.id);
    try {
      const { error: insertError } = await supabase
        .from('mood_logs')
        .insert({
          user_id: user.id,
          energy_level: Number(energy),
          stress_level: Number(stress),
          context_note: userNote || null
        });

      if (insertError) {
        console.warn("Supabase insert error:", insertError.message);
      }
    } catch (e) {
      console.warn("Failed to log mood", e);
    }

    // 5. Audio Vault (Feature 3)
    let spotifyUri = null;
    try {
      const { data: mediaVault, error: mediaError } = await supabase
        .from('media_vault')
        .select('spotify_uri')
        .eq('vibe_category', vibe);

      if (!mediaError && mediaVault && mediaVault.length > 0) {
        // Grab a random URI mathematically
        const randomIndex = Math.floor(Math.random() * mediaVault.length);
        spotifyUri = mediaVault[randomIndex].spotify_uri;
      }
    } catch (e) {
      console.warn("Failed to retrieve media", e);
    }

    // Safely inject fallback if the database table is completely empty
    if (!spotifyUri) {
      spotifyUri = FALLBACK_MEDIA[vibe];
    }

    // 6. Final Response
    return NextResponse.json({
      activities,
      spotify_uri: spotifyUri
    });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return NextResponse.json({ error: error.message || "Internal execution error" }, { status: 500 });
  }
}
