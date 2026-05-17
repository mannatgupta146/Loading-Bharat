import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';

const NEWS_ITEMS = [
  {
    id: 1,
    title: "WEST BENGAL ELECTION: Mamata's Masterstroke!",
    description: "TMC announces revolutionary scheme: 100% reservation for people who know the 'Humba Dumba' lyrics. EVMs to be replaced by ballot boxes guarded by Royal Bengal Tigers.",
    videoUrl: "/news/mamta.mp4",
    category: "Politics",
    warningText: "Warning: This video contains continuous slogan chanting. Cancel to save your eardrums.",
    cancelMessages: [
      "The GDP has grown by 4000% but it is currently stuck in traffic.",
      "If you click cancel now, your voter ID will be replaced with a picture of a Royal Bengal Tiger.",
      "A new tax has been introduced on 'Skipping Humba Dumba'. By reading this, you owe ₹5,000."
    ]
  },
  {
    id: 2,
    title: "TAMIL NADU ELECTION: EVM Hack Confirmed?",
    description: "Breaking: Election Commission confirms all votes in TN will automatically be redirected to Thalapathy Vijay's new party. Democracy has left the chat.",
    videoUrl: "/news/thalapathy.mp4",
    category: "Politics",
    warningText: "Warning: High-intensity action sequence. Do not attempt to cancel if you are a true fan.",
    cancelMessages: [
      "Canceling this broadcast is a cinematic crime.",
      "Your Aadhar card will automatically be linked to a random stunt double if you proceed.",
      "The weather tomorrow will be heavily censored with slow-motion effects."
    ]
  },
  {
    id: 3,
    title: "GOVT TAXES CSK VICTORIES",
    description: "New GST slab introduced: 28% tax on celebrating MS Dhoni. Citizens caught whistling will be fined ₹50,000.",
    videoUrl: "/news/csk.mp4",
    category: "Sports",
    warningText: "Warning: Video contains unauthorized yellow colors. Proceeding will alert the Income Tax Department.",
    cancelMessages: [
      "Every time you cancel, a whistleblower loses their whistle.",
      "Your bank account will be frozen until you watch the entire match highlight.",
      "Warning: 'Thala for a reason' will be tattooed on your permanent record."
    ]
  },
  {
    id: 4,
    title: "Masterclass: 12 Years of Silence",
    description: "A comprehensive, highly detailed 10-hour documentary on unscripted press conferences.",
    videoUrl: "/news/modi.mp4",
    category: "Politics",
    warningText: "Warning: This documentary contains absolute silence. It is highly recommended by the ruling party.",
    cancelMessages: [
      "Silence is golden. Canceling is anti-national.",
      "Your internet history will be audited by the Ministry of Truth.",
      "The PM Cares fund has automatically debited ₹500 from your account as a 'Skip Fee'."
    ]
  },
  {
    id: 5,
    title: "Why Rahul Gandhi SHOULD be PM (Satire Edition)",
    description: "Congress party releases their ultimate campaign anthem. Experts say it will secure exactly 42 seats.",
    videoUrl: "/news/rahul.mp4",
    category: "Politics",
    warningText: "Warning: Viewer discretion advised. May cause uncontrollable face-palming. Watch fully to support the nation.",
    cancelMessages: [
      "You are abandoning a youth icon in his 50s.",
      "Canceling will result in a mandatory 500km foot march.",
      "Your local MP will now visit your house to explain the 'Mohabbat ki Dukaan' concept."
    ]
  },
  {
    id: 6,
    title: "UP ELECTION: Infrastructure Update",
    description: "New government scheme: Why build roads when you can just bulldoze the potholes? Mafia relocated to Mars.",
    videoUrl: "/news/yogi.mp4",
    category: "Politics",
    warningText: "Warning: This video will demolish your browser cache. Cancel before it reaches your hard drive.",
    cancelMessages: [
      "A bulldozer has been dispatched to your IP address.",
      "Your street name has been officially changed to 'Cancel Nagar'.",
      "Refusal to watch is a punishable offense under the New Urban Planning Act."
    ]
  },
  {
    id: 7,
    title: "Akhilesh Yadav's Emotional Blackmail",
    description: "'Kab aaoge mere Akhilesh?' The Election Commission has banned this song for causing extreme depression among voters.",
    videoUrl: "/news/yadav.mp4",
    category: "Politics",
    warningText: "Warning: This audio contains emotional campaign songs. Do you really want to endure this?",
    cancelMessages: [
      "You have broken the cycle of emotion. How dare you.",
      "A bicycle will be permanently parked in your living room.",
      "The Election Commission has noted your lack of empathy."
    ]
  }
];

