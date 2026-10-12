export default function Decorations() {
  return (
    <>
      {/* Soft clouds */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-28 h-8 w-24 rounded-full bg-white/60 blur-xl" />
        <div className="absolute right-[12%] top-44 h-10 w-32 rounded-full bg-white/70 blur-xl" />

        {/* Mountain landscape at the bottom */}
        <svg
          className="absolute bottom-0 left-0 h-48 w-full opacity-40 md:h-64"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 230 L180 80 L310 190 L490 45 L700 220 L890 90 L1080 210 L1260 65 L1440 220 L1440 320 L0 320 Z"
            fill="#a7bca2"
          />
          <path
            d="M0 265 L220 155 L390 245 L620 115 L820 255 L1040 145 L1240 235 L1440 140 L1440 320 L0 320 Z"
            fill="#789879"
          />
          <path
            d="M0 285 L180 220 L360 275 L570 190 L790 280 L1000 205 L1220 275 L1440 210 L1440 320 L0 320 Z"
            fill="#557c60"
          />
        </svg>

        {/* Small natural accent circles */}
        <div className="absolute left-8 top-[48%] h-2 w-2 rounded-full bg-emerald-300/50" />
        <div className="absolute right-12 top-[62%] h-3 w-3 rounded-full bg-green-300/40" />
      </div>
    </>
  );
}