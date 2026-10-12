
import { useState } from "react";
import App from "./App";

export default function AuthGate() {
  const [entered, setEntered] = useState(
    () => Boolean(sessionStorage.getItem("sukoonvault_session"))
  );
  const [nickname, setNickname] = useState("");
  const [language, setLanguage] = useState("en");

  const text = {
    en: {
      title: "Welcome to SukoonVault",
      subtitle: "Your safe space. Your identity stays private.",
      nickname: "Nickname (optional)",
      placeholder: "e.g. CalmSoul24",
      enter: "Continue Anonymously",
      privacy: "No email. No password. No sign-up required.",
      signOut: "Sign Out"
    },
    hi: {
      title: "सुकून वॉल्ट में आपका स्वागत है",
      subtitle: "आपकी सुरक्षित जगह। आपकी पहचान निजी।",
      nickname: "उपनाम (ज़रूरी नहीं)",
      placeholder: "जैसे: CalmSoul24",
      enter: "बिना पहचान बताए आगे बढ़ें",
      privacy: "ईमेल नहीं। पासवर्ड नहीं। रजिस्ट्रेशन नहीं।",
      signOut: "साइन आउट"
    }
  }[language];

  const enterWebsite = () => {
    let sessionId = sessionStorage.getItem("sukoonvault_session");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sukoonvault_session", sessionId);
    }

    if (nickname.trim()) {
      sessionStorage.setItem("sukoonvault_nickname", nickname.trim());
    }

    sessionStorage.setItem("sukoonvault_language", language);
    setEntered(true);
  };

  const signOut = () => {
    sessionStorage.removeItem("sukoonvault_session");
    sessionStorage.removeItem("sukoonvault_nickname");
    setEntered(false);
  };

  if (entered) {
    return (
      <div>
        <div className="flex items-center justify-end gap-3 bg-white px-5 py-3">
          <span className="text-sm text-slate-600">
            {sessionStorage.getItem("sukoonvault_nickname") || "Anonymous"}
          </span>
          <button
            onClick={signOut}
            className="rounded-lg bg-[#557c60] px-4 py-2 text-sm font-semibold text-white"
          >
            {text.signOut}
          </button>
        </div>
        <App />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6ed] px-5 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dce8d5] text-3xl">
            🌿
          </div>

          <p className="text-sm font-bold tracking-[0.2em] text-[#557c60]">
            SUKOONVAULT
          </p>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#304638]">
            {text.title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {text.subtitle}
          </p>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          {text.nickname}
        </label>

        <input
          type="text"
          maxLength={40}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder={text.placeholder}
          className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
        />

        <button
          onClick={enterWebsite}
          className="w-full rounded-xl bg-[#557c60] px-5 py-4 font-semibold text-white transition hover:bg-[#42694b]"
        >
          {text.enter} →
        </button>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
          {text.privacy}
        </p>

        <div className="mt-7 flex justify-center">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            aria-label="Language"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </section>
    </main>
  );
}