const COMPREHENSION_QUIZ = {
  1: {
    question: "According to Directive #3, what is the exact tax amount (in ₹) you now owe for 'Skipping Humba Dumba'? (Enter digits only)",
    answers: ["5000", "5,000"],
    hint: "Hint: Look at Directive #3."
  },
  2: {
    question: "According to Directive #2, what card of yours will be automatically linked to a random stunt double? (e.g., voter card, aadhar card)",
    answers: ["aadhar", "aadhar card"],
    hint: "Hint: Look at Directive #2."
  },
  3: {
    question: "According to Directive #3, what phrase will be tattooed on your permanent record as a warning?",
    answers: ["thala for a reason", "thala"],
    hint: "Hint: Look at Directive #3."
  },
  4: {
    question: "According to Directive #3, what specific fund automatically debited ₹500 from your account as a 'Skip Fee'?",
    answers: ["pm cares", "pm cares fund"],
    hint: "Hint: Look at Directive #3."
  },
  5: {
    question: "According to Directive #2, how many kilometers (km) is the mandatory foot march if you cancel? (Enter digits only)",
    answers: ["500", "500km"],
    hint: "Hint: Look at Directive #2."
  },
  6: {
    question: "According to Directive #2, what has your street name been officially changed to?",
    answers: ["cancel nagar", "cancelnagar"],
    hint: "Hint: Look at Directive #2."
  },
  7: {
    question: "According to Directive #2, what vehicle will be permanently parked in your living room?",
    answers: ["bicycle", "a bicycle"],
    hint: "Hint: Look at Directive #2."
  }
};

