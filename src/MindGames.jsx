
import { useState, useEffect } from "react";

const games = [
  {
    id: "breathing",
    name: "Breathing Bubble",
    emoji: "🫧",
    description: "Take a mindful breathing break.",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "memory",
    name: "Memory Match",
    emoji: "🧠",
    description: "Match the pairs of cards.",
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "zen",
    name: "Zen Garden",
    emoji: "🌿",
    description: "Create your own peaceful garden.",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "words",
    name: "Word Search",
    emoji: "🔤",
    description: "Find calming words in the grid.",
    color: "from-orange-500/20 to-yellow-500/10",
  },
];

const symbols = ["🌸", "🌙", "⭐", "🍀", "🌈", "🦋"];

const wordGrid = [
  ["C", "A", "L", "M", "X", "Q"],
  ["B", "R", "E", "A", "T", "H"],
  ["P", "E", "A", "C", "E", "Z"],
  ["F", "O", "C", "U", "S", "M"],
  ["J", "O", "Y", "X", "Y", "K"],
  ["S", "M", "I", "L", "E", "P"],
];

const wordsToFind = ["CALM", "PEACE", "FOCUS", "JOY", "SMILE"];

function BreathingGame() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Ready?");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;

    const phases = [
      { name: "Breathe in", duration: 4 },
      { name: "Hold gently", duration: 2 },
      { name: "Breathe out", duration: 6 },
    ];

    let elapsed = 0;
    let phaseIndex = 0;
    let remaining = phases[0].duration;

    setPhase(phases[0].name);
    setSeconds(remaining);

    const timer = setInterval(() => {
      elapsed += 1;
      remaining -= 1;

      if (elapsed >= 60) {
        clearInterval(timer);
        setRunning(false);
        setPhase("Session complete 🌿");
        setSeconds(0);
        return;
      }

      if (remaining <= 0) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        remaining = phases[phaseIndex].duration;
        setPhase(phases[phaseIndex].name);
      }

      setSeconds(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  return (
    <div className="text-center">
      <p className="text-gray-400">One-minute breathing break</p>

      <div className="my-8 flex justify-center">
        <div
          className={`flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-500/40 text-center shadow-xl shadow-purple-500/10 ${
            running ? "animate-pulse" : ""
          }`}
        >
          <div>
            <p className="text-xl font-semibold">{phase}</p>
            <p className="mt-2 text-3xl">{seconds || "🫧"}</p>
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-gray-400">
        Breathe comfortably. Skip breath holds if they feel uncomfortable.
      </p>

      <button
        onClick={() => {
          setRunning(!running);
          if (running) setPhase("Paused");
        }}
        className="rounded-xl bg-purple-500 px-6 py-3 font-semibold hover:bg-purple-400"
      >
        {running ? "Stop" : "Start breathing"}
      </button>
    </div>
  );
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function restart() {
    setCards(
      [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({
          id: index,
          symbol,
        }))
    );
    setSelected([]);
    setMatched([]);
    setMoves(0);
  }

  useEffect(() => {
    restart();
  }, []);

  function chooseCard(card) {
    if (
      selected.includes(card.id) ||
      matched.includes(card.id) ||
      selected.length === 2
    ) return;

    const next = [...selected, card.id];
    setSelected(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);

      const first = cards.find((c) => c.id === next[0]);
      const second = cards.find((c) => c.id === next[1]);

      if (first.symbol === second.symbol) {
        setMatched((m) => [...m, ...next]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  }

  return (
    <div>
      <p className="mb-4 text-center text-gray-400">
        Moves: {moves} · Matched: {matched.length / 2}/6
      </p>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => {
          const visible =
            selected.includes(card.id) ||
            matched.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => chooseCard(card)}
              className={`flex aspect-square items-center justify-center rounded-xl border text-3xl ${
                visible
                  ? "border-purple-400 bg-purple-500/20"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {visible ? card.symbol : "?"}
            </button>
          );
        })}
      </div>

      {matched.length === 12 && (
        <p className="mt-4 text-center text-green-300">
          All pairs matched! Well done 🌟
        </p>
      )}

      <button
        onClick={restart}
        className="mt-5 w-full rounded-xl border border-white/15 px-4 py-3 hover:bg-white/5"
      >
        Restart game
      </button>
    </div>
  );
}

function ZenGarden() {
  const [garden, setGarden] = useState([]);

  const decorations = ["🌸", "🌿", "🪨", "🌼", "🍃", "✨"];

  return (
    <div>
      <p className="mb-4 text-center text-gray-400">
        Tap a decoration to add it to your garden.
      </p>

      <div className="flex min-h-52 flex-wrap content-start justify-center gap-4 rounded-2xl border border-green-300/20 bg-gradient-to-b from-emerald-950 to-[#101b19] p-6">
        {garden.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              setGarden((items) =>
                items.filter((_, i) => i !== index)
              )
            }
            title="Tap to remove"
            className="text-4xl transition hover:scale-110"
          >
            {item}
          </button>
        ))}

        {garden.length === 0 && (
          <p className="self-center text-sm text-gray-500">
            Your peaceful garden starts here...
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {decorations.map((item) => (
          <button
            key={item}
            onClick={() => setGarden((items) => [...items, item])}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-2xl hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>

      <button
        onClick={() => setGarden([])}
        className="mt-4 w-full rounded-xl border border-white/15 px-4 py-3 hover:bg-white/5"
      >
        Clear garden
      </button>
    </div>
  );
}

function WordSearchGame() {
  const [found, setFound] = useState([]);

  return (
    <div>
      <p className="mb-4 text-center text-gray-400">
        Find these words horizontally: CALM, PEACE, FOCUS, JOY, SMILE.
      </p>

      <div className="mx-auto grid max-w-sm grid-cols-6 gap-1">
        {wordGrid.flatMap((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex aspect-square items-center justify-center rounded-md border border-white/10 bg-white/5 font-semibold"
            >
              {letter}
            </div>
          ))
        )}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {wordsToFind.map((word) => (
          <button
            key={word}
            onClick={() => setFound((items) =>
              items.includes(word) ? items : [...items, word]
            )}
            className={`rounded-full border px-3 py-2 text-sm ${
              found.includes(word)
                ? "border-green-400/40 bg-green-500/10 text-green-300 line-through"
                : "border-white/10 bg-white/5"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">
        Words marked: {found.length}/{wordsToFind.length}
      </p>

      <p className="mt-2 text-center text-xs text-gray-500">
        Tap a word when you spot it in the grid.
      </p>
    </div>
  );
}

export default function MindGames() {
  const [activeGame, setActiveGame] = useState(null);

  function renderGame() {
    switch (activeGame) {
      case "breathing":
        return <BreathingGame />;
      case "memory":
        return <MemoryGame />;
      case "zen":
        return <ZenGarden />;
      case "words":
        return <WordSearchGame />;
      default:
        return null;
    }
  }

  return (
    <section
      id="mind-games"
      className="min-h-screen bg-[#070711] px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.2em] text-purple-400">
          Take a mindful break
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Mind Games
        </h2>

        <p className="mt-3 max-w-2xl text-gray-400">
          Take a break from studying with small interactive activities.
          Play at your own pace—there is no score pressure.
        </p>

        {activeGame ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
            <button
              onClick={() => setActiveGame(null)}
              className="mb-8 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              ← All games
            </button>

            <h3 className="mb-8 text-center text-2xl font-semibold">
              {games.find((game) => game.id === activeGame)?.name}
            </h3>

            {renderGame()}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`rounded-3xl border border-white/10 bg-gradient-to-br ${game.color} p-6 text-left transition hover:-translate-y-1 hover:border-purple-400/40`}
              >
                <span className="text-4xl">{game.emoji}</span>

                <h3 className="mt-5 text-xl font-semibold">
                  {game.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {game.description}
                </p>

                <span className="mt-5 inline-block text-sm font-medium text-purple-300">
                  Play now →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
