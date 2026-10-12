
import { useState, useEffect, useRef } from "react";
import "./App.css";

import Dashboard from "./Dashboard";
import CheckIn from "./CheckIn";
import MindGames from "./MindGames";
import Decorations from "./Decorations";
import Meditation from "./Meditation";
import { translations } from "./translations";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const extra = {
  en: {
    badge: "A private support space for students",
    hero1: "Your feelings matter.",
    hero2: "You don't have to handle everything alone.",
    heroDescription:
      "SukoonVault gives students a private space to express their thoughts, reflect on their wellbeing and find appropriate support when they need it.",
    talk: "Talk to Sukoon Assistant",
    how: "How it works",
    private: "Private space",
    privateDesc: "Share at your own pace",
    guided: "Guided support",
    guidedDesc: "Find helpful resources",
    conversation: "A supportive conversation",
    placeholder: "Tell me what you're feeling...",
    micStart: "🎙 MIC",
    micStop: "■ STOP",
    disclaimer:
      "Support tool only — not a replacement for professional care.",
    ragTitle: "Resource information used",
    ragDescription:
      "This response used relevant information from the SukoonVault resource library.",
    mild: "You can continue talking with Sukoon Assistant. If things feel overwhelming, professional support is also available.",
    moderateTitle: "You deserve some extra support.",
    moderateDescription:
      "Based on what you shared, speaking with a counsellor may be helpful.",
    highTitle: "Immediate support is important.",
    highDescription:
      "If you are in immediate danger or feel that you may hurt yourself, contact emergency support or a trusted person right now.",
    featuresHeading: "Support designed around students.",
    featuresDescription:
      "SukoonVault combines conversational support, safety triage and access to additional resources.",
    feature1: "A conversational space where students can express their thoughts and receive supportive guidance.",
    feature2:
      "When additional support is needed, the system can display available counsellor information.",
    feature3:
      "Elevated-risk situations can surface emergency and crisis resources.",
    howHeading: "From check-in to support.",
    howDescription:
      "The system is designed to provide supportive guidance and show relevant resources when appropriate.",
    step1: "Share what you're experiencing in your own words.",
    step2:
      "The AI and safety layer evaluates the conversation and assigns a support level.",
    step3:
      "Continue the conversation or view counsellor and emergency resources when appropriate.",
    aboutHeading: "A supportive digital space for student wellbeing.",
    aboutDescription:
      "SukoonVault is designed around private conversations, supportive resources, safety triage and human support. It does not replace professional mental-health care.",
    footer: "Built for student wellbeing.",
    footerTagline: "Privacy-first · Supportive · Human-centered",
    voiceHint: "Choose a language for voice input:",
    hindi: "Hindi",
    english: "English",
    language: "Language",
    errorTitle: "Something went wrong",
    contact: "Call",
    voiceUnavailable: "Voice input is unavailable in this browser.",
    voicePermission: "Allow microphone access in your browser settings.",
    voiceNoSpeech: "No speech detected. Please try again.",
    voiceNetwork: "Speech service network error. Try Chrome or type your message.",
    voiceError: "Voice input failed. Please try again.",
    listening: "Listening... Speak now.",
    starting: "Starting microphone...",
    stopped: "Voice input stopped.",
    secure: "Use localhost or HTTPS to access the microphone.",
    missingUrl: "Supabase function URL is missing in your .env file.",
    missingKey: "Supabase API key is missing in your .env file.",
    connection: "Connection error: ",
    fallback: "I'm here to listen. Tell me more about what you're experiencing.",
    ready: "Ready",
    thinking: "Thinking...",
    about: "About SukoonVault",
    featureLabel: "Features",
    howLabel: "How it works",
    wellbeing: "Your wellbeing",
    dashboard: "Personal Dashboard",
    checkinPrompt: "Take a moment to check in with yourself."
  },
  hi: {
    badge: "छात्रों के लिए एक निजी सहायता स्थान",
    hero1: "आपकी भावनाएँ मायने रखती हैं।",
    hero2: "आपको सब कुछ अकेले संभालने की ज़रूरत नहीं है।",
    heroDescription:
      "सुकून वॉल्ट छात्रों को अपने विचार साझा करने, अपनी भावनात्मक स्थिति समझने और ज़रूरत पड़ने पर सहायता पाने के लिए एक निजी जगह देता है।",
    talk: "सुकून सहायक से बात करें",
    how: "यह कैसे काम करता है",
    private: "निजी जगह",
    privateDesc: "अपनी गति से बातें साझा करें",
    guided: "मार्गदर्शन",
    guidedDesc: "उपयोगी संसाधन पाएँ",
    conversation: "सहयोगपूर्ण बातचीत",
    placeholder: "बताएँ कि आप कैसा महसूस कर रहे हैं...",
    micStart: "🎙 बोलें",
    micStop: "■ रोकें",
    disclaimer:
      "यह सहायता का एक साधन है, पेशेवर देखभाल का विकल्प नहीं।",
    ragTitle: "इस्तेमाल की गई संसाधन जानकारी",
    ragDescription:
      "इस जवाब में सुकून वॉल्ट की संसाधन लाइब्रेरी से संबंधित जानकारी का इस्तेमाल हुआ।",
    mild: "आप सुकून सहायक से बात जारी रख सकते हैं। यदि स्थिति बहुत मुश्किल लगे, तो पेशेवर सहायता भी उपलब्ध है।",
    moderateTitle: "आपको अतिरिक्त सहायता मिलनी चाहिए।",
    moderateDescription:
      "आपने जो साझा किया है, उसके आधार पर किसी काउंसलर से बात करना उपयोगी हो सकता है।",
    highTitle: "तुरंत सहायता लेना ज़रूरी है।",
    highDescription:
      "यदि आप तत्काल खतरे में हैं या खुद को नुकसान पहुँचाने का डर है, तो अभी किसी भरोसेमंद व्यक्ति या आपातकालीन सेवा से संपर्क करें।",
    featuresHeading: "छात्रों के लिए बनाई गई सहायता।",
    featuresDescription:
      "सुकून वॉल्ट बातचीत के ज़रिए सहायता, सुरक्षा मूल्यांकन और उपयोगी संसाधन उपलब्ध कराता है।",
    feature1:
      "एक ऐसी जगह जहाँ छात्र अपने विचार साझा कर सकते हैं और सहयोगपूर्ण मार्गदर्शन पा सकते हैं।",
    feature2:
      "अतिरिक्त सहायता की ज़रूरत होने पर उपलब्ध काउंसलर की जानकारी दिखाई जा सकती है।",
    feature3:
      "अधिक जोखिम वाली स्थितियों में आपातकालीन और संकट सहायता संसाधन दिखाए जा सकते हैं।",
    howHeading: "चेक-इन से सहायता तक।",
    howDescription:
      "यह सिस्टम सहयोगपूर्ण मार्गदर्शन देने और ज़रूरत पड़ने पर संबंधित संसाधन दिखाने के लिए बनाया गया है।",
    step1: "अपने अनुभव को अपने शब्दों में साझा करें।",
    step2:
      "AI और सुरक्षा प्रणाली बातचीत का मूल्यांकन करके सहायता का स्तर निर्धारित करती है।",
    step3:
      "बातचीत जारी रखें या ज़रूरत के अनुसार काउंसलर और आपातकालीन संसाधन देखें।",
    aboutHeading: "छात्रों की भावनात्मक भलाई के लिए एक सहयोगपूर्ण डिजिटल जगह।",
    aboutDescription:
      "सुकून वॉल्ट निजी बातचीत, उपयोगी संसाधनों और मानवीय सहायता पर केंद्रित है। यह पेशेवर मानसिक स्वास्थ्य देखभाल का विकल्प नहीं है।",
    footer: "छात्रों की भलाई के लिए बनाया गया।",
    footerTagline: "निजता · सहयोग · संवेदनशीलता",
    voiceHint: "आवाज़ के लिए भाषा चुनें:",
    hindi: "हिंदी",
    english: "अंग्रेज़ी",
    language: "भाषा",
    errorTitle: "कुछ समस्या हुई",
    contact: "कॉल करें",
    voiceUnavailable: "इस ब्राउज़र में आवाज़ से लिखने की सुविधा उपलब्ध नहीं है।",
    voicePermission: "ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।",
    voiceNoSpeech: "कोई आवाज़ नहीं मिली। कृपया दोबारा कोशिश करें।",
    voiceNetwork:
      "आवाज़ पहचानने में नेटवर्क की समस्या आई। Chrome इस्तेमाल करें या संदेश लिखें।",
    voiceError: "आवाज़ से लिखने में समस्या आई। कृपया दोबारा कोशिश करें।",
    listening: "सुन रहा है... अब बोलें।",
    starting: "माइक्रोफ़ोन शुरू हो रहा है...",
    stopped: "आवाज़ से लिखना बंद कर दिया गया।",
    secure: "माइक्रोफ़ोन के लिए localhost या HTTPS इस्तेमाल करें।",
    missingUrl: ".env फ़ाइल में Supabase function URL उपलब्ध नहीं है।",
    missingKey: ".env फ़ाइल में Supabase API key उपलब्ध नहीं है।",
    connection: "कनेक्शन में समस्या: ",
    fallback: "मैं आपकी बात सुनने के लिए यहाँ हूँ। बताइए कि आप क्या महसूस कर रहे हैं।",
    ready: "तैयार",
    thinking: "जवाब तैयार हो रहा है...",
    about: "सुकून वॉल्ट के बारे में",
    featureLabel: "विशेषताएँ",
    howLabel: "यह कैसे काम करता है",
    wellbeing: "आपकी भावनात्मक भलाई",
    dashboard: "व्यक्तिगत डैशबोर्ड",
    checkinPrompt: "एक पल निकालकर अपनी भावनाओं को समझें।"
  }
};

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-2xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function RiskBadge({ risk, language }) {
  if (!risk) return null;

  const labels = {
    en: { mild: "Mild support level", moderate: "Moderate support level", high: "High support level" },
    hi: { mild: "कम सहायता स्तर", moderate: "मध्यम सहायता स्तर", high: "उच्च सहायता स्तर" }
  };

  const styles = {
    mild: "border-green-200 bg-green-50 text-green-800",
    moderate: "border-amber-200 bg-amber-50 text-amber-800",
    high: "border-red-200 bg-red-50 text-red-800"
  };

  return (
    <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[risk] || styles.mild}`}>
      {labels[language][risk] || labels[language].mild}
    </div>
  );
}

function CounsellorCard({ counsellor, language }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="font-semibold text-slate-800">{counsellor.name}</h4>
      <p className="mt-1 text-sm text-green-700">{counsellor.specialization}</p>
      {counsellor.email && <p className="mt-3 break-words text-sm text-slate-600">Email: {counsellor.email}</p>}
      {counsellor.phone && <p className="mt-1 text-sm text-slate-600">{language === "hi" ? "फ़ोन" : "Phone"}: {counsellor.phone}</p>}
    </div>
  );
}

function EmergencyCard({ resource, language }) {
  const cleanContact = String(resource.contact || "").replace(/[^0-9+]/g, "");

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <h4 className="font-semibold text-slate-800">{resource.name}</h4>
      <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
      {cleanContact && (
        <a href={`tel:${cleanContact}`} className="mt-4 inline-block rounded-lg bg-red-700 px-4 py-2 font-semibold text-white">
          {language === "hi" ? "कॉल करें" : "Call"} {resource.contact}
        </a>
      )}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("sukoonvault_language");
      return saved === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  const t = translations[language] || translations.en;
  const x = extra[language] || extra.en;

  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      text:
        language === "hi"
          ? "नमस्ते, मैं सुकून सहायक हूँ। आप मुझसे अपनी किसी भी परेशानी के बारे में बात कर सकते हैं।"
          : "Hi, I'm Sukoon Assistant. You can talk to me about anything you're going through."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState(null);
  const [counsellors, setCounsellors] = useState([]);
  const [emergencyResources, setEmergencyResources] = useState([]);
  const [sources, setSources] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);
  const restartTimerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem("sukoonvault_language", language);
    } catch {
      // The language still works for this session if storage is unavailable.
    }

    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  useEffect(() => {
    mountedRef.current = true;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(x.voiceUnavailable);
      return () => {
        mountedRef.current = false;
      };
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      if (!mountedRef.current) return;
      setIsListening(true);
      setVoiceError(x.listening);
    };

    recognition.onresult = (event) => {
      if (!mountedRef.current) return;

      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) finalText += transcript;
        else interimText += transcript;
      }

      if (finalText.trim()) {
        const spokenText = finalText.trim();
        setInput((previous) => previous ? `${previous} ${spokenText}` : spokenText);
      }

      if (interimText.trim()) setVoiceError(interimText.trim());
      else if (listeningRef.current) setVoiceError(x.listening);
    };

    recognition.onerror = (event) => {
      if (!mountedRef.current) return;

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        listeningRef.current = false;
        setIsListening(false);
        setVoiceError(x.voicePermission);
      } else if (event.error === "no-speech") {
        setVoiceError(x.voiceNoSpeech);
      } else if (event.error === "network") {
        setVoiceError(x.voiceNetwork);
      } else if (event.error !== "aborted") {
        setVoiceError(x.voiceError);
      }
    };

    recognition.onend = () => {
      if (!mountedRef.current) return;

      if (!listeningRef.current) {
        setIsListening(false);
        return;
      }

      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(() => {
        if (!mountedRef.current || !listeningRef.current) return;

        try {
          recognition.start();
        } catch {
          setVoiceError(x.voiceError);
          setIsListening(false);
          listeningRef.current = false;
        }
      }, 500);
    };

    return () => {
      mountedRef.current = false;
      listeningRef.current = false;
      clearTimeout(restartTimerRef.current);

      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }

      recognitionRef.current = null;
    };
  }, [language]);

  const toggleVoiceInput = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setVoiceError(x.voiceUnavailable);
      return;
    }

    if (listeningRef.current) {
      listeningRef.current = false;
      clearTimeout(restartTimerRef.current);

      try {
        recognition.stop();
      } catch {
        // Ignore if recognition is already stopped.
      }

      setIsListening(false);
      setVoiceError(x.stopped);
      return;
    }

    if (!window.isSecureContext) {
      setVoiceError(x.secure);
      return;
    }

    listeningRef.current = true;
    setVoiceError(x.starting);

    try {
      recognition.start();
    } catch {
      listeningRef.current = false;
      setIsListening(false);
      setVoiceError(x.voiceError);
    }
  };

  const sendMessage = async () => {
    const trimmedMessage = input.trim();
    if (!trimmedMessage || loading) return;

    if (!SUPABASE_FUNCTION_URL || !SUPABASE_ANON_KEY) {
      setMessages((previous) => [
        ...previous,
        {
          role: "user",
          text: trimmedMessage
        },
        {
          role: "assistant",
          text: !SUPABASE_FUNCTION_URL ? x.missingUrl : x.missingKey
        }
      ]);
      setInput("");
      return;
    }

    setMessages((previous) => [
      ...previous,
      { role: "user", text: trimmedMessage }
    ]);

    setInput("");
    setLoading(true);

    try {
      let sessionId = sessionStorage.getItem("sukoonvault_session");

      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("sukoonvault_session", sessionId);
      }

      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          sessionId,
          message: trimmedMessage,
          language,
          preferredLanguage: language === "hi" ? "Hindi" : "English"
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Request failed");
      }

      setRiskLevel(data.riskLevel || "mild");
      setCounsellors(Array.isArray(data.counsellors) ? data.counsellors : []);
      setEmergencyResources(
        Array.isArray(data.emergencyResources) ? data.emergencyResources : []
      );
      setSources(Array.isArray(data.sources) ? data.sources : []);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            data.response ||
            (language === "hi"
              ? "मैं आपकी बात सुन रहा हूँ। कृपया थोड़ा और बताएँ कि आप क्या महसूस कर रहे हैं।"
              : x.fallback)
        }
      ]);
    } catch (error) {
      console.error("CHAT ERROR:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: x.connection + (error.message || "Failed to fetch")
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToSupport = () => {
    document.getElementById("support")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f6ed] text-slate-800">
      <Decorations />

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a href="#home" className="text-xl font-bold tracking-wide">
            SUKOON<span className="text-green-700">VAULT</span>
          </a>

          <div className="flex items-center gap-2">
            <label htmlFor="language-select" className="text-sm text-slate-600">
              {x.language}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800"
              aria-label={x.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <div className="hidden items-center gap-5 text-sm text-slate-600 lg:flex">
            <a href="#home">{t.home}</a>
            <a href="#support">{t.chat}</a>
            <a href="#dashboard">{t.dashboard}</a>
            <a href="#features">{t.features}</a>
            <a href="#how">{t.howItWorks}</a>
            <button
              onClick={scrollToSupport}
              className="rounded-lg bg-[#557c60] px-4 py-2 font-medium text-white"
            >
              {t.getSupport}
            </button>
          </div>

          <button
            onClick={scrollToSupport}
            className="rounded-lg bg-[#557c60] px-4 py-2 text-sm font-medium text-white lg:hidden"
          >
            {t.getSupport}
          </button>
        </div>
      </nav>

      <section id="home" className="px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
              {x.badge}
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              {x.hero1}
              <span className="mt-2 block text-green-800">{x.hero2}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              {x.heroDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={scrollToSupport}
                className="rounded-xl bg-[#557c60] px-6 py-3 font-semibold text-white"
              >
                {x.talk}
              </button>
              <a
                href="#how"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
              >
                {x.how}
              </a>
            </div>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">{x.private}</p>
                <p className="mt-1 text-sm text-slate-500">{x.privateDesc}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold">{x.guided}</p>
                <p className="mt-1 text-sm text-slate-500">{x.guidedDesc}</p>
              </div>
            </div>
          </div>

          <div
            id="support"
            className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:p-6"
          >
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 bg-[#f4f6ed] px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">{t.assistantTitle}</h2>
                  <p className="mt-1 text-xs text-slate-500">{x.conversation}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {x.ready}
                </div>
              </div>

              <div
                role="log"
                aria-live="polite"
                className="h-[360px] space-y-4 overflow-y-auto bg-white p-4 md:h-[410px] md:p-5"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-[#557c60] text-white"
                          : "border border-slate-200 bg-[#f4f6ed] text-slate-700"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                      {x.thinking}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder={x.placeholder}
                    aria-label={x.placeholder}
                    className="min-h-12 min-w-0 flex-1 resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    disabled={loading}
                    aria-label={isListening ? x.micStop : x.micStart}
                    title={isListening ? x.micStop : x.micStart}
                    className="shrink-0 rounded-xl px-3 py-3 font-semibold text-white disabled:opacity-50"
                    style={{
                      minWidth: "76px",
                      minHeight: "48px",
                      backgroundColor: isListening ? "#b42336" : "#557c60"
                    }}
                  >
                    {isListening ? x.micStop : x.micStart}
                  </button>

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    aria-label={t.send}
                    className="shrink-0 rounded-xl bg-[#557c60] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.send}
                  </button>
                </div>

                {voiceError && (
                  <p className="mt-2 text-xs text-slate-600" role="status">
                    {voiceError}
                  </p>
                )}

                <p className="mt-3 text-center text-xs text-slate-500">
                  {x.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sources.length > 0 && (
        <section className="px-5 pb-8">
          <div className="mx-auto max-w-5xl rounded-2xl border border-green-200 bg-green-50 p-5">
            <h3 className="font-semibold text-slate-800">{x.ragTitle}</h3>
            <p className="mt-2 text-sm text-slate-600">{x.ragDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sources.map((source, index) => (
                <span
                  key={source.id || source.title || index}
                  className="rounded-full border border-green-200 bg-white px-3 py-1 text-xs text-green-800"
                >
                  {source.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {riskLevel && (
        <section className="px-5 pb-10">
          <div className="mx-auto max-w-5xl">
            <div
              className={`rounded-2xl border p-6 ${
                riskLevel === "high"
                  ? "border-red-200 bg-red-50"
                  : riskLevel === "moderate"
                    ? "border-amber-200 bg-amber-50"
                    : "border-green-200 bg-green-50"
              }`}
            >
              <RiskBadge risk={riskLevel} language={language} />

              {riskLevel === "mild" && (
                <p className="text-sm leading-6 text-slate-700">{x.mild}</p>
              )}

              {riskLevel === "moderate" && (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">{x.moderateTitle}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{x.moderateDescription}</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {counsellors.map((counsellor, index) => (
                      <CounsellorCard
                        key={counsellor.id || index}
                        counsellor={counsellor}
                        language={language}
                      />
                    ))}
                  </div>
                </>
              )}

              {riskLevel === "high" && (
                <>
                  <h2 className="text-2xl font-bold text-red-800">{x.highTitle}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">{x.highDescription}</p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {emergencyResources.map((resource, index) => (
                      <EmergencyCard
                        key={resource.id || index}
                        resource={resource}
                        language={language}
                      />
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {counsellors.map((counsellor, index) => (
                      <CounsellorCard
                        key={counsellor.id || index}
                        counsellor={counsellor}
                        language={language}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section id="dashboard" className="scroll-mt-24 px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">{x.wellbeing}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{x.dashboard}</h2>
          <p className="mt-2 text-slate-600">{x.checkinPrompt}</p>
          <div className="mt-6">
            <Dashboard />
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <CheckIn />
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <MindGames />
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <Meditation />
        </div>
      </section>

      <section id="features" className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">{x.featureLabel}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{x.featuresHeading}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">{x.featuresDescription}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon="◎"
              title={t.aiGuidedTitle}
              description={x.feature1}
            />
            <FeatureCard
              icon="↗"
              title={t.humanConnectionTitle}
              description={x.feature2}
            />
            <FeatureCard
              icon="＋"
              title={t.crisisResourcesTitle}
              description={x.feature3}
            />
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-slate-200 bg-white px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">{x.howLabel}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{x.howHeading}</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">{x.howDescription}</p>
          </div>
          <div className="space-y-8">
            <Step number="01" title={t.stepCheckIn} description={x.step1} />
            <Step number="02" title={t.stepUnderstand} description={x.step2} />
            <Step number="03" title={t.stepGetSupport} description={x.step3} />
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-700">{x.about}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{x.aboutHeading}</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">{x.aboutDescription}</p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>© 2026 SukoonVault. {x.footer}</p>
          <p>{x.footerTagline}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