const NewsFeed = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [cancelStep, setCancelStep] = useState(0); // 0 = viewing, 1 = warning directives, 2 = comprehension quiz
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizError, setQuizError] = useState('');
  const [isLurking, setIsLurking] = useState(false);
  const [typedOath, setTypedOath] = useState('');
  const OATH_TEXT = "I pledge absolute loyalty to the State.";

  // State Media Consuming lock features
  const [watchedVideos, setWatchedVideos] = useState({});
  const [forcedConsumption, setForcedConsumption] = useState(false);
  const [activeVideoTimeLeft, setActiveVideoTimeLeft] = useState(10);
  const [idleTimerCount, setIdleTimerCount] = useState(0);
  const [showAnnoyingPopup, setShowAnnoyingPopup] = useState(false);
  const [annoyingPopupCount, setAnnoyingPopupCount] = useState(0);
  const [rickrollActive, setRickrollActive] = useState(false);
  const [buttonEscapes, setButtonEscapes] = useState(0);
  const [buttonPos, setButtonPos] = useState({ top: '60%', left: '50%' });



  // Initial loitering check: 10 seconds of passiveness
  useEffect(() => {
    if (activeVideo || isLurking || forcedConsumption || showAnnoyingPopup || rickrollActive || Object.keys(watchedVideos).length === NEWS_ITEMS.length) return;

    const timer = setTimeout(() => {
      setIsLurking(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activeVideo, isLurking, forcedConsumption, showAnnoyingPopup, rickrollActive, watchedVideos]);

  // 1-second interval manager
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeVideo) {
        if (!watchedVideos[activeVideo.id]) {
          setActiveVideoTimeLeft((prev) => {
            if (prev <= 1) {
              setWatchedVideos((w) => {
                const next = { ...w, [activeVideo.id]: true };
                if (Object.keys(next).length === NEWS_ITEMS.length) {
                  localStorage.removeItem('stateMediaLock');
                  setForcedConsumption(false);
                  alert("🎉 CITIZEN STATUS RESTORED! You have successfully watched all mandatory broadcasts. The navigation lock is deactivated. Thank you for your compliance!");
                }
                return next;
              });
              return 0;
            }
            return prev - 1;
          });
        }
        setIdleTimerCount(0);
      } else {
        if (!isLurking && !showAnnoyingPopup && !rickrollActive && Object.keys(watchedVideos).length < NEWS_ITEMS.length) {
          setIdleTimerCount((prev) => prev + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeVideo, watchedVideos, isLurking, showAnnoyingPopup, rickrollActive]);

  // Handle idle timer limit triggers
  useEffect(() => {
    if (idleTimerCount >= 20) {
      setIdleTimerCount(0);
      setAnnoyingPopupCount((c) => {
        const nextCount = c + 1;
        if (nextCount >= 5) {
          setRickrollActive(true);
          setShowAnnoyingPopup(false);
        } else {
          setShowAnnoyingPopup(true);
        }
        return nextCount;
      });
    }
  }, [idleTimerCount]);

  const handleOpenVideo = (item) => {
    setActiveVideo(item);
    setCancelStep(0);
    setQuizAnswer('');
    setQuizError('');
    setActiveVideoTimeLeft(watchedVideos[item.id] ? 0 : 10);
    setIdleTimerCount(0);
  };

  const handleButtonHover = () => {
    if (buttonEscapes < 10) {
      const randomTop = Math.floor(Math.random() * 60) + 20; // 20% to 80%
      const randomLeft = Math.floor(Math.random() * 60) + 20; // 20% to 80%
      setButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
      setButtonEscapes((prev) => prev + 1);
    }
  };

  const handleExitRickroll = () => {
    setRickrollActive(false);
    setAnnoyingPopupCount(0);
    setButtonEscapes(0);
    setButtonPos({ top: '60%', left: '50%' });
    setIdleTimerCount(0);
  };

  return (
    <div className="bg-white border border-gray-300 shadow-md flex flex-col min-h-[500px] lg:h-[calc(100vh-240px)]">
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-gentle-float {
          animation: gentle-float 4s ease-in-out infinite;
        }
        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: #020617;
          border-radius: 4px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: #b91c1c;
          border-radius: 4px;
          border: 2px solid #020617;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}</style>
      
      <div className="bg-[#003366] text-white p-3 border-b border-[#002244] flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
          📰 100% Verified Unbiased State Media
        </h3>
        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)] border border-red-300">MANDATORY VIEWING</span>
      </div>
      
      <div className="p-4 bg-gray-100 flex-grow flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Column: News Items List */}
        <div className="w-full lg:w-5/12 flex flex-col gap-4 overflow-y-auto custom-scrollbar-dark">
          {/* Global Broadcast Instructions Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 text-[#003366] text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-2 flex-shrink-0 animate-[pulse_3s_infinite] border border-amber-200">
            <span>📡 Info: Hover card to preview live sound feed • Click to view full broadcast</span>
          </div>

          {NEWS_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group border-2 border-gray-300 bg-white rounded-lg overflow-hidden hover:border-[#003366] hover:shadow-md transition-all cursor-pointer flex flex-col relative min-h-[100px]"
              onClick={() => handleOpenVideo(item)}
              onMouseEnter={() => setHoveredVideoId(item.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
            >
              <div className="p-5 flex-grow flex flex-col justify-center bg-white">
                <h4 className="font-black text-[#003366] text-xl leading-tight mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>{item.title}</span>
                  {watchedVideos[item.id] ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded-full border border-emerald-300 flex items-center gap-1 shadow-sm flex-shrink-0 self-start sm:self-center">
                      ✅ VIEW APPROVED
                    </span>
                  ) : (
                    forcedConsumption && (
                      <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-1 rounded-full border border-red-300 flex items-center gap-1 shadow-sm flex-shrink-0 animate-pulse self-start sm:self-center animate-bounce">
                        ⏳ MANDATORY WATCH
                      </span>
                    )
                  )}
                </h4>
                <p className="text-sm text-gray-800 leading-snug font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Premium Live Standby Monitor (Wider & Floating) */}
        <div className="w-full lg:w-7/12 flex flex-col flex-shrink-0 h-[380px] lg:h-full">
          <div className="bg-[#020617] border-4 border-gray-900 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col relative animate-gentle-float">
            <div className="bg-[#003366] text-white p-3 border-b-2 border-amber-500 font-black text-center text-xs uppercase tracking-widest flex-shrink-0">
              🛰️ Live Preview Monitor
            </div>
            
            {hoveredVideoId ? (() => {
              const activeHoverItem = NEWS_ITEMS.find(n => n.id === hoveredVideoId);
              if (!activeHoverItem) return null;
              return (
                <div className="flex-grow flex flex-col min-h-0 bg-black relative justify-center items-center">
                  {!activeHoverItem.videoUrl.endsWith('.mp3') ? (
                    <video 
                      className="w-full h-full object-contain"
                      src={activeVideo ? undefined : activeHoverItem.videoUrl}
                      autoPlay
                      playsInline
                      loop
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-red-500 font-black text-lg animate-bounce tracking-widest mb-3">🔊 AUDIO FEED ACTIVE</span>
                      <audio src={activeVideo ? undefined : activeHoverItem.videoUrl} autoPlay loop className="hidden" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-red-700 text-white text-[9px] font-black px-2 py-0.5 rounded shadow z-10 border border-red-900 tracking-wider uppercase">
                    {activeHoverItem.category}
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/85 text-[10px] text-red-500 font-black px-2.5 py-1 rounded z-10 animate-pulse border border-red-900 tracking-widest">
                    🔴 LIVE FEED
                  </span>
                </div>
              );
            })() : (
              <div className="flex-grow flex flex-col justify-center items-center p-6 text-center bg-gradient-to-br from-[#0c1020] to-[#030712] text-gray-500 font-mono text-xs select-none">
                <span className="text-4xl mb-4 animate-pulse">📡</span>
                <p className="text-amber-500 font-black uppercase tracking-wider mb-2">Monitor Standby</p>
                <p className="max-w-xs leading-relaxed opacity-60">
                  Hover your cursor over any official news broadcast card on the left to stream the real-time live preview feed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[95vh] bg-gradient-to-br from-[#0c1020] to-[#030712] border-4 border-[#1e293b] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col">
            
            <div className="bg-gradient-to-r from-[#003366] to-[#001f3f] p-4 border-b-4 border-amber-500 flex-shrink-0 text-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <h2 className="text-white font-black text-lg sm:text-xl tracking-widest uppercase">{activeVideo.title}</h2>
            </div>
 
            {cancelStep === 0 && (
              <div className="flex-grow flex flex-col min-h-0 overflow-y-auto bg-[#020617] custom-scrollbar-dark">
                <div className={`relative flex-shrink-0 flex items-center justify-center min-h-[320px] max-h-[55vh] bg-black ${activeVideo.videoUrl.endsWith('.mp3') ? 'py-10 bg-gradient-to-br from-gray-900 to-black' : ''}`}>
                  {activeVideo.videoUrl.endsWith('.mp3') ? (
                    <audio 
                      className="w-full px-4"
                      src={activeVideo.videoUrl}
                      autoPlay
                      controls
                    />
                  ) : (
                    <video 
                      className="w-full h-full max-h-[55vh] object-contain"
                      src={activeVideo.videoUrl}
                      autoPlay
                      controls
                    />
                  )}
                </div>
                
                <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] p-6 border-t-2 border-red-900/60 text-center flex flex-col items-center flex-shrink-0 w-full">
                  {forcedConsumption && activeVideoTimeLeft > 0 ? (
                    <div className="w-full max-w-md bg-[#030712] border-2 border-amber-500 rounded-lg p-4 text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest animate-pulse flex flex-col items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      <span>⏳ MANDATORY ACTIVE BROADCAST VIEWING</span>
                      <span className="text-2xl font-mono tracking-widest">{activeVideoTimeLeft}s remaining</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-red-500 text-xs sm:text-sm italic font-extrabold mb-4 animate-pulse uppercase tracking-widest">
                        {activeVideo.warningText}
                      </p>
                      <button 
                        onClick={() => setCancelStep(1)}
                        className="w-full max-w-md bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-black py-3.5 px-8 rounded-lg shadow-[0_0_25px_rgba(220,38,38,0.5)] border-2 border-red-500 hover:border-white transition-all transform hover:scale-105 uppercase tracking-widest text-xs sm:text-sm animate-[pulse_2.5s_infinite]"
                      >
                        Cancel Video
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {cancelStep === 1 && (
              <div className="bg-gradient-to-b from-[#0b0f19] to-[#02050f] p-6 sm:p-8 text-center border-t-4 border-red-700 flex-grow flex flex-col justify-center min-h-0 overflow-y-auto custom-scrollbar-dark">
                <h3 className="text-red-500 font-black text-xl sm:text-3xl mb-4 animate-bounce flex-shrink-0 tracking-wider">⚠️ WAIT! MANDATORY DETAILED NEWS ⚠️</h3>
                
                <div className="text-left bg-[#030712] border-2 border-red-950 shadow-[inset_0_0_30px_rgba(220,38,38,0.15)] rounded-lg p-5 sm:p-6 text-[#f8fafc] space-y-4 mb-6 overflow-y-auto font-mono text-sm sm:text-base flex-grow min-h-[180px] custom-scrollbar-dark">
                  <p className="text-red-400 font-black border-b border-red-950/60 pb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>🛑</span> Acknowledge the following State directives:
                  </p>
                  
                  {activeVideo.cancelMessages.map((msg, idx) => (
                    <div key={idx} className="flex gap-3 leading-relaxed border-b border-red-950/20 pb-2">
                      <span className="text-amber-400 font-bold">{idx + 1}.</span>
                      <span className="text-gray-300 font-medium">{msg}</span>
                    </div>
                  ))}
                  
                  <p className="text-white font-black mt-6 pt-4 border-t border-red-950/60 leading-snug">
                    Do you STILL wish to abandon your civic duty and close this official state broadcast?
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-auto flex-shrink-0 w-full max-w-xl mx-auto">
                  <button 
                    onClick={() => setCancelStep(0)}
                    className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#34d399] hover:to-[#10b981] text-white font-extrabold py-3.5 px-6 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] border-2 border-[#10b981] hover:border-white transition-all transform hover:scale-105 uppercase tracking-wider flex-1"
                  >
                    GO BACK TO VIDEO
                  </button>
                  <button 
                    onClick={() => {
                      if (forcedConsumption && !watchedVideos[activeVideo.id]) {
                        alert(`❌ SHUTDOWN VIOLATION! You have not completed the mandatory 10-second viewing phase for this broadcast. Close sequence aborted.`);
                        setCancelStep(0);
                      } else {
                        setCancelStep(2);
                        setQuizAnswer('');
                        setQuizError('');
                      }
                    }}
                    className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] hover:from-[#312e81] hover:to-[#4338ca] text-red-500 hover:text-red-300 font-black py-3.5 px-6 rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.1)] border-2 border-red-950 hover:border-red-500 transition-all transform hover:scale-105 uppercase tracking-widest flex-1"
                  >
                    I ACCEPT. CANCEL.
                  </button>
                </div>
              </div>
            )}

            {cancelStep === 2 && (
              <div className="bg-gradient-to-b from-[#0b0f19] to-[#02050f] p-6 sm:p-8 text-center border-t-4 border-amber-600 flex-grow flex flex-col justify-center min-h-0 overflow-y-auto custom-scrollbar-dark font-mono">
                <h3 className="text-amber-500 font-black text-xl sm:text-2xl mb-4 animate-bounce flex-shrink-0 tracking-wider">
                  🧐 COGNITIVE COMPREHENSION VERIFICATION 🧐
                </h3>
                
                <div className="text-left bg-[#030712] border-2 border-amber-950 shadow-[inset_0_0_30px_rgba(245,158,11,0.15)] rounded-lg p-5 sm:p-6 text-[#f8fafc] space-y-4 mb-6 font-mono text-sm sm:text-base max-w-xl mx-auto w-full">
                  <p className="text-amber-400 font-black border-b border-amber-950/60 pb-3 uppercase tracking-wider flex items-center gap-2">
                    <span>🕵️</span> State Directive Compliance Quiz:
                  </p>
                  
                  <p className="text-gray-300 font-bold uppercase leading-relaxed">
                    {COMPREHENSION_QUIZ[activeVideo.id]?.question}
                  </p>

                  {quizError && (
                    <div className="bg-red-950/60 border-2 border-red-500 p-3 rounded-lg text-red-400 text-xs font-black uppercase animate-pulse leading-snug">
                      {quizError}
                    </div>
                  )}
                  
                  <input 
                    type="text" 
                    placeholder="Type your answer here..."
                    className="w-full bg-black border-2 border-amber-950 rounded-lg p-3 text-white font-mono uppercase text-sm focus:outline-none focus:border-amber-500 placeholder-gray-600"
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                  />

                  <p className="text-[10px] text-amber-500/60 leading-normal uppercase">
                    {COMPREHENSION_QUIZ[activeVideo.id]?.hint}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-auto flex-shrink-0 w-full max-w-xl mx-auto">
                  <button 
                    onClick={() => {
                      setCancelStep(1);
                      setQuizAnswer('');
                      setQuizError('');
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white font-extrabold py-3.5 px-6 rounded-lg border border-slate-800 uppercase tracking-wider flex-1 cursor-pointer"
                  >
                    📖 Read Directives Again
                  </button>
                  
                  <button 
                    onClick={() => {
                      const quiz = COMPREHENSION_QUIZ[activeVideo.id];
                      const cleanAnswer = quizAnswer.trim().toLowerCase();
                      const isCorrect = quiz.answers.some(ans => cleanAnswer === ans.toLowerCase().trim());
                      
                      if (isCorrect && cleanAnswer !== "") {
                        alert("🎉 COGNITIVE EXCELLENCE! Your answer is verified by the Ministry of Information. You are approved to close the broadcast.");
                        setActiveVideo(null);
                      } else {
                        setQuizError("🚨 INCORRECT CITIZEN REPORT! You failed the comprehension check. You are clearly not paying attention to state-mandated news. Returning you to the study materials in 3 seconds.");
                        setTimeout(() => {
                          setCancelStep(1);
                          setQuizAnswer('');
                          setQuizError('');
                        }, 3000);
                      }
                    }}
                    className="bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-500 hover:to-amber-800 text-white font-black py-3.5 px-6 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] border-2 border-amber-500 hover:border-white transition-all transform hover:scale-105 uppercase tracking-widest flex-1 cursor-pointer"
                  >
                    🔍 Verify Answer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Anti-Loitering Protocol Overlay */}
      {isLurking && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[95vh] bg-gradient-to-br from-[#1e1b4b] to-[#030712] border-4 border-red-600 rounded-xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(220,38,38,0.4)] animate-[pulse_3s_infinite] flex flex-col min-h-0 overflow-y-auto custom-scrollbar-dark">
            <h2 className="text-red-500 font-black text-xl sm:text-2xl mb-4 tracking-widest animate-bounce flex-shrink-0 flex items-center justify-center gap-3">
              <span>🚨</span> ANTI-LOITERING PROTOCOL ACTIVATED <span>🚨</span>
            </h2>
            
            <div className="text-left bg-black/70 border border-red-950 p-5 rounded-lg text-gray-300 space-y-4 mb-6 font-mono text-sm leading-relaxed flex-grow overflow-y-auto min-h-[150px] custom-scrollbar-dark">
              <p className="text-red-400 font-bold uppercase tracking-wider border-b border-red-950/60 pb-2 flex items-center gap-2">
                <span>⚠️</span> Citizen Offense: Passive Loitering
              </p>
              <p>
                Our algorithms have determined that you have spent more than 10 seconds idling on this portal without fulfilling your civic duty of clicking and consuming verified state media.
              </p>
              <p className="text-yellow-500 font-semibold animate-pulse">
                PENALTY: Your browser session is now throttled and locked.
              </p>
              <p className="text-white border-t border-red-950/60 pt-4">
                To lift this sanction, you must type the official Pledge of Loyalty exactly as shown below (Copy-Paste is blocked for your protection):
              </p>
              <div className="bg-[#020617] p-4 rounded border border-red-950/60 text-[#f8fafc] font-black italic text-center select-none text-xs sm:text-sm">
                "{OATH_TEXT}"
              </div>
            </div>

            <textarea
              className="w-full bg-[#020617] border-2 border-red-950 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:border-red-600 transition-colors mb-6 resize-none h-20 flex-shrink-0"
              placeholder="Type the loyalty pledge here..."
              value={typedOath}
              onChange={(e) => setTypedOath(e.target.value)}
              onPaste={(e) => {
                e.preventDefault();
                alert("Nice try, Citizen! The Ministry has recorded this attempt at bypass. Typing manually is mandatory.");
              }}
            />

            <div className="flex flex-col gap-3 flex-shrink-0">
              <button
                disabled={typedOath.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") !== OATH_TEXT.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")}
                onClick={() => {
                  setIsLurking(false);
                  setTypedOath('');
                  setForcedConsumption(true);
                  localStorage.setItem('stateMediaLock', 'true');
                  alert("🚨 LOCKOUT STATUS ACTIVE! Pledge recorded. Your browser has been entered into 'Forced State Media Consumption Mode'. You are barred from leaving this page or clicking services until you have fully consumed all 7 verified news broadcasts for at least 10 seconds each. Go!");
                }}
                className={`w-full py-4 rounded-lg font-black uppercase tracking-widest text-xs sm:text-sm transition-all transform border-2 ${
                  typedOath.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === OATH_TEXT.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-500 hover:border-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-102 cursor-pointer'
                    : 'bg-gray-800 text-gray-500 border-gray-900 cursor-not-allowed'
                }`}
              >
                SUBMIT LOYALTY PLEDGE
              </button>
              
              <button
                onClick={() => {
                  alert("💸 Fine of ₹2,500 has been successfully auto-debited from your linked Aadhar bank account. However, paying the fine does NOT excuse you from active patriotism! You MUST still manually type the Loyalty Pledge to unlock your session.");
                }}
                className="text-xs text-red-500 hover:text-red-400 font-black uppercase tracking-wider underline transition-all hover:scale-105 cursor-pointer shadow-red-500/20 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse"
              >
                Or pay ₹2,500 Digital Loitering Fine immediately (Does Not Bypass Lock)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Annoying Idle Reminder Popup */}
      {showAnnoyingPopup && (
        <div className="fixed inset-0 z-[9998] bg-black/85 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-red-950 to-black border-4 border-yellow-500 rounded-xl p-6 max-w-md w-full text-center shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-[bounce_1s_infinite]">
            <span className="text-3xl mb-4 block animate-bounce">📢 WARNING #{annoyingPopupCount} 📢</span>
            <h3 className="text-yellow-500 font-black text-lg mb-4 uppercase tracking-widest">Passive Idling Detected</h3>
            <p className="text-gray-300 font-mono text-xs sm:text-sm mb-6 leading-relaxed">
              You have been idling on the dashboard for 20 seconds without consuming news. Under sub-section 4B of the Digital Media Act, active viewing is highly encouraged. Consuming state media is not optional!
            </p>
            <button
              onClick={() => {
                setShowAnnoyingPopup(false);
                setIdleTimerCount(0);
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 px-6 rounded border-2 border-yellow-300 hover:border-white transition-all transform hover:scale-102 uppercase tracking-widest text-sm"
            >
              OK, I WILL BE GOOD & WATCH NOW
            </button>
          </div>
        </div>
      )}

      {/* Super unhinged Rickroll Runaway Button Punishment */}
      {rickrollActive && (
        <div className="fixed inset-0 z-[99999] bg-[#020617] flex flex-col justify-center items-center p-6 text-white text-center select-none overflow-hidden">
          <audio src="/audio/Never gonna give you up.mp3" autoPlay loop />
          
          <div className="max-w-2xl w-full flex flex-col items-center gap-6 z-10">
            {/* Flashing lights and spinning alert symbols */}
            <div className="relative w-24 h-24 flex items-center justify-center mb-2">
              <span className="text-6xl animate-ping absolute">🚨</span>
              <span className="text-6xl relative z-10 animate-pulse">🚨</span>
            </div>
            
            <h1 className="text-red-500 font-black text-3xl sm:text-5xl tracking-widest uppercase animate-pulse leading-none">
              TREASON LEVEL 5 DETECTED
            </h1>
            <h2 className="text-yellow-500 font-bold text-lg sm:text-xl font-mono uppercase tracking-wider">
              System Seized for Patriotism Calibration
            </h2>
            
            <div className="bg-slate-900/80 border-2 border-red-500/50 p-6 sm:p-8 rounded-xl max-w-xl shadow-[0_0_50px_rgba(239,68,68,0.15)] backdrop-blur-sm relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_100%)]"></div>
              <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed mb-6 relative z-10">
                "Dear citizen, you have actively ignored five consecutive verified news media consumption directives. Under digital safety sub-section 99-Z, your session has been temporarily hijacked. Rick Astley has been assigned as your compliance officer. You must click the escape button below to surrender your insubordination."
              </p>
              
              <div className="text-[10px] sm:text-xs text-yellow-500 font-mono tracking-widest uppercase animate-pulse mb-2 relative z-10">
                🔒 Lock Protocol Active • Audio Override Engaged
              </div>
              <div className="text-[10px] sm:text-xs text-red-400 font-mono font-bold uppercase relative z-10">
                {buttonEscapes < 10 ? (
                  <span className="animate-pulse">⚠️ BUTTON IS TRYING TO RUN AWAY! CHASE IT! ESCAPES REMAINING: {10 - buttonEscapes}</span>
                ) : (
                  <span className="text-emerald-400 font-black animate-bounce">✅ COMPLIANCE ACHIEVED. THE BUTTON HAS SURRENDERED. CLICK IT TO EXIT!</span>
                )}
              </div>
            </div>

            {/* Runaway escape button */}
            <button
              onMouseEnter={handleButtonHover}
              onClick={buttonEscapes >= 10 ? handleExitRickroll : undefined}
              className={`px-8 py-4 font-black rounded-xl shadow-2xl transition-all uppercase tracking-widest text-xs sm:text-sm cursor-pointer whitespace-nowrap ${
                buttonEscapes < 10 
                  ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border-2 border-red-400' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white border-2 border-emerald-400 scale-110 animate-bounce'
              }`}
              style={{
                position: 'fixed',
                top: buttonPos.top,
                left: buttonPos.left,
                transform: 'translate(-50%, -50%)',
                zIndex: 999999,
                transition: buttonEscapes < 10 ? 'all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
              }}
            >
              {buttonEscapes < 10 ? (
                `🏃 Click to Surrender (${buttonEscapes}/10)`
              ) : (
                '🤝 SIGN COMPLIANCE AGREEMENT & EXIT RICKROLL'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
