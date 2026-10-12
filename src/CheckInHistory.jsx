import { useEffect, useState } from "react";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

function CheckInHistory() {
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const fetchCheckIns = async () => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/check_ins?select=id,mood,stress_level,sleep_hours,note,created_at&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch check-ins");
      }

      const data = await response.json();

      setCheckIns(data || []);
    } catch (error) {
      console.error("HISTORY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMood = (mood) => {
    const moods = {
      1: "😞 Very low",
      2: "😕 Low",
      3: "😐 Okay",
      4: "🙂 Good",
      5: "😄 Great",
    };

    return moods[mood] || "Unknown";
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
            History
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Your Recent Check-ins
          </h2>

          <p className="mt-2 text-gray-400">
            Review your previous mood, stress and sleep entries.
          </p>
        </div>

        {loading && (
          <p className="text-gray-400">
            Loading check-ins...
          </p>
        )}

        {!loading && checkIns.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-gray-400">
            No check-ins yet.
          </div>
        )}

        {!loading && checkIns.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {checkIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">
                    {getMood(checkIn.mood)}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(
                      checkIn.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-gray-500">
                      Stress
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {checkIn.stress_level}/5
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-3">
                    <p className="text-xs text-gray-500">
                      Sleep
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {checkIn.sleep_hours} hrs
                    </p>
                  </div>

                </div>

                {checkIn.note && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-500">
                      Note
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-300">
                      {checkIn.note}
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default CheckInHistory;