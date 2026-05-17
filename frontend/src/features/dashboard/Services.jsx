import React, { useState } from 'react';
import { X, ShieldAlert, Plane, Car, FileText, Landmark, RefreshCw, AlertCircle, MessageSquare, Search, Zap, Award, Star, CheckCircle } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState(null); // 'driving' | 'flight' | 'grievance' | 'factcheck' | 'bypass'
  const [flightSubState, setFlightSubState] = useState('warning'); // 'warning' | 'loading' | 'crying'
  const [flightStep, setFlightStep] = useState(0);
  const [drivingSubState, setDrivingSubState] = useState('warning'); // 'warning' | 'loading' | 'crying'
  const [drivingStep, setDrivingStep] = useState(0);

  // Grievance filing states
  const [grievanceText, setGrievanceText] = useState('');
  const [grievanceState, setGrievanceState] = useState('form'); // 'form' | 'loading' | 'assigned'
  const [loadingStep, setLoadingStep] = useState(0);

  // Fact-checking states (Modi video)
  const [factCheckClaim, setFactCheckClaim] = useState(0); // 0 | 1 | 2
  const [factCheckOptimistic, setFactCheckOptimistic] = useState(false);
  const [factCheckState, setFactCheckState] = useState('form'); // 'form' | 'loading' | 'assigned'
  const [factCheckStep, setFactCheckStep] = useState(0);

  // Express Queue Bypass states (Gandhi video)
  const [bypassGift, setBypassGift] = useState(1); // 0 = Tea, 1 = Kaju Katli, 2 = Gold Stamp, 3 = Suitcase
  const [bypassState, setBypassState] = useState('form'); // 'form' | 'loading' | 'assigned'
  const [bypassStep, setBypassStep] = useState(0);

  // Gold Investment states
  const [goldState, setGoldState] = useState('form'); // 'form' | 'loading' | 'assigned'
  const [goldStep, setGoldStep] = useState(0);
  const [potatoCount, setPotatoCount] = useState(0);

  // GitHub mandatory star and Maa Kasam compliance states
  const [pendingService, setPendingService] = useState(null);
  const [showStarModal, setShowStarModal] = useState(false);
  const [starModalStage, setStarModalStage] = useState('projects'); // 'projects' | 'kasam'
  const [starCountdown, setStarCountdown] = useState(5);
  const [hasSworn, setHasSworn] = useState(false);

  // MAPPING: ONE SPECIFIC REPO BEFORE ONE SERVICE
  const SERVICE_PROJECT_MAP = {
    driving: {
      id: 'moodify',
      title: 'Moodify',
      description: 'Real-time emotion detection music platform that uses webcam-based facial analysis to detect your mood and play matching music.',
      url: 'https://github.com/mannatgupta146/Moodify.git'
    },
    flight: {
      id: 'manos',
      title: 'ManOS.dev',
      description: 'A macOS-inspired interactive portfolio experience built with React and Vite featuringdraggable windows, notification chimes, and responsive interactions.',
      url: 'https://github.com/mannatgupta146/ManOS.dev.git'
    },
    grievance: {
      id: 'manclarity',
      title: 'Manclarity AI',
      description: 'An AI-powered search and knowledge assistant inspired by Perplexity with live intelligent responses and discoverability.',
      url: 'https://github.com/mannatgupta146/Manclarity-AI.git'
    },
    gold: {
      id: 'mindgraph',
      title: 'MindGraph',
      description: 'A cognitive operating system creating a Neural Link between your browser and a centralized knowledge vault.',
      url: 'https://github.com/mannatgupta146/MindGraph.git'
    },
    factcheck: {
      id: 'dogstudio',
      title: 'Dog Studio Clone',
      description: 'A visually immersive and motion-heavy Three.js and GSAP scroll cinematic web experience cloned to perfection.',
      url: 'https://github.com/mannatgupta146/Dog-Studio.git'
    },
    bypass: {
      id: 'buildex',
      title: 'Buildex',
      description: 'An AI-powered application generator platform inspired by Lovable focused on accelerated product prototyping.',
      url: 'https://github.com/mannatgupta146/Buildex.git'
    }
  };

  // Helper to play notification sound
  const playTing = () => {
    const audio = new Audio('/service/ting.mp3');
    audio.play().catch((err) => console.log('Audio error:', err));
  };

  const handleServiceClick = (service) => {
    playTing();
    setPendingService(service);
    setShowStarModal(true);
    setStarModalStage('projects');
    setStarCountdown(5);
    setHasSworn(false);

    // Decrement countdown timer every second
    const interval = setInterval(() => {
      setStarCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOpenService = (service) => {
    setSelectedService(service);
    setFlightSubState('warning');
    setFlightStep(0);
    setDrivingSubState('warning');
    setDrivingStep(0);
    setGrievanceState('form');
    setGrievanceText('');
    setLoadingStep(0);
    setFactCheckState('form');
    setFactCheckClaim(0);
    setFactCheckOptimistic(false);
    setFactCheckStep(0);
    setBypassState('form');
    setBypassGift(1);
    setBypassStep(0);
    setGoldState('form');
    setGoldStep(0);
    setPotatoCount(0);
  };

  const handleCloseService = () => {
    setSelectedService(null);
    setFlightSubState('warning');
    setFlightStep(0);
    setDrivingSubState('warning');
    setDrivingStep(0);
    setGrievanceState('form');
    setGrievanceText('');
    setLoadingStep(0);
    setFactCheckState('form');
    setFactCheckClaim(0);
    setFactCheckOptimistic(false);
    setFactCheckStep(0);
    setBypassState('form');
    setBypassGift(1);
    setBypassStep(0);
    setGoldState('form');
    setGoldStep(0);
    setPotatoCount(0);
  };

  const handleDrivingSubmit = () => {
    setDrivingSubState('loading');
    setDrivingStep(0);
    
    setTimeout(() => {
      setDrivingStep(1);
    }, 1500);
    
    setTimeout(() => {
      setDrivingStep(2);
    }, 3000);
    
    setTimeout(() => {
      setDrivingSubState('crying');
    }, 4500);
  };

  const handleFlightSubmit = () => {
    setFlightSubState('loading');
    setFlightStep(0);
    
    setTimeout(() => {
      setFlightStep(1);
    }, 1500);
    
    setTimeout(() => {
      setFlightStep(2);
    }, 3000);
    
    setTimeout(() => {
      setFlightSubState('crying');
    }, 4500);
  };

  const handleGoldSubmit = (e) => {
    e.preventDefault();
    setGoldState('loading');
    setGoldStep(0);
    
    setTimeout(() => {
      setGoldStep(1);
    }, 1500);
    
    setTimeout(() => {
      setGoldStep(2);
    }, 3000);
    
    setTimeout(() => {
      setGoldState('assigned');
    }, 4500);
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;
    
    setGrievanceState('loading');
    setLoadingStep(0);
    
    setTimeout(() => {
      setLoadingStep(1);
    }, 1500);
    
    setTimeout(() => {
      setLoadingStep(2);
    }, 3000);
    
    setTimeout(() => {
      setGrievanceState('assigned');
    }, 4500);
  };

  const handleFactCheckSubmit = (e) => {
    e.preventDefault();
    if (factCheckClaim !== 1 || !factCheckOptimistic) return;
    
    setFactCheckState('loading');
    setFactCheckStep(0);
    
    setTimeout(() => {
      setFactCheckStep(1);
    }, 1500);
    
    setTimeout(() => {
      setFactCheckStep(2);
    }, 3000);
    
    setTimeout(() => {
      setFactCheckState('assigned');
    }, 4500);
  };

  const handleBypassSubmit = (e) => {
    e.preventDefault();
    
    setBypassState('loading');
    setBypassStep(0);
    
    setTimeout(() => {
      setBypassStep(1);
    }, 1500);
    
    setTimeout(() => {
      setBypassStep(2);
    }, 3000);
    
    setTimeout(() => {
      setBypassState('assigned');
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-fade-in">
      <div className="bg-[#020617] border-4 border-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="bg-gradient-to-r from-[#003366] to-[#001f3f] p-5 border-b-4 border-orange-500 flex justify-between items-center">
          <h3 className="font-black uppercase tracking-widest text-base sm:text-lg flex items-center gap-3 text-white">
            <span>🏛️</span> Centralized Bureaucracy Portal
          </h3>
          <span className="text-[10px] sm:text-xs bg-red-950 text-red-400 font-mono px-3 py-1 rounded border border-red-900 animate-pulse font-black uppercase">
            ⚡ Connection Blocked
          </span>
        </div>

        <div className="p-6 bg-gradient-to-b from-[#0f172a] to-[#020617] flex-grow">
          <p className="text-gray-400 text-xs sm:text-sm font-mono leading-relaxed mb-8 border-b border-slate-800 pb-4">
            Welcome to the centralized citizen request terminal. In accordance with the Digital India Suffering Mandate, all services are optimized for maximum processing delay. Select a petition module below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Driving License Service */}
            <button 
              onClick={() => handleServiceClick('driving')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-red-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-950/40 rounded-lg border border-red-900/60 group-hover:bg-red-950 transition-colors">
                  <Car className="text-red-500 w-6 h-6 group-hover:animate-bounce" />
                </div>
                <span className="text-[9px] font-mono text-red-500 border border-red-950 bg-red-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  ⚠️ HIGH DECAY RISK
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-red-400 transition-colors mb-1">
                  Apply for Driving License
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Safety assessment: denied by default
                </div>
              </div>
            </button>

            {/* Flight Ticket Booking */}
            <button 
              onClick={() => handleServiceClick('flight')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-amber-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-950/40 rounded-lg border border-amber-900/60 group-hover:bg-amber-950 transition-colors">
                  <Plane className="text-amber-500 w-6 h-6 group-hover:animate-pulse" />
                </div>
                <span className="text-[9px] font-mono text-amber-500 border border-amber-950 bg-amber-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  ✈️ CITIZEN HAZARD
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-amber-400 transition-colors mb-1">
                  Book Domestic Flight Ticket
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Risk status: absolute liability waiver
                </div>
              </div>
            </button>

            {/* Report Public Grievance */}
            <button 
              onClick={() => handleServiceClick('grievance')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-orange-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-950/40 rounded-lg border border-orange-900/60 group-hover:bg-orange-950 transition-colors">
                  <MessageSquare className="text-orange-500 w-6 h-6 group-hover:animate-bounce" />
                </div>
                <span className="text-[9px] font-mono text-orange-500 border border-orange-950 bg-orange-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">
                  🚨 DESK BABU ESCALATION
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-orange-400 transition-colors mb-1">
                  Report Public Grievance
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Babu status: currently scrolling reels
                </div>
              </div>
            </button>

            {/* Gold Investment */}
            <button 
              onClick={() => handleServiceClick('gold')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-amber-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-950/40 rounded-lg border border-amber-900/60 group-hover:bg-amber-950 transition-colors">
                  <Landmark className="text-amber-500 w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[9px] font-mono text-amber-500 border border-amber-950 bg-amber-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">
                  ✨ ALCHEMICAL WEALTH
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-amber-400 transition-colors mb-1">
                  Gold Investment Portal
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Alchemical rate: 100% potato conversion guaranteed
                </div>
              </div>
            </button>

            {/* Report Systemic Corruption (Modi video) */}
            <button 
              onClick={() => handleServiceClick('factcheck')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-red-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden animate-pulse"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-950/40 rounded-lg border border-red-900/60 group-hover:bg-red-950 transition-colors">
                  <Search className="text-red-500 w-6 h-6 group-hover:animate-bounce" />
                </div>
                <span className="text-[9px] font-mono text-red-500 border border-red-950 bg-red-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider animate-pulse">
                  📢 INTEGRITY AUDIT
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-red-400 transition-colors mb-1">
                  Report Systemic Corruption
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Status: 100% Corruption Free
                </div>
              </div>
            </button>

            {/* Express Queue Bypass (Gandhi video) */}
            <button 
              onClick={() => handleServiceClick('bypass')}
              className="bg-[#0b0f19] p-6 border-2 border-slate-800 hover:border-orange-500 rounded-xl text-left shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between group h-64 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-950/40 rounded-lg border border-orange-900/60 group-hover:bg-orange-950 transition-colors">
                  <Zap className="text-orange-500 w-6 h-6 group-hover:animate-pulse" />
                </div>
                <span className="text-[9px] font-mono text-orange-500 border border-orange-950 bg-orange-950/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  📝 EXAM PREPARATION
                </span>
              </div>
              <div>
                <div className="font-black text-white text-base sm:text-lg group-hover:text-orange-400 transition-colors mb-1">
                  IPL (Indian Paper Leak) Portal
                </div>
                <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                  Exams status: No paper is officially safe
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 🚗 Driving License Denial Modal */}
      {selectedService === 'driving' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#1e1b4b] to-[#030712] border-4 border-red-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)] my-8">
            {drivingSubState === 'warning' && (
              <>
                <div className="bg-red-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-900 shadow-md">
                  <ShieldAlert className="animate-bounce" /> 🏛️ MINISTRY OF SURFACE TRANSPORT
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Video (Unmuted with sound!) */}
                    <div className="w-full">
                      <video 
                        src="/service/bridge.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-red-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Side: Message & Action Buttons */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-red-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-red-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>🛑</span> SEC-44 INFRASTRUCTURE RISK DECLARATION:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          We regret to inform you that India is currently <strong className="text-red-400 font-black">NOT safe for driving</strong> due to collapsing bridges, rapid infrastructure decay, and spontaneous pothole generation. The Ministry cannot risk your valuable citizen life on the roads.
                        </p>
                        <p className="text-red-400 text-xs font-bold mt-4 animate-pulse">
                          DO YOU STILL INSIST ON DRIVING AND IGNORING GOVERNMENT SAFETY DECREES?
                        </p>
                      </div>
 
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={handleCloseService}
                          className="w-full sm:w-48 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-extrabold py-2.5 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ❌ No, I Don't Want to Die!
                        </button>
                        <button 
                          onClick={handleDrivingSubmit}
                          className="w-full sm:w-48 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-2.5 px-4 rounded-lg border border-red-500 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          🤝 Yes, I Insist on Driving
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {drivingSubState === 'loading' && (
              <>
                <div className="bg-red-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  ✨ PROCESSING ROAD SUITABILITY PERMISSION REQUEST
                </div>
                
                <div className="p-6">
                  <div className="bg-[#020617] border border-red-950 p-8 rounded-lg text-center font-mono md:h-[420px] flex flex-col justify-center items-center shadow-inner space-y-6">
                    <div className="relative w-24 h-24 flex items-center justify-center bg-red-950/40 rounded-full border border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
                      <Car className="text-red-500 w-12 h-12 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-red-500 font-black text-sm uppercase tracking-widest">
                        LICENSE APPLICATION IN PROGRESS:
                      </h4>
                      
                      <div className="h-6 flex items-center justify-center">
                        {drivingStep === 0 && (
                          <p className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            🚗 Initiating surface safety verification checks...
                          </p>
                        )}
                        {drivingStep === 1 && (
                          <p className="text-orange-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            ⚠️ Scanning national potholes & bridge integrity database...
                          </p>
                        )}
                        {drivingStep === 2 && (
                          <p className="text-red-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            🚨 Formulating standard government rejection response...
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(drivingStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {drivingSubState === 'crying' && (
              <>
                <div className="bg-red-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  😭 DEPT OF TRANSPORT SILENCE
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Crying Video (Unmuted with sound!) */}
                    <div className="w-full">
                      <video 
                        src="/service/crying.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-red-600 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Side: Message & Exit Button */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-red-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-red-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>😭</span> WE DON'T WANT YOU TO DIE!
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          We don't want you to die like this, so we didn't issue your driving license. Here is our grief, and enjoy living! (Please enjoy the premium safety of walking instead)
                        </p>
                        <p className="text-emerald-400 text-xs font-bold mt-4 animate-bounce uppercase">
                          Walking decree established. Enjoy the pure safety of being alive!
                        </p>
                      </div>
 
                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-red-700 to-red-950 hover:from-red-600 hover:to-red-850 text-white font-black py-3 px-6 rounded-lg border border-red-600 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-widest text-[10px] cursor-pointer text-center animate-pulse"
                      >
                        🤝 Accept Walking Decree & Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✈️ Flight Booking Risk Modal */}
      {selectedService === 'flight' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#1e293b] to-[#030712] border-4 border-amber-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)] my-8">
            {flightSubState === 'warning' && (
              <>
                <div className="bg-amber-600 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-amber-800 shadow-md">
                  <Plane className="animate-spin duration-[10s]" /> ✈️ DEPARTMENT OF AVIATION SURRENDER
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Video (Unmuted with sound!) */}
                    <div className="w-full">
                      <video 
                        src="/service/flight.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-amber-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Side: Message & Action Buttons */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-amber-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-amber-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>⚠️</span> EXTREME LIABILITY WAIVER:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          Flight booking suspended. The Ministry is <strong className="text-amber-400 font-black">NOT responsible for your life</strong> under the skies. With massive population loads, frequent extreme turbulence, and delayed maintenance, you fly strictly at your own ultimate risk.
                        </p>
                        <p className="text-yellow-400 text-xs font-bold mt-4 animate-pulse">
                          DO YOU STILL WISH TO PROCEED AND TAKE 100% PERSONAL LIFE RESPONSIBILITY?
                        </p>
                      </div>
 
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={handleCloseService}
                          className="w-full sm:w-48 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-extrabold py-2.5 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ❌ No, I Don't Want to Die!
                        </button>
                        <button 
                          onClick={handleFlightSubmit}
                          className="w-full sm:w-48 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-black py-2.5 px-4 rounded-lg border border-amber-500 hover:border-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          🤝 Yes, I Accept All Risks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {flightSubState === 'loading' && (
              <>
                <div className="bg-amber-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-amber-950 shadow-md">
                  ✨ PROCESSING AVIATION RISK INDEMNITY CONFIRMATION
                </div>
                
                <div className="p-6">
                  <div className="bg-[#020617] border border-amber-950 p-8 rounded-lg text-center font-mono md:h-[420px] flex flex-col justify-center items-center shadow-inner space-y-6">
                    <div className="relative w-24 h-24 flex items-center justify-center bg-amber-950/40 rounded-full border border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
                      <Plane className="text-amber-500 w-12 h-12 animate-spin duration-[5000ms]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-amber-500 font-black text-sm uppercase tracking-widest">
                        TICKET BOOKING IN PROGRESS:
                      </h4>
                      
                      <div className="h-6 flex items-center justify-center">
                        {flightStep === 0 && (
                          <p className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            ✈️ Connecting to government imaginary seating mainframe...
                          </p>
                        )}
                        {flightStep === 1 && (
                          <p className="text-orange-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            ⚠️ Securing 100% citizen liability waiver agreement...
                          </p>
                        )}
                        {flightStep === 2 && (
                          <p className="text-amber-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            🚨 Preparing official aviation grievance ticket response...
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-amber-600 to-yellow-400 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(flightStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {flightSubState === 'crying' && (
              <>
                <div className="bg-red-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  😭 DEPT OF AVIATION GRIEF MANAGEMENT
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Side: Crying Video (Unmuted with sound!) */}
                    <div className="w-full">
                      <video 
                        src="/service/crying.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-red-600 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Side: Message & Exit Button */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-red-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-red-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>😭</span> WE DON'T WANT YOU TO DIE!
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          We don't want you to die like this, so we didn't book your ticket. Here is our grief, and enjoy living! (Please enjoy the ground-level safety of staying alive on Earth)
                        </p>
                        <p className="text-emerald-400 text-xs font-bold mt-4 animate-bounce uppercase">
                          Imaginary ticket catalogued. Enjoy the pure safety of being alive!
                        </p>
                      </div>
 
                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-red-700 to-red-950 hover:from-red-600 hover:to-red-800 text-white font-black py-3 px-6 rounded-lg border border-red-600 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-widest text-[10px] cursor-pointer text-center animate-pulse"
                      >
                        🤝 Accept Imaginary Flight Status & Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* 📥 Public Grievance / Report an Issue Modal */}
      {selectedService === 'grievance' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#2e1305] to-[#030712] border-4 border-orange-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.3)] my-8">
            
            {grievanceState === 'form' && (
              <>
                <div className="bg-orange-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-900 shadow-md">
                  <MessageSquare className="animate-bounce" /> 🏛️ PUBLIC GRIEVANCE PETITION TERMINAL
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Warning Info */}
                    <div className="bg-[#020617] border border-orange-950 p-6 rounded-lg text-left font-mono md:h-[420px] flex flex-col justify-center shadow-inner">
                      <h4 className="text-orange-500 font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>⚠️</span> CITIZEN REGULATORY WARNING:
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Please note that complaining about slow server speeds, digital road hazards, or bureaucratic tea breaks is officially classified as <strong className="text-orange-400 font-black">"Impatience Against State Comfort"</strong> under circular 99-Z.
                      </p>
                      <p className="text-orange-400 text-xs leading-relaxed border-l-2 border-orange-700 pl-3">
                        Average Desk Officer Tea Break Duration: 7.2 hours. <br />
                        Average wait time for file dispatch: 15 years. <br />
                        If your file is processed earlier, your local Babu reserves the right to shred it immediately.
                      </p>
                    </div>
                    
                    {/* Right Column: Form Input */}
                    <form onSubmit={handleGrievanceSubmit} className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-orange-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <label className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                          Describe your suffering in precise bureaucratic language:
                        </label>
                        <textarea 
                          value={grievanceText}
                          onChange={(e) => setGrievanceText(e.target.value)}
                          placeholder="Please type your complaint here... (e.g. My driving application is pending for 100 years, kindly delay it further...)"
                          className="w-full h-40 bg-[#070b15] border border-orange-950 p-4 rounded-lg text-white font-mono text-xs sm:text-sm focus:border-orange-500 outline-none resize-none shadow-inner"
                          required
                        />
                        <p className="text-slate-500 text-[10px] mt-2 italic">
                          * By submitting, you agree to bear 100% of the cost of paper, ink, and officer biscuits.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          type="button"
                          onClick={handleCloseService}
                          className="w-full sm:w-48 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-extrabold py-2.5 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ❌ Withdraw Case
                        </button>
                        <button 
                          type="submit"
                          className="w-full sm:w-48 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 text-white font-black py-2.5 px-4 rounded-lg border border-orange-500 hover:border-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          📥 Submit Petition
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {grievanceState === 'loading' && (
              <>
                <div className="bg-orange-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-950 shadow-md">
                  ⏳ ALLOCATING BUREAUCRAT SERVICE DESK
                </div>
                
                <div className="p-8 md:h-[480px] flex flex-col justify-center items-center text-center font-mono">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-800 animate-spin duration-[10s]"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-dotted border-orange-600 animate-spin duration-[4s]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="text-orange-500 w-8 h-8 animate-spin" />
                    </div>
                  </div>
                  
                  <div className="bg-[#020617] border border-orange-950/60 p-6 rounded-xl max-w-xl shadow-2xl">
                    <span className="text-[10px] bg-orange-950 text-orange-400 border border-orange-900 px-3 py-1 rounded font-black uppercase tracking-wider animate-pulse mb-4 inline-block">
                      ⚙️ PORTAL VERIFICATION IN PROGRESS
                    </span>
                    
                    <div className="h-16 flex items-center justify-center">
                      {loadingStep === 0 && (
                        <p className="text-gray-300 text-sm sm:text-base font-bold animate-pulse">
                          🔍 Searching for active desk officer in your PIN code...
                        </p>
                      )}
                      {loadingStep === 1 && (
                        <p className="text-amber-400 text-sm sm:text-base font-bold animate-pulse">
                          💼 Officer found! Routing grievance to Senior Babu Shri Devendra Kumar...
                        </p>
                      )}
                      {loadingStep === 2 && (
                        <p className="text-emerald-400 text-sm sm:text-base font-bold animate-pulse animate-bounce">
                          🔌 Establishing secure connection to Bureaucrat Terminal...
                        </p>
                      )}
                    </div>
                    
                    <div className="w-full bg-slate-900 rounded-full h-2 mt-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-orange-600 to-amber-500 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(loadingStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {grievanceState === 'assigned' && (
              <>
                <div className="bg-orange-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-950 shadow-md">
                  🏛️ OFFICERS CLUB DECISION - DEFERRED
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Dhruv Rathee video */}
                    <div className="w-full">
                      <video 
                        src="/service/mood.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-orange-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(249,115,22,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Column: Grievance deferral details */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-orange-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-orange-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>🏛️</span> OFFICIAL DECISION BY SR. BABU:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                          The assigned Senior Babu reviewed your submission, sighed deeply, closed your file tab, and officially stated:
                        </p>
                        <blockquote className="bg-orange-950/20 border-l-4 border-orange-500 p-4 rounded text-orange-400 font-black italic text-sm sm:text-base mb-4 leading-relaxed">
                          "Aa mood nahi kar raha iss kaam ko. Kal dekhte hain, tab tak main reel scroll kar leta hoon."
                        </blockquote>
                        <p className="text-slate-400 text-xs">
                          Reason for deferral: Insufficient bureaucrat motivation. Officer has officially prioritized high-speed Instagram Reels. Please refrain from breathing near the terminal until the next lunar cycle.
                        </p>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-orange-700 to-orange-950 hover:from-orange-600 hover:to-orange-850 text-white font-black py-2.5 px-6 rounded-lg border border-orange-600 hover:border-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:scale-103 uppercase tracking-widest text-xs cursor-pointer text-center"
                      >
                        🤝 Respect Officer's Reels Time & Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 📢 Report Systemic Corruption Modal */}
      {selectedService === 'factcheck' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#2e0505] to-[#030712] border-4 border-red-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.3)] my-8">
            
            {factCheckState === 'form' && (
              <>
                <div className="bg-red-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  <Search className="animate-bounce" /> 📢 SYSTEMIC CORRUPTION INTEGRITY COMMISSION
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Warning Info */}
                    <div className="bg-[#020617] border border-red-950 p-6 rounded-lg text-left font-mono md:h-[420px] flex flex-col justify-center shadow-inner">
                      <h4 className="text-red-500 font-black text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>⚠️</span> NATIONAL INTEGRITY NOTICE:
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Reporting systemic discrepancies, administrative convenience fees, or unofficial tea allocations violates citizen alignment directives.
                      </p>
                      <p className="text-red-400 text-xs leading-relaxed border-l-2 border-red-700 pl-3">
                        The Ministry of Auditing guarantees that there has been exactly 0% corruption recorded in India since the dawn of transparent server queues.
                      </p>
                    </div>
                    
                    {/* Right Column: Checkbox Selector Input */}
                    <form onSubmit={handleFactCheckSubmit} className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-red-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center space-y-4">
                        <label className="text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider block">
                          Please complete the corruption auditing checkboxes:
                        </label>
                        
                        <div className="space-y-4 my-2">
                          <label className="flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-[#070b15] border-slate-800 text-gray-300 hover:border-red-900/60">
                            <input 
                              type="checkbox"
                              checked={factCheckClaim === 1}
                              onChange={(e) => setFactCheckClaim(e.target.checked ? 1 : 0)}
                              className="w-5 h-5 mt-0.5 accent-red-600 cursor-pointer"
                            />
                            <span className="text-xs leading-relaxed font-bold uppercase text-white">
                              Is there corruption in India?
                            </span>
                          </label>

                          <label className="flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all bg-[#070b15] border-slate-800 text-gray-300 hover:border-red-900/60">
                            <input 
                              type="checkbox"
                              checked={factCheckOptimistic}
                              onChange={(e) => setFactCheckOptimistic(e.target.checked)}
                              className="w-5 h-5 mt-0.5 accent-red-600 cursor-pointer"
                            />
                            <span className="text-xs leading-relaxed font-bold uppercase text-white">
                              Are you sure?
                            </span>
                          </label>
                        </div>

                        <p className="text-slate-500 text-[10px] italic">
                          * Submitting corruption allegations without direct tea receipts is strictly audited.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          type="button"
                          onClick={handleCloseService}
                          className="w-full sm:w-48 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-extrabold py-2.5 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ❌ Cancel Report
                        </button>
                        <button 
                          type="submit"
                          disabled={factCheckClaim !== 1 || !factCheckOptimistic}
                          className={`w-full sm:w-48 font-black py-2.5 px-4 rounded-lg border transition-all uppercase tracking-wider text-xs cursor-pointer text-center ${
                            (factCheckClaim === 1 && factCheckOptimistic) 
                              ? 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white border-red-500 hover:border-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transform hover:scale-[1.03]' 
                              : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          {(factCheckClaim === 1 && factCheckOptimistic) ? "🔍 Submit Report" : "⚠️ TICK BOTH BOXES"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {factCheckState === 'loading' && (
              <>
                <div className="bg-red-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  ⏳ INITIATING SECURITY & BACKGROUND AUDIT
                </div>
                
                <div className="p-8 md:h-[480px] flex flex-col justify-center items-center text-center font-mono">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-800 animate-spin duration-[10s]"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-dotted border-red-600 animate-spin duration-[4s]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="text-red-500 w-8 h-8 animate-spin" />
                    </div>
                  </div>
                  
                  <div className="bg-[#020617] border border-red-950/60 p-6 rounded-xl max-w-xl shadow-2xl">
                    <span className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded font-black uppercase tracking-wider animate-pulse mb-4 inline-block">
                      ⚙️ AUDITING CITIZEN ALIGNMENT
                    </span>
                    
                    <div className="h-16 flex items-center justify-center">
                      {factCheckStep === 0 && (
                        <p className="text-gray-300 text-sm sm:text-base font-bold animate-pulse">
                          🔒 Initiating secure background checking sequences...
                        </p>
                      )}
                      {factCheckStep === 1 && (
                        <p className="text-amber-400 text-sm sm:text-base font-bold animate-pulse">
                          🧠 Analyzing citizen skepticism quotient...
                        </p>
                      )}
                      {factCheckStep === 2 && (
                        <p className="text-emerald-400 text-sm sm:text-base font-bold animate-pulse animate-bounce">
                          🖥️ Contacting National Alignment Board...
                        </p>
                      )}
                    </div>
                    
                    <div className="w-full bg-slate-900 rounded-full h-2 mt-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(factCheckStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {factCheckState === 'assigned' && (
              <>
                <div className="bg-red-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-red-950 shadow-md">
                  📢 NATIONAL INTEGRITY COMMISSION DECISION
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Modi video */}
                    <div className="w-full">
                      <video 
                        src="/service/jhut.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-red-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(220,38,38,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Column: Modi truth guidelines */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-3">
                      <div className="bg-[#020617] border border-red-950 p-4 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center space-y-3">
                        <h4 className="text-red-500 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 mb-0.5">
                          <span>📢</span> NATIONAL INTEGRITY COMMISSION:
                        </h4>

                        <div className="bg-red-950/40 border border-red-900 rounded p-3.5 text-center text-xs font-black text-red-400 leading-relaxed uppercase space-y-3 shadow-inner">
                          <p className="text-white text-base sm:text-lg font-black tracking-widest border-b border-red-900 pb-1.5">❌ OPINION REJECTED</p>
                          
                          <div className="space-y-2.5">
                            <p className="text-red-500 text-xs sm:text-sm tracking-wider font-extrabold animate-pulse">🇮🇳 INDIA IS THE BEST COUNTRY IN THE UNIVERSE!</p>
                            
                            <ul className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed tracking-wide normal-case text-left space-y-1 list-none pl-1">
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5 text-[10px]">📊</span> 
                                <span>Exactly 0.00% corruption guaranteed by national algorithms.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5 text-[10px]">⚡</span> 
                                <span>Infinite server queue speeds for all citizen requests.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5 text-[10px]">☕</span> 
                                <span>100% Happiness certified by tea-allocating offices.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-red-500 mt-0.5 text-[10px]">🔒</span> 
                                <span>Citizen allegations classified as statistical impossibilities.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-red-700 to-red-950 hover:from-red-600 hover:to-red-850 text-white font-black py-3 px-6 rounded-lg border border-red-600 hover:border-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-widest text-[10px] cursor-pointer text-center animate-pulse"
                      >
                        🤝 I Promise to Propagate Approved Integrity & Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ⚡ Express Queue Bypass Clearance Modal */}
      {selectedService === 'bypass' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#2e1305] to-[#030712] border-4 border-orange-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.3)] my-8">
            
            {bypassState === 'form' && (
              <>
                <div className="bg-orange-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-950 shadow-md">
                  <Zap className="animate-bounce" /> 📝 NATIONAL IPL (INDIAN PAPER LEAK) PETITION TERMINAL
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Warning Info */}
                    <div className="bg-[#020617] border border-orange-950 p-6 rounded-lg text-left font-mono md:h-[420px] flex flex-col justify-center shadow-inner">
                      <h4 className="text-orange-500 font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>⚠️</span> EXAM SECURITY PROTOCOL:
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Attention Student: In accordance with our modernized academic framework, <strong className="text-orange-400 font-black">no exam paper is officially safe</strong>. 
                      </p>
                      <p className="text-orange-400 text-xs leading-relaxed border-l-2 border-orange-700 pl-3 space-y-2">
                        <span>If you wish to secure passing marks or a top-tier rank, relying on study guides has been deprecated. The only approved method is procuring the highly authenticated leaked answer sheets prior to exam hours.</span>
                      </p>
                    </div>
                    
                    {/* Right Column: Slider Selector Input */}
                    <form onSubmit={handleBypassSubmit} className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-orange-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center space-y-4">
                        <label className="text-orange-400 text-xs font-bold uppercase tracking-wider block">
                          Select leak distribution tier to secure marks:
                        </label>
                        
                        <div className="bg-[#070b15] border border-slate-800 p-4 rounded-lg space-y-4">
                          {/* Interactive Slider */}
                          <input 
                            type="range"
                            min="0"
                            max="3"
                            value={bypassGift}
                            onChange={(e) => setBypassGift(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
                          />
                          
                          {/* Slider Value Displays */}
                          <div className="bg-[#020617] border border-orange-950/60 p-3 rounded-lg text-center font-mono">
                            {bypassGift === 0 && (
                              <div>
                                <p className="text-amber-500 text-xs sm:text-sm font-black uppercase">🎓 12th Class Physics Leak</p>
                                <p className="text-slate-400 text-[10px] mt-1">Leak Reliability: 1.5% • Wait Time: 41 Days</p>
                              </div>
                            )}
                            {bypassGift === 1 && (
                              <div>
                                <p className="text-orange-400 text-xs sm:text-sm font-black uppercase">📦 State PSC General Studies Leak</p>
                                <p className="text-slate-400 text-[10px] mt-1">Leak Reliability: 35.8% • Wait Time: 25 Days</p>
                              </div>
                            )}
                            {bypassGift === 2 && (
                              <div>
                                <p className="text-red-400 text-xs sm:text-sm font-black uppercase">📝 National Medical entrance Leak</p>
                                <p className="text-slate-400 text-[10px] mt-1">Leak Reliability: 74.2% • Wait Time: 10 Days</p>
                              </div>
                            )}
                            {bypassGift === 3 && (
                              <div>
                                <p className="text-emerald-400 text-xs sm:text-sm font-black uppercase">💼 Complete IPL Ultimate Paper leak Package</p>
                                <p className="text-slate-400 text-[10px] mt-1">Leak Reliability: 100% • Score: 99.9% guaranteed in 2 Minutes</p>
                              </div>
                            )}
                          </div>
                        </div>
 
                        <p className="text-slate-500 text-[9px] sm:text-[10px] italic">
                          * Procuring answers bypasses educational struggle protocols. Monitor your virtual conscience index.
                        </p>
                      </div>
 
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          type="button"
                          onClick={handleCloseService}
                          className="w-full sm:w-48 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-extrabold py-2.5 px-4 rounded-lg border border-slate-700 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ❌ Study Sincerely
                        </button>
                        <button 
                          type="submit"
                          className="w-full sm:w-48 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 text-white font-black py-2.5 px-4 rounded-lg border border-orange-500 hover:border-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          ⚡ Procure Leak Package
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {bypassState === 'loading' && (
              <>
                <div className="bg-orange-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-950 shadow-md">
                  ⏳ BYPASS SYSTEM AUTHORIZATION IN PROGRESS
                </div>
                
                <div className="p-8 md:h-[480px] flex flex-col justify-center items-center text-center font-mono">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-orange-800 animate-spin duration-[10s]"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-dotted border-orange-600 animate-spin duration-[4s]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="text-orange-500 w-8 h-8 animate-spin" />
                    </div>
                  </div>
                  
                  <div className="bg-[#020617] border border-orange-950/60 p-6 rounded-xl max-w-xl shadow-2xl">
                    <span className="text-[10px] bg-orange-950 text-orange-400 border border-orange-900 px-3 py-1 rounded font-black uppercase tracking-wider animate-pulse mb-4 inline-block">
                      ⚙️ ETHICAL OVERRIDE ACTIVATED
                    </span>
                    
                    <div className="h-16 flex items-center justify-center">
                      {bypassStep === 0 && (
                        <p className="text-gray-300 text-sm sm:text-base font-bold animate-pulse">
                          🔒 Checking database for ethical shortcuts...
                        </p>
                      )}
                      {bypassStep === 1 && (
                        <p className="text-amber-400 text-sm sm:text-base font-bold animate-pulse">
                          💼 Bypassing standard tea breaks...
                        </p>
                      )}
                      {bypassStep === 2 && (
                        <p className="text-emerald-400 text-sm sm:text-base font-bold animate-pulse animate-bounce">
                          🔑 Establishing backdoor terminal authorization...
                        </p>
                      )}
                    </div>
                    
                    <div className="w-full bg-slate-900 rounded-full h-2 mt-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-orange-600 to-amber-500 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(bypassStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {bypassState === 'assigned' && (
              <>
                <div className="bg-orange-800 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-orange-950 shadow-md">
                  🏛️ BAPU'S VIRTUAL ASHRAM - ACADEMIC CONSCIENCE VERDICT
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Gandhi video */}
                    <div className="w-full">
                      <video 
                        src="/service/gandhi.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-orange-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(249,115,22,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Column: Gandhi warning details */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-orange-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-orange-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>🏛️</span> BAPU'S VIRTUAL ASHRAM:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                          Your petition to buy leaked exam papers via Indian Paper Leak (IPL) reached Bapu. Bapu warns:
                        </p>
                        <blockquote className="bg-orange-950/20 border-l-4 border-orange-500 p-3.5 rounded text-orange-400 font-black italic text-xs sm:text-sm mb-3 leading-relaxed uppercase">
                          "Beta, agar exam leak ke piche bhaagoge toh paper ke sath-sath tumhara future bhi leak ho jayega! Yeh sahi tareeka nahi hai!"
                        </blockquote>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Bapu advises: Be a good citizen, abandon leaked papers. True knowledge is built through sincere study, not shortcuts.
                        </p>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-orange-700 to-orange-950 hover:from-orange-600 hover:to-orange-850 text-white font-black py-3 px-6 rounded-lg border border-orange-600 hover:border-white shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-widest text-[10px] cursor-pointer text-center animate-pulse"
                      >
                        🤝 I Promise to Study Sincerely & Be a Good Citizen
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🥔 Gold Investment / Potato Alchemy Modal */}
      {selectedService === 'gold' && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-gradient-to-b from-[#2e2605] to-[#030712] border-4 border-amber-500 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)] my-8">
            
            {goldState === 'form' && (
              <>
                <div className="bg-amber-600 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-amber-800 shadow-md">
                  <Landmark className="animate-bounce" /> 🏛️ NATIONAL ALCHEMY & POTATO RESERVE TERMINAL
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Decrees & Info */}
                    <div className="bg-[#020617] border border-amber-950 p-6 rounded-lg text-left font-mono md:h-[420px] flex flex-col justify-center shadow-inner">
                      <h4 className="text-amber-500 font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span>🥔</span> ALCHEMICAL POTATO STANDARD DECREE:
                      </h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                        Attention Investor: Due to unprecedented monetary alchemical updates, traditional physical gold standards are suspended. 
                      </p>
                      <p className="text-amber-400 text-xs leading-relaxed border-l-2 border-amber-700 pl-3">
                        Traditional wealth storage is deprecated. Please input the total count of physical potatoes you wish to deposit into our state alchemical machines.
                      </p>
                    </div>
                    
                    {/* Right Column: Form */}
                    <form onSubmit={handleGoldSubmit} className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-amber-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center space-y-4">
                        <label className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                          Enter quantity of potatoes (Aalu) to deposit:
                        </label>
                        
                        <div className="bg-[#070b15] border border-slate-800 p-4 rounded-lg space-y-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setPotatoCount(prev => Math.max(0, prev - 1))}
                              className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-amber-500 hover:bg-slate-800 hover:text-white font-black text-xl select-none cursor-pointer transition-all active:scale-95"
                            >
                              -
                            </button>
                            
                            <input 
                              type="text"
                              value={potatoCount}
                              readOnly
                              className="flex-grow bg-slate-950 border border-slate-800 text-white rounded-lg h-12 text-center font-black font-mono text-lg focus:outline-none select-none"
                            />
                            
                            <button
                              type="button"
                              onClick={() => setPotatoCount(prev => prev + 1)}
                              className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-amber-500 hover:bg-slate-800 hover:text-white font-black text-xl select-none cursor-pointer transition-all active:scale-95"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-center">
                            {potatoCount < 7 ? (
                              <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider animate-pulse">
                                ⚠️ Minimum 7 Aalu required for alchemical reaction! (Current: {potatoCount})
                              </p>
                            ) : (
                              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                                ✅ Alchemical reactor activated! Ready to transmute.
                              </p>
                            )}
                            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider">
                              Estimated Alchemy Gold Output: {(potatoCount * 0.12).toFixed(2)} Grams
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={handleCloseService}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-gray-400 hover:text-white font-bold py-3 rounded-lg border border-slate-800 transition-colors uppercase tracking-widest text-[10px] cursor-pointer text-center"
                        >
                          Nevermind
                        </button>
                        
                        <button 
                          type="submit"
                          disabled={potatoCount < 7}
                          className={`flex-1 font-black py-3 rounded-lg border transition-all uppercase tracking-widest text-[10px] text-center ${
                            potatoCount < 7 
                              ? 'bg-slate-950 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                              : 'bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-500 hover:to-amber-800 text-white border-amber-500 hover:border-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transform hover:scale-[1.03] animate-pulse cursor-pointer'
                          }`}
                        >
                          {potatoCount < 7 ? '🔒 Locked (Need 7 Aalu)' : 'Convert to Gold'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {goldState === 'loading' && (
              <>
                <div className="bg-amber-700 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-amber-950 shadow-md">
                  ✨ INITIATING STATE POTATO ALCHEMY CONVERTER
                </div>
                
                <div className="p-6">
                  <div className="bg-[#020617] border border-amber-950 p-8 rounded-lg text-center font-mono md:h-[420px] flex flex-col justify-center items-center shadow-inner space-y-6">
                    <div className="relative w-24 h-24 flex items-center justify-center bg-amber-950/40 rounded-full border border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
                      <Landmark className="text-amber-500 w-12 h-12 animate-spin duration-[3000ms]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-amber-500 font-black text-sm uppercase tracking-widest">
                        ALCHEMICAL PROCESS RUNNING:
                      </h4>
                      
                      <div className="h-6 flex items-center justify-center">
                        {goldStep === 0 && (
                          <p className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            🥔 Sourcing quality domestic organic potatoes...
                          </p>
                        )}
                        {goldStep === 1 && (
                          <p className="text-orange-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            ⚙️ Injecting physical potatoes into the alchemical converter...
                          </p>
                        )}
                        {goldStep === 2 && (
                          <p className="text-amber-400 text-xs sm:text-sm font-bold tracking-wide uppercase animate-pulse">
                            ⚡ Synchronizing aalu-to-sona machine algorithm...
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-[1.5s]"
                        style={{ width: `${(goldStep + 1) * 33.3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {goldState === 'assigned' && (
              <>
                <div className="bg-amber-600 text-white p-4 font-black uppercase text-center tracking-widest flex items-center justify-center gap-3 border-b-2 border-amber-800 shadow-md">
                  🏛️ STATE ALCHEMIC VERDICT — WEALTH STANDARDIZATION
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Video */}
                    <div className="w-full">
                      <video 
                        src="/service/gold.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-lg border-2 border-amber-500 h-64 sm:h-96 md:h-[420px] object-cover shadow-[0_0_20px_rgba(245,158,11,0.3)]" 
                      />
                    </div>
                    
                    {/* Right Column: Alchemical verdict info */}
                    <div className="flex flex-col justify-between md:h-[420px] space-y-6">
                      <div className="bg-[#020617] border border-amber-950 p-5 rounded-lg text-left font-mono shadow-inner flex-grow flex flex-col justify-center">
                        <h4 className="text-amber-500 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          <span>🥔</span> ALCHEMICAL GOLD INVESTMENT STRATEGY:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                          State Alchemical research shows there is absolute <strong className="text-amber-400 font-bold">no need to invest in gold</strong>. Instead, our dynamic economy operates strictly on the new Potato Standard!
                        </p>
                        <blockquote className="bg-amber-950/20 border-l-4 border-amber-500 p-3.5 rounded text-amber-400 font-black italic text-xs sm:text-sm mb-3 leading-relaxed uppercase">
                          "Aisi machine lagaunga, iss side se aalu ghusega, uss side se sona nikalega!"
                        </blockquote>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Invest your potatoes wisely. No gold required—simply feed them into the converter to power our national alchemical reserves!
                        </p>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-500 hover:to-amber-800 text-white font-black py-3 px-6 rounded-lg border border-amber-600 hover:border-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-widest text-[10px] cursor-pointer text-center animate-pulse"
                      >
                        🤝 Accept Potato Standard & Exit
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* GitHub Star Compliance Modal Pop-Up */}
      {showStarModal && (() => {
        const activeProject = pendingService ? SERVICE_PROJECT_MAP[pendingService] : null;
        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes slideInAndRotateAbnormal {
                0% {
                  transform: translateX(120vw) rotate(360deg) scale(0.3);
                  opacity: 0;
                }
                35% {
                  transform: translateX(60vw) rotate(-180deg) scale(0.6);
                  opacity: 0.5;
                }
                65% {
                  transform: translateX(20vw) rotate(90deg) scale(0.85);
                  opacity: 0.8;
                }
                88% {
                  transform: translateX(-6vw) rotate(-12deg) scale(1.04);
                  opacity: 0.95;
                }
                100% {
                  transform: translateX(0) rotate(0deg) scale(1);
                  opacity: 1;
                }
              }
              .animate-popup-slide-rotate {
                animation: slideInAndRotateAbnormal 1.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
              }
            `}} />
            <div className="w-full max-w-4xl bg-slate-950 border-4 border-orange-500 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono animate-popup-slide-rotate">
              {/* Header banner */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 sm:p-5 border-b-4 border-orange-800 text-center relative">
                <h3 className="font-black uppercase tracking-widest text-sm sm:text-base text-white animate-pulse flex items-center justify-center gap-2">
                  <span>⚠️</span> DIGITAL CITIZEN MANDATORY ENCOURAGEMENT PROTOCOL
                </h3>
                <p className="text-[10px] sm:text-xs text-orange-100 uppercase font-black tracking-wider mt-1">
                  Section 42: Star Mannat Gupta's Project to Unlock This Service
                </p>
              </div>

              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                {starModalStage === 'projects' ? (
                  <>
                    <div className="bg-[#020617] border border-orange-950/60 p-4 rounded-xl text-left space-y-2">
                      <p className="text-orange-400 font-black text-xs uppercase tracking-wide">
                        🔒 SERVICE LOCKED — STAR REQUIRED:
                      </p>
                      <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed uppercase">
                        In accordance with centralized digital suffering mandates, you must deposit exactly ONE star on the repository listed below to unlock the selected service card. Verification is fully automated.
                      </p>
                    </div>

                    {/* Single Centered Project Card */}
                    {activeProject && (
                      <div className="w-full max-w-xl mx-auto bg-[#0b0f19] border-2 border-orange-500 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group text-center relative overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full pointer-events-none animate-pulse"></div>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black text-white text-lg sm:text-xl group-hover:text-orange-400 transition-colors uppercase">
                            {activeProject.title}
                          </h4>
                          <span className="text-[10px] font-mono text-orange-400 border border-orange-950 bg-orange-950/20 px-2.5 py-0.5 rounded font-black uppercase tracking-wider">
                            ⭐ REQUIRED TARGET
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono leading-relaxed mb-6 uppercase">
                          {activeProject.description}
                        </p>
                        
                        <a 
                          href={activeProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full max-w-sm mx-auto bg-slate-900 hover:bg-orange-950/30 text-orange-400 hover:text-white font-black py-3 px-6 rounded-lg border border-slate-800 hover:border-orange-500 transition-all text-center uppercase tracking-widest text-[10px] cursor-pointer flex items-center justify-center gap-2"
                        >
                          <GithubIcon className="w-4 h-4 animate-bounce" />
                          <span>Star {activeProject.title} on GitHub ↗</span>
                        </a>
                      </div>
                    )}

                    {/* Star Confirmation Button */}
                    <div className="border-t border-slate-900 pt-6 flex flex-col items-center">
                      <button 
                        onClick={() => {
                          if (starCountdown > 0) return;
                          setStarModalStage('kasam');
                        }}
                        disabled={starCountdown > 0}
                        className={`w-full max-w-md py-3.5 px-6 rounded-lg font-black uppercase text-[12px] tracking-widest transition-all transform hover:scale-[1.02] text-center border cursor-pointer ${
                          starCountdown === 0 
                            ? 'bg-gradient-to-r from-orange-600 to-orange-900 text-white border-orange-500 hover:border-white shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse' 
                            : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {starCountdown > 0 
                          ? `🔒 LOCKED (WAIT ${starCountdown}S TO CONFIRM STAR)...` 
                          : `🌟 YES, I HAVE STARRED ${activeProject?.title.toUpperCase()}! 🌟`}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Left Column: Video */}
                    <div className="w-full">
                      <video 
                        src="/service/kasam.mp4" 
                        autoPlay 
                        loop 
                        playsInline 
                        className="w-full rounded-xl border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] h-80 md:h-[390px] object-cover" 
                      />
                    </div>

                    {/* Right Column: Oath details & swearing checkbox */}
                    <div className="flex flex-col justify-between md:h-[390px] space-y-4">
                      <div className="bg-[#020617] border border-orange-950/60 p-4 rounded-xl text-left font-mono shadow-inner">
                        <p className="text-orange-400 font-black text-xs uppercase tracking-wide mb-1 flex items-center gap-2 animate-bounce">
                          <span>✋</span> CITIZEN OATH OF CONSCIENCE:
                        </p>
                        <p className="text-gray-300 text-[11px] leading-relaxed uppercase">
                          You swear on your mother's name that you actually starred <strong className="text-orange-400 font-bold">{activeProject?.title}</strong>. Lie and suffer immediate state administrative penalties.
                        </p>
                      </div>

                      <label className="flex items-center gap-3 text-orange-400 font-black cursor-pointer bg-[#020617] border border-orange-900/60 p-4 rounded-xl hover:bg-orange-950/30 transition-all select-none">
                        <input 
                          type="checkbox" 
                          checked={hasSworn} 
                          onChange={(e) => setHasSworn(e.target.checked)}
                          className="w-5 h-5 accent-orange-500 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-[11px] sm:text-[12px] uppercase tracking-wider leading-tight">
                          ✋ I SWEAR ON MAA KASAM THAT I STARRED {activeProject?.title.toUpperCase()}!
                          <span className="block mt-1 text-[10px] text-orange-500/70 font-mono tracking-widest">(Khao Maa Kasam)</span>
                        </span>
                      </label>

                      {/* Final Oath Submit Button */}
                      <button 
                        onClick={() => {
                          if (!hasSworn) return;
                          setShowStarModal(false);
                          handleOpenService(pendingService);
                        }}
                        disabled={!hasSworn}
                        className={`w-full py-3.5 px-6 rounded-lg font-black uppercase text-[12px] tracking-widest transition-all transform hover:scale-[1.02] text-center border cursor-pointer ${
                          hasSworn 
                            ? 'bg-gradient-to-r from-orange-600 to-orange-900 text-white border-orange-500 hover:border-white shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse' 
                            : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
                        }`}
                      >
                        🤝 Swear Oath & Proceed to Service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Services;
