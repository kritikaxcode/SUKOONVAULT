function App() {
  return (
    <div className="min-h-screen bg-[#070711] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#070711]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              SUKOON
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                VAULT
              </span>
            </h1>

            <p className="text-[9px] tracking-[0.25em] text-gray-500">
              YOUR SPACE TO BREATHE
            </p>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm text-gray-300 transition hover:text-white">
              Home
            </a>

            <a href="#how" className="text-sm text-gray-300 transition hover:text-white">
              How It Works
            </a>

            <a href="#support" className="text-sm text-gray-300 transition hover:text-white">
              Support
            </a>

            <a href="#about" className="text-sm text-gray-300 transition hover:text-white">
              About
            </a>
          </div>

          {/* Button */}
          <button className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold transition hover:scale-105">
            Get Support
          </button>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
      >

        {/* Background glow */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">

          {/* LEFT */}
          <div>

            <div className="mb-6 inline-flex rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2">
              <span className="text-sm text-purple-300">
                ✦ A safe space for students
              </span>
            </div>


            <h2 className="text-5xl font-bold leading-tight md:text-7xl">

              You don't have to
              <br />

              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                handle everything
              </span>

              <br />

              alone.

            </h2>


            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
              SUKOONVAULT is a privacy-first support platform designed
              to help students understand what they're going through
              and find the right support when they need it.
            </p>


            <div className="mt-9 flex flex-wrap gap-4">

              <button className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 px-8 py-4 font-semibold shadow-lg shadow-purple-500/20 transition hover:scale-105">
                Get Support →
              </button>

              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-gray-300 backdrop-blur transition hover:border-purple-400/50">
                Learn More
              </button>

            </div>


            <div className="mt-10 flex gap-8 text-sm text-gray-500">

              <span>🔒 Private</span>
              <span>🤝 Human Support</span>
              <span>24/7 Access</span>

            </div>

          </div>


          {/* RIGHT — visual card */}
          <div className="relative">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

              {/* Fake chat header */}
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 text-xl">
                  ☁
                </div>

                <div>
                  <h3 className="font-semibold">
                    Sukoon Assistant
                  </h3>

                  <p className="text-xs text-green-400">
                    ● Here to listen
                  </p>
                </div>

              </div>


              {/* Chat */}
              <div className="space-y-5 py-6">

                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-purple-500/20 p-4 text-sm text-gray-200">
                  I've been feeling really overwhelmed lately.
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-white/10 bg-white/5 p-4 text-sm leading-6 text-gray-300">
                  I'm glad you reached out. You don't have to
                  figure everything out at once. Let's take it
                  one step at a time. 💜
                </div>

                <div className="max-w-[75%] rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm text-gray-300">
                  What has been feeling the hardest recently?
                </div>

              </div>


              {/* Input */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">

                <span className="flex-1 text-sm text-gray-500">
                  Share what's on your mind...
                </span>

                <button className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 px-4 py-2">
                  ↑
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section
        id="support"
        className="border-t border-white/5 px-6 py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
              What we offer
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Support that meets you
              <span className="text-purple-400"> where you are.</span>
            </h2>

            <p className="mt-5 text-gray-400">
              Different situations need different kinds of support.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-purple-400/30">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
                ✦
              </div>

              <h3 className="text-xl font-semibold">
                AI-Guided Support
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                A confidential first step to talk about what
                you're experiencing and understand what kind
                of support might help.
              </p>

              <button className="mt-6 text-sm font-medium text-purple-400">
                Explore →
              </button>

            </div>


            {/* Card 2 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
                ♡
              </div>

              <h3 className="text-xl font-semibold">
                Human Connection
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Connect with trusted counsellors and support
                services when talking to a person is what
                you need.
              </p>

              <button className="mt-6 text-sm font-medium text-cyan-400">
                Find Support →
              </button>

            </div>


            {/* Card 3 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                🛡
              </div>

              <h3 className="text-xl font-semibold">
                Crisis Resources
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                Quick access to verified emergency resources
                and human support when immediate help is needed.
              </p>

              <button className="mt-6 text-sm font-medium text-blue-400">
                View Resources →
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="bg-white/[0.02] px-6 py-28"
      >

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.3em] text-purple-400">
              Simple by design
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              How SUKOONVAULT works
            </h2>

          </div>


          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <Step
              number="01"
              title="Check In"
              description="Tell us what you're experiencing in a private and judgment-free space."
            />

            <Step
              number="02"
              title="Understand"
              description="Get guidance based on your situation and understand possible next steps."
            />

            <Step
              number="03"
              title="Get Support"
              description="Connect with the right human or professional support when needed."
            />

          </div>

        </div>

      </section>


      {/* ================= PRIVACY ================= */}
      <section
        id="about"
        className="px-6 py-28"
      >

        <div className="mx-auto max-w-5xl rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/5 p-10 text-center md:p-16">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-2xl">
            🔒
          </div>

          <h2 className="text-3xl font-bold md:text-4xl">
            Your privacy comes first.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            SUKOONVAULT is designed around privacy, dignity and
            responsible support. Your identity should never be
            the price of asking for help.
          </p>

          <p className="mt-8 text-lg font-medium text-purple-300">
            "Your identity stays private. Your well-being doesn't have to wait."
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <h2 className="font-bold">
              SUKOON<span className="text-cyan-400">VAULT</span>
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              A safe space to breathe.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            © 2026 SUKOONVAULT. Built for students.
          </p>

        </div>

      </footer>

    </div>
  )
}


/* ================= STEP COMPONENT ================= */

function Step({ number, title, description }) {

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#0c0c17] p-8">

      <span className="text-sm font-semibold text-cyan-400">
        {number}
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-400">
        {description}
      </p>

    </div>
  )
}


export default App