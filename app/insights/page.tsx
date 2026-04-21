import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const supabase = await createClient();

  // Fetch the session strictly server-side
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  let logs: any[] = [];
  
  if (user && !authError) {
    const { data: fetchedLogs } = await supabase
      .from('mood_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (fetchedLogs) {
      logs = fetchedLogs;
    }
  }

  return (
    <main 
      className="flex flex-col items-center justify-start min-h-screen relative" 
      style={{ paddingTop: "8rem", paddingBottom: "8rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", zIndex: 10 }}
    >
      <div className="w-full max-w-4xl">
        <h1 
          className="text-4xl tracking-tight leading-tight mb-2"
          style={{ color: "rgba(15,15,25,0.88)", fontWeight: 300 }}
        >
          Your Telemetry
        </h1>
        <p className="mb-10 text-lg" style={{ color: "rgba(15,15,25,0.45)", fontWeight: 300 }}>
          Historical data patterns and interventions.
        </p>

        {/* The Glass Container */}
        <div 
          className="w-full rounded-3xl overflow-hidden p-6 md:p-10"
          style={{
            background: "rgba(255,255,255,0.48)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <h3 className="text-xl font-medium mb-2" style={{ color: "rgba(15,15,25,0.7)" }}>
                No history found. Complete your first check-in!
              </h3>
              <p style={{ color: "rgba(15,15,25,0.4)", fontSize: "15px" }}>
                Your insights will automatically generate here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="w-full flex flex-col md:flex-row justify-between md:items-center p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow: "0 4px 24px rgba(31, 38, 135, 0.04)"
                  }}
                >
                  <div className="flex flex-col">
                    <span 
                      className="text-xs uppercase tracking-widest font-semibold mb-1"
                      style={{ color: "rgba(196,181,253,0.9)" }}
                    >
                      {new Date(log.created_at).toLocaleDateString(undefined, { 
                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' 
                      })}
                    </span>
                    <span style={{ color: "rgba(15,15,25,0.8)", fontSize: "16px", fontWeight: 500 }}>
                      Energy: {log.energy_level} / Stress: {log.stress_level}
                    </span>
                    {log.context_note && (
                      <span className="mt-1" style={{ color: "rgba(15,15,25,0.45)", fontSize: "14px" }}>
                        "{log.context_note}"
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
