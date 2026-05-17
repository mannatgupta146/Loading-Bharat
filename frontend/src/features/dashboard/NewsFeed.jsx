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

const NewsFeed = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [cancelStep, setCancelStep] = useState(0);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  const handleOpenVideo = (item) => {
    setActiveVideo(item);
    setCancelStep(0);
  };

  return (
    <div className="bg-white border border-gray-300 shadow-md h-full flex flex-col">
      <div className="bg-[#003366] text-white p-3 border-b border-[#002244] flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
          📰 100% Verified Unbiased State Media
        </h3>
        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)] border border-red-300">MANDATORY VIEWING</span>
      </div>
      
      <div className="p-4 bg-gray-100 flex-grow">
        <div className="flex flex-col gap-4">
          {NEWS_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="border-2 border-gray-300 bg-gray-50 rounded overflow-hidden hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:border-red-400 transition-all cursor-pointer flex flex-col relative min-h-[120px]"
              onClick={() => handleOpenVideo(item)}
              onMouseEnter={() => setHoveredVideoId(item.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
            >
              {hoveredVideoId === item.id && (
                <div className="w-full h-60 sm:h-[450px] bg-gray-900 relative flex-shrink-0 flex items-center justify-center overflow-hidden border-b-4 border-red-500 animate-[pulse_0.5s_ease-in-out]">
                  {!item.videoUrl.endsWith('.mp3') ? (
                    <video 
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                      src={item.videoUrl}
                      autoPlay
                      loop
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 border-2 border-dashed border-gray-600 m-2">
                      <span className="text-red-500 font-black text-lg animate-bounce tracking-widest">🔊 AUDIO FEED ACTIVE</span>
                      <audio src={item.videoUrl} autoPlay className="hidden" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-0 pointer-events-none"></div>
                  <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded shadow z-10 border border-red-900 tracking-wider">
                    {item.category}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/90 text-xs text-red-500 font-bold px-3 py-1 rounded z-10 animate-pulse border border-red-900 shadow-[0_0_10px_rgba(255,0,0,0.8)] tracking-widest">
                    🔴 LIVE
                  </span>
                </div>
              )}
              
              <div className={`p-5 flex-grow flex flex-col justify-center transition-all ${hoveredVideoId === item.id ? 'bg-gradient-to-b from-red-50 to-white' : 'bg-gradient-to-b from-yellow-50 to-white'}`}>
                <h4 className="font-black text-[#003366] text-xl leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-800 leading-snug font-medium">
                  {item.description}
                </p>
                {hoveredVideoId !== item.id && (
                  <div className="mt-3 text-[10px] text-red-600 font-bold uppercase flex items-center gap-1 opacity-60">
                    <span>Hover to access mandatory media broadcast</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[95vh] bg-gradient-to-br from-[#0c1020] to-[#030712] border-4 border-[#1e293b] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col">
            
            <div className="bg-gradient-to-r from-[#003366] to-[#001f3f] p-4 border-b-4 border-amber-500 flex-shrink-0 text-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <h2 className="text-white font-black text-lg sm:text-xl tracking-widest uppercase">{activeVideo.title}</h2>
            </div>
 
            {cancelStep === 0 ? (
              <div className="flex-grow flex flex-col min-h-0 overflow-y-auto bg-[#020617]">
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
                  <p className="text-red-500 text-xs sm:text-sm italic font-extrabold mb-4 animate-pulse uppercase tracking-widest">
                    {activeVideo.warningText}
                  </p>
                  <button 
                    onClick={() => setCancelStep(1)}
                    className="w-full max-w-md bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-black py-3.5 px-8 rounded-lg shadow-[0_0_25px_rgba(220,38,38,0.5)] border-2 border-red-500 hover:border-white transition-all transform hover:scale-105 uppercase tracking-widest text-xs sm:text-sm animate-[pulse_2.5s_infinite]"
                  >
                    TERMINATE BROADCAST
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-[#0b0f19] to-[#02050f] p-6 sm:p-8 text-center border-t-4 border-red-700 flex-grow flex flex-col justify-center min-h-0 overflow-y-auto">
                <h3 className="text-red-500 font-black text-xl sm:text-3xl mb-4 animate-bounce flex-shrink-0 tracking-wider">⚠️ WAIT! MANDATORY DETAILED NEWS ⚠️</h3>
                
                <div className="text-left bg-[#030712] border-2 border-red-950 shadow-[inset_0_0_30px_rgba(220,38,38,0.15)] rounded-lg p-5 sm:p-6 text-[#f8fafc] space-y-4 mb-6 overflow-y-auto font-mono text-sm sm:text-base flex-grow min-h-[180px]">
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
                    onClick={() => setActiveVideo(null)}
                    className="bg-gradient-to-r from-[#1e1b4b] to-[#312e81] hover:from-[#312e81] hover:to-[#4338ca] text-red-500 hover:text-red-300 font-black py-3.5 px-6 rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.1)] border-2 border-red-950 hover:border-red-500 transition-all transform hover:scale-105 uppercase tracking-widest flex-1"
                  >
                    I ACCEPT. CANCEL.
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
