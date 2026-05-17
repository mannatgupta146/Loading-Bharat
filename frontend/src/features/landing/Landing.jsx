import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  
  // Intro step-by-step onboarding states
  const [introStep, setIntroStep] = useState(1); // 1: 12s Biometric Audio Scan, 2: Full Portal Reveal
  const [introTimeLeft, setIntroTimeLeft] = useState(12);
  const [introStatusText, setIntroStatusText] = useState("📡 Establishing secure quantum communication tunnel...");
  const introAudioRef = useRef(null);

  // State for loitering fee
  const [fee, setFee] = useState(12.50);
  
  // State for escaping button
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonLocked, setButtonLocked] = useState(false);
  
  // Nested checkbox states to lock button
  const [step1Checked, setStep1Checked] = useState(false);
  const [step2Checked, setStep2Checked] = useState(false);
  const [step3Checked, setStep3Checked] = useState(false);
  const [step4Checked, setStep4Checked] = useState(false);

  // Scroll speed audit states
  const [scrollAuditActive, setScrollAuditActive] = useState(false);
  const [auditCountdown, setAuditCountdown] = useState(5);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const auditTimer = useRef(null);

  // Sound levels
  const [soundVolume, setSoundVolume] = useState(80);
  const [showVolumeAlert, setShowVolumeAlert] = useState(false);

  // Dynamic helper for automatic chaotic biometric scanner zoom shifting during Step 1
  const getBiometricStatus = () => {
    switch (introTimeLeft) {
      case 12:
        return {
          alert: "🔍 INITIAL BIOMETRIC ACQUISITION...",
          style: { transform: "scale(1.0) translate(0px, 0px) rotate(0deg)" },
          color: "text-amber-400"
        };
      case 11:
        return {
          alert: "🚨 VIOLATION: Subversive head-tilt angle detected (+3.4°)",
          style: { transform: "scale(1.4) translate(10px, 20px) rotate(6deg)" },
          color: "text-red-500 animate-pulse font-black"
        };
      case 10:
        return {
          alert: "🚨 WARNING: Low patriotic micro-expression in resident eyes!",
          style: { transform: "scale(2.3) translate(0px, -45px) rotate(-2deg)" },
          color: "text-amber-500 font-bold"
        };
      case 9:
        return {
          alert: "🚨 CRITICAL: Resident hair volume exceeds maximum digital regulation!",
          style: { transform: "scale(1.8) translate(0px, 35px) rotate(3deg)" },
          color: "text-red-500 font-black animate-pulse"
        };
      case 8:
        return {
          alert: "🔍 SCANNING MANDATORY CITIZEN CHIP CALIBRATION...",
          style: { transform: "scale(1.1) translate(0px, 0px) rotate(0deg)" },
          color: "text-amber-400"
        };
      case 7:
        return {
          alert: "🚨 ERROR: Physical posture density variance detected!",
          style: { transform: "scale(1.5) translate(-20px, 15px) rotate(-8deg)" },
          color: "text-red-500 font-black animate-pulse"
        };
      case 6:
        return {
          alert: "🚨 WARNING: Insufficient speed-reading resistance coordinates!",
          style: { transform: "scale(2.0) translate(15px, -30px) rotate(4deg)" },
          color: "text-amber-500 font-bold"
        };
      case 5:
        return {
          alert: "🔍 PARSING STATE COMPLIANCE DATABASE CORRELATIONS...",
          style: { transform: "scale(1.0) translate(0px, 0px) rotate(0deg)" },
          color: "text-emerald-400"
        };
      case 4:
        return {
          alert: "🚨 ALERT: High concentration of non-governmental thoughts!",
          style: { transform: "scale(2.5) translate(0px, -15px) rotate(12deg)" },
          color: "text-red-500 font-black animate-pulse"
        };
      case 3:
        return {
          alert: "🚨 WARNING: Standard bureaucratic loitering threshold exceeded!",
          style: { transform: "scale(1.6) translate(-10px, 45px) rotate(-5deg)" },
          color: "text-amber-500 font-bold"
        };
      case 2:
        return {
          alert: "🔄 ATTEMPTING FORCE CITIZEN ALIGNMENT RE-CALIBRATION...",
          style: { transform: "scale(1.2) translate(0px, 10px) rotate(0deg)" },
          color: "text-amber-400"
        };
      case 1:
        return {
          alert: "⚙️ SAVING ENCRYPTED RESIDENT COMPLIANCE KEY...",
          style: { transform: "scale(1.0) translate(0px, 0px) rotate(0deg)" },
          color: "text-amber-400"
        };
      case 0:
      default:
        return {
          alert: "✅ VERIFICATION COMPLETED. RESIDENT CLEARED FOR ACCESS.",
          style: { transform: "scale(1.0) translate(0px, 0px) rotate(0deg)" },
          color: "text-green-500 font-black"
        };
    }
  };

  // Dynamic helper for automatic chaotic unhinged loading bar progress mapping during Step 1
  const getLoadingBarState = () => {
    switch (introTimeLeft) {
      case 12:
        return {
          percent: 8,
          label: "8%",
          color: "from-blue-600 to-indigo-500 animate-pulse",
          vibrate: false
        };
      case 11:
        return {
          percent: 35,
          label: "35%",
          color: "from-amber-600 to-amber-500",
          vibrate: false
        };
      case 10: // Head-tilt violation
        return {
          percent: 12,
          label: "12% (🚨 DOCKED -23% PENALTY)",
          color: "from-red-600 to-red-500",
          vibrate: true
        };
      case 9:
        return {
          percent: 42,
          label: "42%",
          color: "from-amber-500 to-yellow-400",
          vibrate: false
        };
      case 8:
        return {
          percent: 78,
          label: "78%",
          color: "from-emerald-500 to-green-500",
          vibrate: false
        };
      case 7: // Posture variance
        return {
          percent: 30,
          label: "30% (🚨 CLERICAL REGRESSION ERROR)",
          color: "from-red-500 to-amber-500",
          vibrate: true
        };
      case 6:
        return {
          percent: 55,
          label: "55%",
          color: "from-amber-500 to-yellow-500",
          vibrate: false
        };
      case 5:
        return {
          percent: 99,
          label: "99.9% (STABILIZING...)",
          color: "from-green-500 to-emerald-400 animate-pulse",
          vibrate: false
        };
      case 4: // Non-governmental thoughts
        return {
          percent: 0,
          label: "NaN% (🚨 MIND COMPLIANCE FLOOD)",
          color: "from-pink-600 to-purple-600",
          vibrate: true
        };
      case 3:
        return {
          percent: 45,
          label: "45% (RE-CALIBRATING TELEMETRY)",
          color: "from-amber-500 to-yellow-500",
          vibrate: false
        };
      case 2:
        return {
          percent: 88,
          label: "88%",
          color: "from-emerald-500 to-green-400",
          vibrate: false
        };
      case 1:
        return {
          percent: 99.99,
          label: "99.999% (⏳ PENDING ADMINISTRATIVE SIGNATURE)",
          color: "from-emerald-400 to-green-300 animate-pulse",
          vibrate: true
        };
      case 0:
      default:
        return {
          percent: 100,
          label: "100% (COMPLETE)",
          color: "from-green-500 to-emerald-500",
          vibrate: false
        };
    }
  };

  // Handle Step 1: 12-second biometric scan and audio broadcast
  useEffect(() => {
    if (introStep !== 1) return;
    
    // Play entry music immediately on load
    const playAudio = () => {
      if (introAudioRef.current) {
        introAudioRef.current.play().catch((err) => {
          console.log("Autoplay was prevented by the browser. Waiting for interaction...", err);
        });
      }
    };

    // Attempt immediately
    playAudio();

    // Also attempt on first user interaction to guarantee audio plays
    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    
    const statusMap = {
      12: "📡 Establishing secure quantum communication tunnel...",
      11: "📡 Synchronizing telemetry frequencies...",
      10: "🔊 Downloading administrative entry song...",
      9: "🔊 Restoring national loyalty soundwaves...",
      8: "🔍 Scanning browser for non-compliant extensions...",
      7: "🔍 Calibrating speed-reading velocity sensors...",
      6: "🧩 Injecting compulsory patience-building modules...",
      5: "🧩 Loading biometric Aadhaar index maps...",
      4: "📦 Preparing loitering tax assessment ledgers...",
      3: "📦 Drafting citizen clearance Form 302-Kh...",
      2: "⚖️ Verifying overall compliance metrics...",
      1: "⚖️ Committing state oaths to database...",
      0: "🔓 Authorization granted. Welcome to the portal."
    };

    const countdownInterval = setInterval(() => {
      setIntroTimeLeft((prev) => {
        const next = prev - 1;
        if (statusMap[next] !== undefined) {
          setIntroStatusText(statusMap[next]);
        }
        if (next <= 0) {
          clearInterval(countdownInterval);
          setTimeout(() => {
            setIntroStep(2); // Fully reveal the portal!
          }, 1000);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [introStep]);

  // Run loitering fee increment ticker
  useEffect(() => {
    // Only increment fee when intro is finished and user is loitering on actual page!
    if (introStep !== 2) return;

    const feeInterval = setInterval(() => {
      setFee((prev) => prev + 12.50);
    }, 1000);
    return () => clearInterval(feeInterval);
  }, [introStep]);

  // Monitor scroll speed for audits
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const timeDiff = now - lastScrollTime.current;
      
      if (timeDiff > 0) {
        const scrollDiff = Math.abs(currentScrollTop - lastScrollTop.current);
        const velocity = scrollDiff / timeDiff; // pixels per millisecond
        
        // If they scroll extremely fast (velocity > 3px/ms) and audit is not already active
        if (velocity > 3.0 && !scrollAuditActive) {
          setScrollAuditActive(true);
          setAuditCountdown(5);
          // Auto increment loitering fee penalty
          setFee((prev) => prev + 250);
        }
      }
      
      lastScrollTop.current = currentScrollTop;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollAuditActive]);

  // Handle countdown for scroll speed audit
  useEffect(() => {
    if (scrollAuditActive && auditCountdown > 0) {
      const timer = setTimeout(() => {
        setAuditCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [scrollAuditActive, auditCountdown]);

  // Handle button escaping logic
  const handleButtonHover = () => {
    if (buttonLocked) return;

    // Checkboxes must be checked to stop escaping. If they aren't, the button flees!
    const maxOffset = 180;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 2;
    setButtonPos({ x: randomX, y: randomY });
    setHoverCount((prev) => prev + 1);

    // Increase loitering fine slightly for button avoidance
    setFee((prev) => prev + 5);
  };

  // Check if button is fully locked via all 4 oaths
  useEffect(() => {
    if (step1Checked && step2Checked && step3Checked && step4Checked) {
      setButtonLocked(true);
      setButtonPos({ x: 0, y: 0 }); // Snap back to center
    } else {
      setButtonLocked(false);
    }
  }, [step1Checked, step2Checked, step3Checked, step4Checked]);

  // Patriotic volume manipulation
  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value);
    if (val < 50) {
      // Force it to 200% for patriotic enforcement!
      setSoundVolume(200);
      setShowVolumeAlert(true);
      setFee((prev) => prev + 42.0); // Fine for sound evasion
      setTimeout(() => setShowVolumeAlert(false), 4000);
    } else {
      setSoundVolume(val);
    }
  };

  const handleEnterPortal = () => {
    if (!buttonLocked) {
      // Just in case they click it, make it slide away
      handleButtonHover();
      return;
    }
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center relative overflow-x-hidden select-none font-sans bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(185,28,28,0.15),rgba(255,255,255,0))]">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Floating State Banner Ticker */}
      <div className="w-full bg-red-950/80 border-b border-red-500/30 text-red-200 text-[11px] sm:text-xs font-mono py-2.5 px-4 sticky top-0 z-40 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          <span className="font-bold tracking-widest uppercase">🛰️ PORTAL CONGESTION WARNING</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-red-900/60 px-3 py-1 rounded border border-red-500/40 font-black animate-pulse text-xs tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            💸 CURRENT LOITERING TAX: ₹{fee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] opacity-75 hidden md:inline">• Rate: +₹12.50/sec</span>
        </div>
      </div>

      {/* Elegant Header Section */}
      <header className="w-full max-w-4xl px-6 text-center mt-12 mb-10 flex flex-col items-center z-10">
        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full px-4 py-1 text-xs uppercase tracking-widest font-black mb-4 animate-[pulse_3s_infinite] shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          🏢 Department of Unhinged Bureaucracy
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
          National Portal of Suffering
        </h1>
        <p className="text-sm sm:text-lg text-slate-400 max-w-2xl font-light tracking-wide leading-relaxed">
          Welcome, valued resident. Prepare yourself to enter the government's premier digital pipeline. Please review the mandatory onboarding clearance guidelines below.
        </p>
      </header>

      {/* Core Guidelines - Glassmorphic Grid */}
      <section className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 z-10">
        
        {/* Phase 1 Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-red-900/50 hover:shadow-[0_0_30px_rgba(185,28,28,0.1)] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-red-500 font-mono">Step 01 / Phase A</span>
            <span className="text-xl">🔒</span>
          </div>
          <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-red-400 transition-colors">
            Cursed Onboarding
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Complete the secure national verification profile. Features high-security name scrambling maps, chaotic scattered Aadhaar fields, Sanskrit password policies, and pothole-verification captchas.
          </p>
        </div>

        {/* Phase 2 Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-amber-900/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500 font-mono">Step 02 / Phase B</span>
            <span className="text-xl">⏳</span>
          </div>
          <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-amber-400 transition-colors">
            OTP Purgatory
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Authenticate your biometric communication channel. Experience our premium delayed OTP countdown intervals, random timing resets, and custom administrative music designed for therapeutic citizen endurance.
          </p>
        </div>

        {/* Phase 3 Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-emerald-900/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 font-mono">Step 03 / Phase C</span>
            <span className="text-xl">🛰️</span>
          </div>
          <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-emerald-400 transition-colors">
            State Media Verification
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Read the latest 100% verified news items next to our active Live Standby Monitor. Must satisfy strict comprehension directive exams to pass. Any shortcut attempts lead to instant containment warnings.
          </p>
        </div>

        {/* Phase 4 Card */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-blue-900/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500 font-mono">Step 04 / Phase D</span>
            <span className="text-xl">🚀</span>
          </div>
          <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-blue-400 transition-colors">
            Citizen Clearance
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            Unlock your final profile clearance certificate. Complete the driving license theory exam inside dynamic flying traffic elements and manage your wealth locks before receiving full system authorization.
          </p>
        </div>

      </section>

      {/* Dynamic Interaction Control Center */}
      <section className="w-full max-w-3xl px-6 mb-16 z-10 flex flex-col items-center">
        
        {/* Patriotic drone volume enforcement box */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">🛡️ ADMINISTRATIVE AUDIO ENFORCEMENT</h4>
            <span className="bg-slate-800 text-[10px] px-2 py-0.5 rounded text-amber-500 border border-amber-500/20">DIRECTIVE 101</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-xs text-slate-400 max-w-sm font-light">
              Administrative drone signals must remain audible. Evasion attempts will trigger instant penal adjustment charges.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs font-mono">Vol: {soundVolume}%</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={soundVolume === 200 ? 10 : soundVolume}
                onChange={handleVolumeChange}
                className="w-32 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
          {showVolumeAlert && (
            <div className="mt-3 text-[10px] font-mono text-amber-400 font-bold bg-amber-950/40 p-2 border border-amber-500/30 rounded animate-bounce text-center">
              🔊 VOLUME ENHANCED TO 200%! Under decree, portal music cannot be muted. Penalty ₹42.00 added.
            </div>
          )}
        </div>

        {/* Cursed Anchoring Oath Form */}
        <div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 mb-8 backdrop-blur-md text-center max-w-lg">
          <h3 className="text-lg font-black uppercase tracking-wider text-white mb-2">
            🔐 Anchoring Oath Panel
          </h3>
          <p className="text-xs text-slate-400 font-light mb-6">
            The button to enter is subject to digital wind velocity. You must sign the following legally binding oaths to anchor it in place.
          </p>

          <div className="space-y-4 text-left font-mono">
            {/* Oath 1 */}
            <label className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors">
              <input 
                type="checkbox" 
                checked={step1Checked} 
                onChange={(e) => {
                  setStep1Checked(e.target.checked);
                  if(!e.target.checked) {
                    setStep2Checked(false);
                    setStep3Checked(false);
                    setStep4Checked(false);
                  }
                }}
                className="w-5 h-5 accent-red-600 mt-0.5" 
              />
              <span className="text-[10px] text-slate-300 leading-normal font-bold">
                I agree that my mouse clicks may be taxed at a rate of 12% GST by the Ministry of Clicks.
              </span>
            </label>

            {/* Oath 2 (Fades in once 1 is checked) */}
            {step1Checked && (
              <label className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors animate-[fadeIn_0.3s_ease-out]">
                <input 
                  type="checkbox" 
                  checked={step2Checked} 
                  onChange={(e) => {
                    setStep2Checked(e.target.checked);
                    if(!e.target.checked) {
                      setStep3Checked(false);
                      setStep4Checked(false);
                    }
                  }}
                  className="w-5 h-5 accent-amber-600 mt-0.5" 
                />
                <span className="text-[10px] text-slate-300 leading-normal font-bold">
                  I pledge loyalty to the Ministry of Minor Inconveniences and endorse all future page latency.
                </span>
              </label>
            )}

            {/* Oath 3 (Fades in once 2 is checked) */}
            {step2Checked && (
              <label className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors animate-[fadeIn_0.3s_ease-out]">
                <input 
                  type="checkbox" 
                  checked={step3Checked} 
                  onChange={(e) => {
                    setStep3Checked(e.target.checked);
                    if(!e.target.checked) {
                      setStep4Checked(false);
                    }
                  }}
                  className="w-5 h-5 accent-blue-600 mt-0.5" 
                />
                <span className="text-[10px] text-slate-300 leading-normal font-bold">
                  I certify my current typing device contains only state-approved, non-subversive letters.
                </span>
              </label>
            )}

            {/* Oath 4 (Fades in once 3 is checked - Triple Swearing Oath) */}
            {step3Checked && (
              <label className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors animate-[fadeIn_0.3s_ease-out]">
                <input 
                  type="checkbox" 
                  checked={step4Checked} 
                  onChange={(e) => setStep4Checked(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 mt-0.5" 
                />
                <span className="text-[10px] text-slate-300 leading-normal font-black">
                  KHAO MAA KASAM I am prepared to read all guidelines carefully and accept all forms of suffering.
                </span>
              </label>
            )}
          </div>

          <div className="mt-4 text-xs font-mono">
            {buttonLocked ? (
              <span className="text-emerald-500 font-black animate-pulse">✓ ANCHOR OATH COMPLETE. BUTTON IS SECURED!</span>
            ) : (
              <span className="text-amber-500 font-bold">⚠️ Warning: {4 - [step1Checked, step2Checked, step3Checked, step4Checked].filter(Boolean).length} oaths remaining to anchor the portal button.</span>
            )}
          </div>
        </div>

        {/* Escaping Enter Button Container */}
        <div className="w-full h-40 flex items-center justify-center relative border border-dashed border-slate-800 rounded-3xl bg-slate-950/20 max-w-lg mb-4">
          <div className="absolute text-[10px] text-slate-700 uppercase tracking-widest font-mono select-none">
            Button Containment Zone
          </div>
          <button
            type="button"
            onClick={handleEnterPortal}
            onMouseEnter={handleButtonHover}
            style={{
              transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
              transition: buttonLocked ? 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.15s ease-out'
            }}
            className={`font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-2xl border-b-4 select-none z-10 ${
              buttonLocked 
                ? 'bg-gradient-to-r from-emerald-600 to-green-700 border-green-900 hover:from-emerald-500 hover:to-green-600 text-white cursor-pointer' 
                : 'bg-red-800 hover:bg-red-700 border-red-950 text-red-200 cursor-default'
            }`}
          >
            {buttonLocked ? '🚪 Enter Portal of Suffering' : '🏃 Fleeing Button'}
          </button>
        </div>

        {hoverCount > 0 && !buttonLocked && (
          <p className="text-[10px] text-red-500 font-mono italic animate-pulse mt-2">
            Escape velocity: {hoverCount * 10} km/h • Button has evaded citizen capture {hoverCount} times!
          </p>
        )}

      </section>

      {/* Page Footer */}
      <footer className="w-full text-center py-8 border-t border-slate-900 text-[10px] font-mono text-slate-600 z-10 bg-slate-950/90">
        © 2026 MINISTRY OF SUFFERING. ALL LAWS OF PHYSICS ARE SUBJECT TO SUSPENSION BY DIGITAL COMPLIANCE DIRECTIVE 404.
      </footer>

      {/* Full-Screen Scroll Velocity Audit Modal */}
      {scrollAuditActive && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-red-950/90 border-4 border-red-600 text-red-100 max-w-md w-full p-8 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.5)] text-center relative border-double">
            <span className="text-5xl block mb-4 animate-bounce">🚨</span>
            <h3 className="text-xl font-black uppercase tracking-wider mb-2 text-white">
              SUBVERSIVE SPEED-READING VIOLATION
            </h3>
            <div className="w-full bg-red-900/40 border border-red-500/30 p-4 rounded-lg font-mono text-xs text-left mb-6 space-y-2 text-red-200">
              <p className="font-bold">AUDIT REPORT #9882:</p>
              <p>• Violation: Scroll velocity exceeded state-authorized speed limits.</p>
              <p>• Indication: Potential subversion or attempt to skip reading directives.</p>
              <p>• Penalty: Fine ₹250.00 added to loitering tax.</p>
            </div>
            
            <p className="text-sm font-light text-slate-300 mb-6">
              You are being held in compliance detention. Please allow your visual tracking receptors to stabilize.
            </p>

            <div className="font-mono text-lg font-black mb-2 text-red-500 animate-pulse">
              DETENTION TIMEOUT: {auditCountdown}s
            </div>

            <button
              type="button"
              disabled={auditCountdown > 0}
              onClick={() => setScrollAuditActive(false)}
              className={`w-full py-3 rounded-lg font-black uppercase tracking-wider text-xs transition-all ${
                auditCountdown > 0
                  ? 'bg-red-900/20 text-red-700 border border-red-900/40 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              }`}
            >
              {auditCountdown > 0 ? '🔒 Waiting for state authorization...' : '🔓 I pledge to read slowly'}
            </button>
          </div>
        </div>
      )}

      {/* Onboarding Splash Screen */}
      {introStep !== 2 && (
        <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 p-6 font-sans">
          <audio ref={introAudioRef} src="/landing/entry.mp3" loop={false} />

          {/* STEP 1: 12-Second Biometric Image Scan & Audio Broadcast */}
          {introStep === 1 && (
            <div className="flex flex-col items-center max-w-lg w-full text-center animate-[fadeIn_0.5s_ease-out] relative">
              {/* Dynamic Biometric Violation Warning Banner */}
              <div className={`text-[10px] uppercase tracking-widest font-mono font-black mb-4 px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-center shadow-lg transition-all duration-300 min-h-[36px] flex items-center justify-center max-w-xs ${getBiometricStatus().color}`}>
                {getBiometricStatus().alert}
              </div>

              {/* Circular Avatar featuring modiman.jpeg with dynamic chaotic zoom transforms */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 overflow-hidden rounded-full border-4 border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.25)] flex items-center justify-center bg-slate-900">
                <img 
                  src="/landing/modiman.jpeg" 
                  alt="State Representative" 
                  style={{ ...getBiometricStatus().style, transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Laser scan line overlay */}
                <div className="absolute left-0 w-full h-1.5 bg-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-laser-scan pointer-events-none" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
              </div>

              {/* Status Ticker details */}
              <div className="w-full bg-slate-900/60 border border-slate-800 p-6 rounded-2xl mb-6 backdrop-blur-md max-w-sm">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">
                  🔒 Compliance Lock Status: {introTimeLeft}s remaining
                </p>
                
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-950 border border-slate-800 rounded-full overflow-hidden mb-4 relative shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-green-500 shadow-[0_0_12px_rgba(245,158,11,0.6)] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: `${((12 - introTimeLeft) / 12) * 100}%` }}
                  />
                </div>

                {/* Blinking State indicator status */}
                <p className="text-xs sm:text-sm font-mono text-amber-400 font-bold min-h-[40px] flex items-center justify-center gap-1.5 leading-relaxed">
                  <span className="inline-block w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping shrink-0"></span>
                  <span>{introStatusText}</span>
                </p>
              </div>

              <div className="text-[10px] text-slate-600 uppercase tracking-widest font-mono animate-pulse">
                Do not refresh your secure state pipeline terminal
              </div>
            </div>
          )}
        </div>
      )}

      {/* Inline styles for simple animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes laser-scan {
          0%, 100% { top: 0%; opacity: 0.3; }
          50% { top: 100%; opacity: 0.9; }
        }
        .animate-laser-scan {
          animation: laser-scan 2.5s ease-in-out infinite;
        }
        @keyframes scanning-image {
          0%, 100% { transform: scale(1.0) rotate(-2deg); }
          50% { transform: scale(1.12) rotate(2deg); }
        }
        .animate-scanning-image {
          animation: scanning-image 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
