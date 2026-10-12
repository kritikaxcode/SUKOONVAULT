function Dashboard() {
  return (
    <section className="min-h-screen bg-[#070711] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
            Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Your Wellbeing
          </h1>

          <p className="mt-2 text-gray-400">
            Track your mood, stress and sleep.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Today's Mood
            </p>

            <p className="mt-4 text-4xl font-bold">
              😊
            </p>

            <p className="mt-2 text-gray-300">
              Feeling okay
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Stress Level
            </p>

            <p className="mt-4 text-4xl font-bold">
              3/5
            </p>

            <p className="mt-2 text-gray-300">
              Moderate
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-gray-400">
              Sleep
            </p>

            <p className="mt-4 text-4xl font-bold">
              7 hrs
            </p>

            <p className="mt-2 text-gray-300">
              Last night
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">
              Recent Check-ins
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Your recent wellbeing entries will appear here.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">
              Overall Wellbeing
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Keep checking in regularly to understand your
              wellbeing patterns.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;