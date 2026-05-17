import React, { useState } from 'react';
import { X, ShieldAlert, Plane, Car, FileText, Landmark, RefreshCw, AlertCircle, MessageSquare, Search, Zap, Award } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null); // 'driving' | 'flight' | 'grievance' | 'factcheck' | 'bypass'
  const [flightSubState, setFlightSubState] = useState('warning'); // 'warning' | 'crying'
  const [drivingSubState, setDrivingSubState] = useState('warning'); // 'warning' | 'crying'

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

  const handleOpenService = (service) => {
    setSelectedService(service);
    setFlightSubState('warning');
    setDrivingSubState('warning');
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
  };

  const handleCloseService = () => {
    setSelectedService(null);
    setFlightSubState('warning');
    setDrivingSubState('warning');
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
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;
    
    setGrievanceState('loading');
    setLoadingStep(0);
    
    // Simulate loading steps sequentially
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
              onClick={() => handleOpenService('driving')}
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
              onClick={() => handleOpenService('flight')}
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
              onClick={() => handleOpenService('grievance')}
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

            {/* Aadhaar Re-Linking */}
            <button 
              onClick={() => alert("🚨 SYSTEM BLOCKED!\n\nYour regional server is currently enjoying a mandatory 4-hour tea break. Please submit Annexure-7 in duplicate at your nearest offline post office. Estimated wait time: 42 years.")}
              className="bg-[#0b0f19]/60 p-6 border-2 border-dashed border-slate-800 hover:border-red-950 hover:bg-red-950/10 rounded-xl text-left shadow-lg transition-all duration-300 flex flex-col justify-between h-56 opacity-70 group"
            >
              <div className="flex justify-between items-start mb-2">
                <RefreshCw className="text-gray-500 w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[9px] font-mono text-gray-500 border border-slate-900 bg-slate-900 px-2 py-0.5 rounded uppercase font-black">
                  ⏳ 42-Year Delay
                </span>
              </div>
              <div>
                <div className="font-black text-gray-400 text-sm mb-1 group-hover:text-red-400 transition-colors">Aadhaar Re-Linking Form</div>
                <div className="text-[10px] text-gray-600 font-mono uppercase">Status: Officer is on leave</div>
              </div>
            </button>

            {/* Report Systemic Corruption (Modi video) */}
            <button 
              onClick={() => handleOpenService('factcheck')}
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
              onClick={() => handleOpenService('bypass')}
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
            
            {drivingSubState === 'warning' ? (
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
                          onClick={() => setDrivingSubState('crying')}
                          className="w-full sm:w-48 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-2.5 px-4 rounded-lg border border-red-500 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          🤝 Yes, I Insist on Driving
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
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
                          <span>😭</span> DRIVING PETITION TOTALLY DISREGARDED:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          We absolutely told you so! Your digital tears and offline complaints have been successfully uploaded directly to our circular shredding bin. You are still <strong className="text-red-400 font-black">NOT</strong> permitted to drive. Enjoy walking!
                        </p>
                        <p className="text-emerald-400 text-xs font-bold mt-4 animate-bounce uppercase">
                          Walking decree established. Have a safe and happy non-journey!
                        </p>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-64 mx-auto md:mx-0 bg-gradient-to-r from-red-700 to-red-950 hover:from-red-600 hover:to-red-850 text-white font-black py-2.5 px-6 rounded-lg border border-red-600 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-103 uppercase tracking-widest text-xs cursor-pointer text-center"
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
            
            {flightSubState === 'warning' ? (
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
                          onClick={() => setFlightSubState('crying')}
                          className="w-full sm:w-48 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-black py-2.5 px-4 rounded-lg border border-amber-500 hover:border-white shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.03] uppercase tracking-wider text-xs cursor-pointer text-center"
                        >
                          🤝 Yes, I Accept All Risks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
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
                          <span>😭</span> WE ABSOLUTELY TOLD YOU SO:
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          Your digital tears and final complaints have been successfully uploaded to our database of unread claims. Your ticket is still <strong className="text-red-400 font-black">NOT</strong> booked, and your seat on this journey remains highly imaginary.
                        </p>
                        <p className="text-emerald-400 text-xs font-bold mt-4 animate-bounce uppercase">
                          Have a safe and happy non-journey! Compliance achieved.
                        </p>
                      </div>

                      <button 
                        onClick={handleCloseService}
                        className="w-64 mx-auto md:mx-0 bg-gradient-to-r from-red-700 to-red-950 hover:from-red-600 hover:to-red-800 text-white font-black py-2.5 px-6 rounded-lg border border-red-600 hover:border-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-103 uppercase tracking-widest text-xs cursor-pointer text-center"
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
    </div>
  );
};

export default Services;
