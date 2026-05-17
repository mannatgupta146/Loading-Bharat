import React, { useState } from 'react';
import { X, Play } from 'lucide-react';

const NEWS_ITEMS = [
  {
    id: 1,
    title: "WEST BENGAL ELECTION: Mamata's Masterstroke!",
    description: "TMC announces revolutionary scheme: 100% reservation for people who know the 'Humba Dumba' lyrics. EVMs to be replaced by ballot boxes guarded by Royal Bengal Tigers.",
    videoUrl: "/news/mamta.mp4",
    category: "Politics",
    warningText: "Warning: This video contains 48 hours of continuous slogan chanting. Cancel to save your eardrums."
  },
  {
    id: 2,
    title: "TAMIL NADU ELECTION: EVM Hack Confirmed?",
    description: "Breaking: Election Commission confirms all votes in TN will automatically be redirected to Thalapathy Vijay's new party. Democracy has left the chat.",
    videoUrl: "/news/thalapathy.mp4",
    category: "Politics",
    warningText: "Warning: This action sequence is 14 days long. Do not attempt to cancel if you are a true fan."
  },
  {
    id: 3,
    title: "GOVT TAXES CSK VICTORIES",
    description: "New GST slab introduced: 28% tax on celebrating MS Dhoni. Citizens caught whistling will be fined ₹50,000.",
    videoUrl: "/news/csk.mp4",
    category: "Sports",
    warningText: "Warning: Video contains unauthorized yellow colors. Proceeding will alert the Income Tax Department."
  },
  {
    id: 4,
    title: "Masterclass: 12 Years of Silence",
    description: "A comprehensive, highly detailed 10-hour documentary on unscripted press conferences.",
    videoUrl: "/news/modi.mp4",
    category: "Politics",
    warningText: "Warning: This documentary is 10 hours of absolute silence. It is highly recommended by the ruling party."
  },
  {
    id: 5,
    title: "Why Rahul Gandhi SHOULD be PM (Satire Edition)",
    description: "Congress party releases their ultimate campaign anthem. Experts say it will secure exactly 42 seats.",
    videoUrl: "/news/rahul.mp4",
    category: "Politics",
    warningText: "Warning: Viewer discretion advised. May cause uncontrollable face-palming. 5 hours remaining."
  },
  {
    id: 6,
    title: "UP ELECTION: Infrastructure Update",
    description: "New government scheme: Why build roads when you can just bulldoze the potholes? Mafia relocated to Mars.",
    videoUrl: "/news/yogi.mp4",
    category: "Politics",
    warningText: "Warning: This video will demolish your browser cache. Cancel before it reaches your hard drive."
  },
  {
    id: 7,
    title: "Akhilesh Yadav's Emotional Blackmail",
    description: "'Kab aaoge mere Akhilesh?' The Election Commission has banned this song for causing extreme depression among voters.",
    videoUrl: "/news/yadav.mp3",
    category: "Politics",
    warningText: "Warning: This audio contains 300 verses of crying. Do you really want to endure this?"
  }
];

