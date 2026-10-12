
import { useState } from "react";

const categories = [
  "All",
  "Meditation",
  "Breathing",
  "Sleep",
  "Stress Relief",
];

const videos = [
  {
    title: "5-Minute Guided Meditation",
    category: "Meditation",
    duration: "5 min",
    description: "Take a quiet pause and bring your attention to the present.",
    videoId: "inpok4MKVLM",
  },
  {
    title: "Calming Breathing Exercise",
    category: "Breathing",
    duration: "5 min",
    description: "Follow a gentle breathing practice to unwind.",
    videoId: "aXItOY0sLRY",
  },
  {
    title: "Relaxing Music for Sleep",
    category: "Sleep",
    duration: "10 min",
    description: "Create a peaceful atmosphere before bedtime.",
    videoId: "1ZYbU82GVz4",
  },
  {
    title: "Mindfulness for Stress",
    category: "Stress Relief",
    duration: "5 min",
    description: "Pause, relax your shoulders and take a mindful break.",
    videoId: "ssss7V1_eyA",
  },
];

export default function Meditation() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter(
          (video) => video.category === activeCategory
        );

  return (
    <section
      id="meditation"
      className="bg-[#fff5f7] px-6 py-20 text-[#593d49]"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b45e7b]">
          Your peaceful corner
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Meditation & Relaxation 🌸
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-[#765e69]">
          Take a break from studies. Choose a short guided session
          and give yourself a moment to relax.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? "border-[#e8a1b0] bg-[#e8a1b0] text-[#593d49]"
                  : "border-[#f0d6df] bg-white text-[#765e69] hover:bg-[#fce4ec]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredVideos.map((video) => (
            <article
              key={video.videoId}
              className="overflow-hidden rounded-2xl border border-[#f0d6df] bg-white shadow-sm"
            >
              <div className="relative aspect-video bg-[#fce4ec]">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                  title={video.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="p-5">
                <span className="rounded-full bg-[#fce4ec] px-3 py-1 text-xs text-[#96516c]">
                  {video.category}
                </span>

                <h3 className="mt-4 text-lg font-semibold">
                  {video.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#765e69]">
                  {video.description}
                </p>

                <p className="mt-3 text-xs text-[#a17c8b]">
                  ⏱ {video.duration}
                </p>

                <button
                  onClick={() => setActiveVideo(video)}
                  className="mt-4 w-full rounded-xl bg-[#fce4ec] px-4 py-3 text-sm font-semibold hover:bg-[#f5d1de]"
                >
                  View session details
                </button>
              </div>
            </article>
          ))}
        </div>

        {activeVideo && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#593d49]/50 p-5"
            onClick={() => setActiveVideo(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={activeVideo.title}
              className="w-full max-w-md rounded-3xl bg-white p-7 text-[#593d49] shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="text-3xl">🌷</div>

              <h3 className="mt-4 text-2xl font-bold">
                {activeVideo.title}
              </h3>

              <p className="mt-3 leading-7 text-[#765e69]">
                {activeVideo.description}
              </p>

              <p className="mt-3 text-sm text-[#a17c8b]">
                Duration: {activeVideo.duration}
              </p>

              <button
                onClick={() => setActiveVideo(null)}
                className="mt-6 w-full rounded-xl bg-[#e8a1b0] px-5 py-3 font-semibold hover:bg-[#d9899e]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
