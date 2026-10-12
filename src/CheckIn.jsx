import { useState } from "react";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

function getAnonymousSessionId() {
  let sessionId = localStorage.getItem(
    "sukoonvault_session_id"
  );

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "sukoonvault_session_id",
      sessionId
    );
  }

  return sessionId;
}

function CheckIn() {
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState("");
  const [sleep, setSleep] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitCheckIn = async (event) => {
    event.preventDefault();

    if (!mood || !stress || !sleep) {
      setMessage(
        "Please fill all required fields."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const sessionId =
        getAnonymousSessionId();

      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/check_ins`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization:
              `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },

          body: JSON.stringify({
            session_id: sessionId,
            user_id: null,
            mood: Number(mood),
            stress_level: Number(stress),
            sleep_hours: Number(sleep),
            note: note.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.text();

        throw new Error(
          errorData ||
            "Check-in failed"
        );
      }

      setMessage(
        "Check-in saved successfully."
      );

      setMood("");
      setStress("");
      setSleep("");
      setNote("");
    } catch (error) {
      console.error(
        "CHECK-IN ERROR:",
        error
      );

      setMessage(
        "Unable to save check-in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
            Daily Check-in
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            How are you feeling today?
          </h2>

          <p className="mt-2 text-gray-400">
            Take a moment to check in with yourself.
          </p>
        </div>

        <form
          onSubmit={submitCheckIn}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >

          {/* MOOD */}

          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Today's Mood
            </label>

            <div className="grid grid-cols-5 gap-3">
              {[
                ["1", "😞", "Very low"],
                ["2", "😕", "Low"],
                ["3", "😐", "Okay"],
                ["4", "🙂", "Good"],
                ["5", "😄", "Great"],
              ].map(
                ([value, emoji, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      setMood(value)
                    }
                    className={`rounded-xl border p-3 transition ${
                      mood === value
                        ? "border-purple-400 bg-purple-500/20"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="text-2xl">
                      {emoji}
                    </div>

                    <div className="mt-1 text-xs text-gray-400">
                      {label}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* STRESS */}

          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Stress Level
            </label>

            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map(
                (value) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      setStress(
                        String(value)
                      )
                    }
                    className={`rounded-xl border py-3 text-sm transition ${
                      stress ===
                      String(value)
                        ? "border-purple-400 bg-purple-500/20 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.07]"
                    }`}
                  >
                    {value}
                  </button>
                )
              )}
            </div>

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* SLEEP */}

          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              How many hours did you sleep?
            </label>

            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleep}
              onChange={(event) =>
                setSleep(
                  event.target.value
                )
              }
              placeholder="e.g. 7.5"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
            />
          </div>

          {/* NOTE */}

          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Anything you'd like to share?
            </label>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(
                  event.target.value
                )
              }
              rows={4}
              placeholder="Write anything about how you're feeling..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
            />
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Check-in"}
          </button>

          {message && (
            <p className="text-center text-sm text-gray-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default CheckIn;