const NewsFeed = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [cancelStep, setCancelStep] = useState(0);

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
      
      <div className="p-4 bg-gray-100 flex-grow overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="flex flex-col gap-4">
          {NEWS_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="border-2 border-gray-300 bg-gray-50 rounded overflow-hidden hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:border-red-400 transition-all cursor-pointer group flex flex-col sm:flex-row relative min-h-[144px]"
              onClick={() => handleOpenVideo(item)}
              onMouseEnter={() => setHoveredVideoId(item.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
            >
              <div className="h-48 sm:h-auto sm:w-64 bg-gray-900 relative flex-shrink-0 flex items-center justify-center overflow-hidden border-b-2 sm:border-b-0 sm:border-r-2 border-red-200">
                {hoveredVideoId === item.id && !item.videoUrl.endsWith('.mp3') ? (
                  <video 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    src={item.videoUrl}
                    autoPlay
                    loop
                  />
                ) : (
                  <Play className="text-white w-12 h-12 opacity-80 group-hover:scale-110 transition-transform z-10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0"></div>
                <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded shadow z-10 border border-red-900 tracking-wider">
                  {item.category}
                </span>
                {hoveredVideoId === item.id && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-xs text-red-500 font-bold px-2 py-1 rounded z-10 animate-pulse border border-red-900">
                    🔴 LIVE PREVIEW
                  </span>
                )}
              </div>
              <div className="p-4 flex-grow bg-gradient-to-b sm:bg-gradient-to-r from-yellow-50 to-white flex flex-col justify-center">
                <h4 className="font-bold text-[#003366] text-base leading-tight mb-2 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-700 leading-snug font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-black border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl relative">
            
            <div className="bg-gray-900 p-3 flex justify-between items-center border-b border-gray-800">
              <h2 className="text-white font-bold text-lg">{activeVideo.title}</h2>
              <button 
                onClick={() => setCancelStep(1)}
                className="text-gray-400 hover:text-white bg-gray-800 hover:bg-red-600 p-1 rounded transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {cancelStep === 0 ? (
              <>
                <div className={`relative ${activeVideo.videoUrl.endsWith('.mp3') ? 'py-10 bg-gray-800' : 'pt-[56.25%] bg-black'}`}>
                  {activeVideo.videoUrl.endsWith('.mp3') ? (
                    <audio 
                      className="w-full px-4"
                      src={activeVideo.videoUrl}
                      autoPlay
                      controls
                    />
                  ) : (
                    <video 
                      className="absolute inset-0 w-full h-full object-contain"
                      src={activeVideo.videoUrl}
                      autoPlay
                      controls
                    />
                  )}
                </div>
                
                <div className="bg-gray-900 p-4 border-t-4 border-red-800 text-center flex flex-col items-center">
                  <p className="text-red-400 text-sm italic font-black mb-4 animate-pulse">
                    {activeVideo.warningText}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 w-full">
                    <button 
                      onClick={() => alert("Action logged. The Election Commission thanks you for your unwavering support.")}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded shadow border border-gray-500 transition-colors text-xs flex-1 max-w-[200px]"
                    >
                      I AGREE WITH THIS
                    </button>
                    <button 
                      onClick={() => setCancelStep(1)}
                      className="bg-red-700 hover:bg-red-800 text-white font-black py-2 px-8 rounded shadow-lg border-2 border-red-400 hover:border-white transition-all transform hover:scale-105 uppercase tracking-widest flex-1 max-w-[300px]"
                    >
                      TERMINATE BROADCAST
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-900 p-8 text-center border-t-4 border-red-800">
                <h3 className="text-red-500 font-black text-2xl mb-4 animate-bounce">⚠️ WAIT! MANDATORY DETAILED NEWS ⚠️</h3>
                <div className="text-left bg-black p-4 rounded border border-gray-700 text-gray-300 space-y-3 mb-6 h-48 overflow-y-auto font-mono text-sm">
                  <p>Before you cancel, you are legally required to read the following Detailed News:</p>
                  <p>1. The GDP has grown by 4000% but it is currently stuck in traffic.</p>
                  <p>2. A new tax has been introduced on 'Skipping Government Videos'. By reading this, you owe ₹5,000.</p>
                  <p>3. If you click cancel now, your Aadhar card will automatically be linked to a random stray dog.</p>
                  <p>4. The weather tomorrow will be heavily censored for your protection.</p>
                  <p>Do you STILL wish to abandon your civic duty and close this video?</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setCancelStep(0)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded shadow border-2 border-blue-400 transition-colors flex-1"
                  >
                    GO BACK TO VIDEO
                  </button>
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="bg-red-700 hover:bg-red-800 text-white font-black py-3 px-6 rounded shadow border-2 border-red-900 hover:border-red-400 transition-all uppercase flex-1"
                  >
                    I ACCEPT THE CONSEQUENCES. CANCEL.
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
