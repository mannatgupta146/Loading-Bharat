import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  
  // Intro step-by-step onboarding states
  const [introStep, setIntroStep] = useState(1); // 1: 12s Biometric Audio Scan, 2: Loyalty Questionnaire, 3: Full Portal Reveal
  const [introTimeLeft, setIntroTimeLeft] = useState(12);
  const [introStatusText, setIntroStatusText] = useState("📡 Establishing secure quantum communication tunnel...");
  const introAudioRef = useRef(null);
  const modiChantAudioRef = useRef(null);

  // Loyalty Questionnaire Step 2 states
  const [loyaltySelected, setLoyaltySelected] = useState(null); // 'YES' or 'NO'
  const [loyaltyChecked, setLoyaltyChecked] = useState(false);
  const [noHoverActive, setNoHoverActive] = useState(false);
  const [showAutoCorrection, setShowAutoCorrection] = useState(false);

  // Floating shape instances state (7s flurry every 15s)
  const [floatingActive, setFloatingActive] = useState(false);
  const [floatingInstances, setFloatingInstances] = useState([]);
  const activeTimeoutRef = useRef(null);

  // State for loitering fee
  const [fee, setFee] = useState(12.50);
  
  // Step card unhinged states
  const [step1Hovered, setStep1Hovered] = useState(false);
  const [step2Hovered, setStep2Hovered] = useState(false);
  const [step3Pos, setStep3Pos] = useState({ x: 0, y: 0 });
  const [step4Hovered, setStep4Hovered] = useState(false);
  
  // State for escaping button
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonLocked, setButtonLocked] = useState(false);
  
  // Nested checkbox states to lock button
  const [step1Checked, setStep1Checked] = useState(false);
  const [step2Checked, setStep2Checked] = useState(false);
  const [step3Checked, setStep3Checked] = useState(false);
  const [step4Checked, setStep4Checked] = useState(false);

  // Citizen Preparedness Evaluation states
  const [preparednessChecked, setPreparednessChecked] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evalStep, setEvalStep] = useState(1); // 1: STOP/Intro, 2: Animals crossing/captcha/queue, 3: Preparedness Question, 4: Continue
  const [evalProgress, setEvalProgress] = useState(0);
  const [evalLogs, setEvalLogs] = useState([]);
  const [evalHiddenButtons, setEvalHiddenButtons] = useState([]); // tracks which wrong-answer buttons have vanished

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
          console.log("Autoplay was prevented. Adding interaction listeners.", err);
          // Fallback for browsers that block autoplay
          const handleInteraction = () => {
            introAudioRef.current.play();
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
          };
          window.addEventListener('click', handleInteraction);
          window.addEventListener('keydown', handleInteraction);
        });
      }
    };

    playAudio();
    
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
            setIntroStep(2); // Step 2: Loyalty Questionnaire
          }, 1000);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      // Clean up interaction listeners if they were added
      const handleInteraction = () => {
        if (introAudioRef.current) introAudioRef.current.play();
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      };
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [introStep]);

  // Coordinated 10s flurry (sound + shapes) with 20s gap cycle (Step 3 only)
  useEffect(() => {
    if (introStep !== 3) return;

    const shapePool = [
      'circle(50% at 50% 50%)', // circle
      'polygon(50% 0%, 0% 100%, 100% 100%)', // triangle
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // star
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // pentagon
      'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // hexagon
      'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // diamond
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // octagon
      'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', // trapezoid
      'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', // parallelogram
      'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // shield
      'polygon(0% 35%, 35% 35%, 35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%)', // cross
      'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)', // arrow-right
      'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)', // arrow-left
      'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)', // chevrons
      'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)', // nonagon
      'polygon(50% 0%, 100% 30%, 85% 100%, 15% 100%, 0% 30%)' // custom badge
    ];

    const triggerFlurry = () => {
      // 1. Play Administrative Drone Music
      if (modiChantAudioRef.current) {
        modiChantAudioRef.current.currentTime = 0;
        modiChantAudioRef.current.play().catch((err) => {
          console.log("Audio play prevented: user interaction needed.", err);
        });
      }

      // 2. Shuffle shapes so each instance gets a completely unique shape with zero repetition!
      const shuffledShapes = [...shapePool].sort(() => 0.5 - Math.random());
      const numInstances = shuffledShapes.length; // exactly 16 shapes, all unique!
      const vectorPaths = [
        // 1. Right to Left
        () => {
          const startY = Math.floor(Math.random() * 80) + 10;
          const endY = Math.floor(Math.random() * 80) + 10;
          return { startX: '115vw', startY: `${startY}vh`, endX: '-25vw', endY: `${endY}vh` };
        },
        // 2. Left to Top (diagonal up-right)
        () => {
          const startY = Math.floor(Math.random() * 60) + 40;
          const endX = Math.floor(Math.random() * 80) + 10;
          return { startX: '-25vw', startY: `${startY}vh`, endX: `${endX}vw`, endY: '-25vh' };
        },
        // 3. Top to Right (diagonal down-right)
        () => {
          const startX = Math.floor(Math.random() * 70) + 10;
          const endY = Math.floor(Math.random() * 70) + 20;
          return { startX: `${startX}vw`, startY: '-25vh', endX: '115vw', endY: `${endY}vh` };
        },
        // 4. Down to Left (diagonal up-left)
        () => {
          const startX = Math.floor(Math.random() * 60) + 30;
          const endY = Math.floor(Math.random() * 70) + 10;
          return { startX: `${startX}vw`, startY: '115vh', endX: '-25vw', endY: `${endY}vh` };
        },
        // 5. Bottom to Top (vertical / slanted up)
        () => {
          const startX = Math.floor(Math.random() * 90) + 5;
          const endX = startX + (Math.random() * 30 - 15);
          return { startX: `${startX}vw`, startY: '115vh', endX: `${endX}vw`, endY: '-25vh' };
        },
        // 6. Top to Bottom (vertical / slanted down)
        () => {
          const startX = Math.floor(Math.random() * 90) + 5;
          const endX = startX + (Math.random() * 30 - 15);
          return { startX: `${startX}vw`, startY: '-25vh', endX: `${endX}vw`, endY: '115vh' };
        }
      ];

      const instances = Array.from({ length: numInstances }).map((_, idx) => {
        const size = Math.floor(Math.random() * 160) + 60; // 60px to 220px
        const delay = Math.random() * 3.0; // 0s to 3s delay
        const duration = 5.0 + Math.random() * 4.0; // 5s to 9s floating time
        const shape = shuffledShapes[idx]; // Guarantee 100% mathematical uniqueness!
        
        // Pick a random path generator and execute it
        const pathGen = vectorPaths[Math.floor(Math.random() * vectorPaths.length)];
        const path = pathGen();
        
        const spinAngle = Math.random() > 0.5 ? '360deg' : '-360deg';

        return {
          id: idx,
          style: {
            position: 'fixed',
            width: `${size}px`,
            height: `${size}px`,
            clipPath: shape,
            zIndex: 9999,
            pointerEvents: 'none',
            animation: `floatRandom ${duration}s linear ${delay}s forwards`,
            border: '2px solid rgba(245,158,11,0.6)',
            boxShadow: '0 0 20px rgba(245,158,11,0.4)',
            transition: 'transform 0.3s ease',
            left: 0,
            top: 0,
            '--startX': path.startX,
            '--startY': path.startY,
            '--endX': path.endX,
            '--endY': path.endY,
            '--spinAngle': spinAngle
          }
        };
      });

      setFloatingInstances(instances);
      setFloatingActive(true);
    };

    const stopFlurry = () => {
      // 1. Pause Administrative Drone Music & Reset
      if (modiChantAudioRef.current) {
        modiChantAudioRef.current.pause();
        modiChantAudioRef.current.currentTime = 0;
      }
      // 2. Clear visual flurry
      setFloatingActive(false);
      setFloatingInstances([]);
    };

    const runCycle = () => {
      // Start 10-second flurry (with sound playing)
      triggerFlurry();

      // Wait exactly 10 seconds, then stop
      const stopTimeout = setTimeout(() => {
        stopFlurry();

        // Wait exactly 20 seconds (gap) before triggering the next cycle recursive loop!
        const nextTimeout = setTimeout(() => {
          runCycle();
        }, 20000);

        activeTimeoutRef.current = nextTimeout;
      }, 10000);

      activeTimeoutRef.current = stopTimeout;
    };

    // Start the first cycle immediately
    runCycle();

    return () => {
      // Clean up all timeouts
      if (activeTimeoutRef.current) {
        clearTimeout(activeTimeoutRef.current);
      }
      stopFlurry();
    };
  }, [introStep]);

  // Run loitering fee increment ticker
  useEffect(() => {
    // Only increment fee when intro is finished and user is loitering on actual page!
    if (introStep !== 3) return;

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

  // Citizen Preparedness Evaluation effects & handlers
  const handleStartEvaluation = () => {
    setFee((prev) => prev + 45.00); // Preparedness audit state fee!
    setShowEvaluation(true);
    setEvalStep(1);
    setEvalProgress(0);
    setEvalHiddenButtons([]); // reset disappeared buttons
    setEvalLogs(["[SYS] Initiating Stress evaluation receptors...", "[SYS] Calibrating civic clearance buffers..."]);
  };

  useEffect(() => {
    if (!showEvaluation) return;

    let timer;
    if (evalStep === 1) {
      timer = setInterval(() => {
        setEvalProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            setEvalStep(2);
            setEvalProgress(0);
            setEvalLogs((prev) => [
              ...prev,
              "[NOTICE] Civic infrastructure scanner: ONLINE.",
              "[WARNING] Bovine congestion detected ahead."
            ]);
            return 100;
          }
          const next = p + 5;
          if (next === 25) {
            setEvalLogs((prev) => [...prev, "[SYS] Syncing with dynamic clearance index..."]);
          }
          if (next === 60) {
            setEvalLogs((prev) => [...prev, "[SYS] Authorizing citizen biological clearance vectors..."]);
          }
          return next;
        });
      }, 150);
    } else if (evalStep === 2) {
      timer = setInterval(() => {
        setEvalProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            setEvalStep(3);
            setEvalProgress(0);
            return 100;
          }
          const next = p + 2.5; // Slightly slower for animal crossing simulation!
          if (next === 10) {
            setEvalLogs((prev) => [...prev, "🐄 herd blockading regional subnet gateway. Waiting..."]);
          }
          if (next === 30) {
            setEvalLogs((prev) => [...prev, "🐐 migration protocol: ACTIVE. Proceeding slowly..."]);
          }
          if (next === 55) {
            setEvalLogs((prev) => [...prev, "🔊 Honking simulated citizen traffic horn (110dB equivalent)..."]);
          }
          if (next === 75) {
            setEvalLogs((prev) => [...prev, "📈 Queue position temporarily drifting +4,800 due to crossing..."]);
          }
          if (next === 90) {
            setEvalLogs((prev) => [...prev, "🛡️ Performing auditory stress assessment..."]);
          }
          return next;
        });
      }, 150);
    }

    return () => clearInterval(timer);
  }, [showEvaluation, evalStep]);

  const handlePreparednessAnswer = (answer) => {
    setFee((prev) => prev + 25.00); // Answer assessment fee!
    if (answer === 'Yes') {
      setEvalLogs((prev) => [
        ...prev,
        `[USER ANSWER] Choice recorded: "Yes"`,
        "[ANALYSIS] Positive alignment confirmed. Unlocking clearance vectors..."
      ]);
      setEvalStep(4);
    } else {
      // Wrong answer — just make that button disappear, stay on question
      setFee((prev) => prev + 30.00); // Fine for wrong alignment choice
      setEvalHiddenButtons((prev) => [...prev, answer]);
    }
  };

  const handleProceedAnyway = () => {
    setFee((prev) => prev + 15.00); // Certificate release processing tax
    setPreparednessChecked(true);
    setShowEvaluation(false);
  };

  const handleEnterPortal = () => {
    if (!preparednessChecked) {
      alert("❌ CLEARANCE REJECTED!\n\nYou must first complete the Citizen Preparedness Stress Evaluation in the left column before entering the portal.");
      return;
    }
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center relative overflow-x-hidden select-none font-sans">
      <audio ref={introAudioRef} src="/landing/entry.mp3" preload="auto" />
      <audio ref={modiChantAudioRef} src="/landing/chant.mp3" preload="auto" loop />
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

      {/* Split Content Layout (Step 3 only) */}
      {introStep === 3 && (
        <div className="w-full flex-1 relative min-h-screen">
          {/* Split background overlay on md+ screens */}
          <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
            <div className="absolute left-0 w-1/2 h-full bg-[#0b2240] border-r border-[#172554]/40" />
            <div className="absolute right-0 w-1/2 h-full bg-[#fcfdfd]" />
          </div>

          {/* Actual content grid */}
          <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-2">
            
            {/* ROW 1: Heading Split */}
            {/* Left Header */}
            <div className="bg-[#0b2240] md:bg-transparent text-slate-100 flex flex-col items-center justify-center pt-16 pb-8 px-6 sm:px-12 relative text-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#172554_1px,transparent_1px),linear-gradient(to_bottom,#172554_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
              
              <div className="bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full px-4 py-1 text-xs uppercase tracking-widest font-black mb-4 animate-[pulse_3s_infinite] shadow-[0_0_15px_rgba(245,158,11,0.15)] inline-block z-10">
                🏢 Department of Unhinged Bureaucracy
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 z-10">
                National Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light tracking-wide leading-relaxed text-center z-10">
                Welcome, valued resident. Prepare yourself to enter the government's
              </p>
            </div>
            {/* Right Header */}
            <div className="bg-[#fcfdfd] md:bg-transparent text-slate-800 flex flex-col items-center justify-center pt-16 pb-8 px-6 sm:px-12 relative text-center border-t border-slate-200 md:border-t-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70 pointer-events-none" />
              
              <div className="bg-amber-500/10 text-amber-600 border border-amber-500/30 rounded-full px-4 py-1 text-xs uppercase tracking-widest font-black mb-4 opacity-0 pointer-events-none select-none inline-block z-10">
                🏢 Placeholder
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950 mb-4 z-10">
                of Suffering
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md font-light tracking-wide leading-relaxed text-center z-10">
                premier digital pipeline. Please review the mandatory onboarding clearance guidelines below.
              </p>
            </div>

            {/* ROW 2: Step 1 & Step 2 "aamne samne" */}
            {/* Left: Step 1 Card */}
            <div className="bg-[#0b2240] md:bg-transparent text-slate-100 flex flex-col items-center py-6 px-6 sm:px-12 relative">
              <div className="w-full max-w-xl animate-[fadeIn_0.5s_ease-out]">
                <div 
                  onMouseEnter={() => {
                    setStep1Hovered(true);
                    setFee(prev => prev + 15.00);
                  }}
                  onMouseLeave={() => setStep1Hovered(false)}
                  className={`bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 transition-all duration-300 group ${
                    step1Hovered 
                      ? 'blur-sm scale-90 translate-y-2 hover:border-red-900/50 hover:shadow-[0_0_30px_rgba(185,28,28,0.3)] pointer-events-none select-none' 
                      : 'hover:border-red-900/50 hover:shadow-[0_0_30px_rgba(185,28,28,0.1)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-red-500 font-mono">
                      {step1Hovered ? '⚠️ SECURITY VIOLATION' : 'Step 01 / Phase A'}
                    </span>
                    <span className="text-xl">{step1Hovered ? '🚨' : '🔒'}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-red-400 transition-colors">
                    {step1Hovered ? '⚠️ RECORD CORRUPTED' : 'Cursed Onboarding'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {step1Hovered 
                      ? 'ACCESS DENIED. Your biometric keys have been scrambled. A compliance penalty fee of ₹15.00 has been charged for unauthorized hovering.'
                      : 'Complete the secure national verification profile. Features high-security name scrambling maps, chaotic scattered Aadhaar fields, Sanskrit password policies, and pothole-verification captchas.'
                    }
                  </p>
                </div>
              </div>
            </div>
            {/* Right: Step 2 Card */}
            <div className="bg-[#fcfdfd] md:bg-transparent text-slate-800 flex flex-col items-center py-6 px-6 sm:px-12 relative border-t border-slate-200 md:border-t-0">
              <div className="w-full max-w-xl animate-[fadeIn_0.5s_ease-out_0.1s_both]">
                <div 
                  onMouseEnter={() => {
                    setStep2Hovered(true);
                    setFee(prev => prev + 25.50);
                  }}
                  onMouseLeave={() => setStep2Hovered(false)}
                  className={`bg-slate-100/70 border border-slate-250 rounded-2xl p-6 transition-all duration-500 origin-center group ${
                    step2Hovered 
                      ? 'rotate-180 scale-50 opacity-10 bg-rose-500/20 border-rose-500/50' 
                      : 'hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600 font-mono">
                      {step2Hovered ? '⏳ TIME DILATED' : 'Step 02 / Phase B'}
                    </span>
                    <span className="text-xl">{step2Hovered ? '🌀' : '⏳'}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {step2Hovered ? '⏳ PURGATORY REVERSED' : 'OTP Purgatory'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {step2Hovered 
                      ? 'System rotation activated. Time dilates by 200%. Penalty of ₹25.50 charged for visual loitering.'
                      : 'Authenticate your biometric communication channel. Experience our premium delayed OTP countdown intervals, random timing resets, and custom administrative music designed for therapeutic citizen endurance.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* ROW 3: Step 3 & Step 4 "aamne samne" */}
            {/* Left: Step 3 Card */}
            <div className="bg-[#0b2240] md:bg-transparent text-slate-100 flex flex-col items-center py-6 px-6 sm:px-12 relative">
              <div className="w-full max-w-xl animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                <div 
                  onMouseEnter={() => {
                    const x = (Math.random() - 0.5) * 450;
                    const y = (Math.random() - 0.5) * 200;
                    setStep3Pos({ x, y });
                    setFee(prev => prev + 35.00);
                  }}
                  style={{
                    transform: `translate(${step3Pos.x}px, ${step3Pos.y}px)`,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:border-emerald-900/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-500 font-mono">Step 03 / Phase C</span>
                    <span className="text-xl">🛰️</span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    State Media Verification
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    Read the latest 100% verified news items next to our active Live Standby Monitor. Must satisfy strict comprehension directive exams to pass. Any shortcut attempts lead to instant containment warnings. (Penalty fee of ₹35.00 applied for attempting to click this fleeing step!)
                  </p>
                </div>
              </div>
            </div>
            {/* Right: Step 4 Card */}
            <div className="bg-[#fcfdfd] md:bg-transparent text-slate-800 flex flex-col items-center py-6 px-6 sm:px-12 relative border-t border-slate-200 md:border-t-0">
              <div className="w-full max-w-xl animate-[fadeIn_0.5s_ease-out_0.3s_both]">
                <div 
                  onMouseEnter={() => {
                    setStep4Hovered(true);
                    setFee(prev => prev + 99.99);
                  }}
                  onMouseLeave={() => setStep4Hovered(false)}
                  className={`bg-slate-100/70 border border-slate-250 rounded-2xl p-6 transition-all duration-100 group ${
                    step4Hovered 
                      ? 'scale-[1.45] bg-red-950/95 border-red-500 text-red-200 shadow-[0_0_80px_rgba(239,68,68,0.8)] rotate-3 z-50' 
                      : 'hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600 font-mono">
                      {step4Hovered ? '❌ TREASON DETECTED' : 'Step 04 / Phase D'}
                    </span>
                    <span className="text-xl">{step4Hovered ? '☠️' : '🚀'}</span>
                  </div>
                  <h3 className={`text-lg font-black uppercase tracking-wide mb-2 transition-colors ${
                    step4Hovered ? 'text-red-400' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {step4Hovered ? '❌ ACCESS REVOKED' : 'Citizen Clearance'}
                  </h3>
                  <p className={`text-xs leading-relaxed font-light ${step4Hovered ? 'text-red-300' : 'text-slate-600'}`}>
                    {step4Hovered 
                      ? '⚠️ PRE-EMPTIVE COMPLIANCE EXHAUSTION. Citizen has hovered over the final clearance button without physical stamp confirmation from the DoUB. Penalty of ₹99.99 successfully charged!'
                      : 'Unlock your final profile clearance certificate. Complete the driving license theory exam inside dynamic flying traffic elements and manage your wealth locks before receiving full system authorization.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* ROW 4: Extra info / Footer (Left) & Controls (Right) */}
            {/* Left column Row 4 */}
            <div className="bg-[#0b2240] md:bg-transparent text-slate-100 flex flex-col items-center justify-between py-12 px-6 sm:px-12 relative border-t border-slate-800/20 md:border-t-0">
              {/* Extra branding or a cute mini-badge / live stat */}
              <div className="w-full max-w-xl space-y-6 font-mono flex-1 flex flex-col justify-center">
                {/* Compliance Feed Box */}
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">🚨 COMPLIANCE FEED</span>
                    <span className="text-[8px] bg-red-950 text-red-400 px-2 py-0.5 rounded border border-red-500/20">LIVE STATUS</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    The portal currently detects high levels of digital wind resistance. Please maintain standard cursor speed and avoid scroll speed-reading to prevent compliance lockouts.
                  </p>
                </div>

                {/* Preparedness Assessment Area */}
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 text-left space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">🛡️ CITIZEN PREPAREDNESS AUDIT</span>
                    <span className="text-[8px] bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">STATUS: {preparednessChecked ? 'APPROVED' : 'PENDING'}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Clearance vectors require one physical citizen stress evaluation sequence to verify your mental alignment for Digital India clearances.
                  </p>
                  <button
                    type="button"
                    onClick={handleStartEvaluation}
                    className={`w-full font-mono text-[9px] font-black uppercase tracking-widest py-3 px-4 rounded-xl border border-sky-500/30 transition-all cursor-pointer ${
                      preparednessChecked 
                        ? 'bg-sky-950/40 text-sky-500 cursor-not-allowed border-sky-950'
                        : 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white active:scale-95 shadow-md shadow-sky-500/10'
                    }`}
                  >
                    {preparednessChecked ? '✅ Stress Evaluation Completed' : '🛡️ Let\'s see if you are ready or not'}
                  </button>
                </div>
              </div>

              <footer className="w-full text-center py-6 border-t border-slate-900/50 text-[9px] font-mono text-slate-500 mt-12">
                © 2026 MINISTRY OF SUFFERING. ALL LAWS OF PHYSICS ARE SUBJECT TO SUSPENSION BY DIGITAL COMPLIANCE DIRECTIVE 404.
              </footer>
            </div>
            {/* Right column Row 4 */}
            <div className="bg-[#fcfdfd] md:bg-transparent text-slate-800 flex flex-col items-center py-12 px-6 sm:px-12 relative border-t border-slate-200 md:border-t-0 space-y-6">
              <div className="w-full max-w-xl space-y-6">

                {/* Security Uplink Clearance */}
                <div className="w-full h-36 flex flex-col items-center justify-center relative border border-dashed border-slate-350 rounded-3xl bg-slate-150/50 max-w-lg mb-2 p-6">
                  <div className="absolute top-2.5 text-[9px] text-slate-400 uppercase tracking-widest font-mono select-none">
                    Security Uplink Clearance Zone
                  </div>
                  <button
                    type="button"
                    onClick={handleEnterPortal}
                    className={`font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl border-b-4 select-none z-10 text-xs transition-all ${
                      preparednessChecked
                        ? 'bg-gradient-to-r from-emerald-600 to-green-700 border-green-950 hover:from-emerald-500 hover:to-green-600 text-white cursor-pointer shadow-emerald-500/20 active:scale-95'
                        : 'bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed border-b-2 shadow-inner opacity-75'
                    }`}
                  >
                    {preparednessChecked ? '🚪 Enter Portal of Suffering' : '🔒 Clearance Locked'}
                  </button>
                  {!preparednessChecked && (
                    <div className="absolute bottom-2 text-[8px] text-red-500 uppercase tracking-wider font-mono select-none animate-pulse mt-1">
                      ⚠️ Complete Preparedness Audit first!
                    </div>
                  )}
                </div>
                {/* Tiny hidden easter egg link to /ready standalone route */}
                <div className="text-center mt-2">
                  <a
                    href="/ready"
                    className="text-[8px] text-slate-700 hover:text-slate-500 font-mono uppercase tracking-widest underline underline-offset-2 transition-colors"
                  >
                    Alternative Entry Portal (unstable)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Citizen Preparedness Stress Evaluation Full-Screen Sequence */}
      {showEvaluation && (
        <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-md flex items-center justify-center z-50 p-4 font-sans animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 max-w-xl w-full p-8 rounded-3xl shadow-[0_0_80px_rgba(14,165,233,0.15)] text-center relative overflow-hidden flex flex-col items-center">
            
            {/* Step 1: STOP SIGN & CITIZEN STRESS EVALUATION IN PROGRESS */}
            {evalStep === 1 && (
              <div className="space-y-6 w-full animate-[fadeIn_0.3s_ease-out] py-4">
                <span className="text-8xl block animate-pulse select-none">🚫</span>
                <h3 className="text-2xl font-black uppercase tracking-wider text-white">
                  Citizen Stress Evaluation In Progress
                </h3>
                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
                  The National Clearance Board is actively conducting real-time civic buffer tests to assess your emotional and mental alignment. Do not refresh.
                </p>
                <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-850 font-mono text-[10px] text-left text-sky-400 space-y-1 select-none">
                  {evalLogs.map((log, idx) => (
                    <div key={idx} className="animate-fade-in">• {log}</div>
                  ))}
                </div>
                {/* Simulated progress bar */}
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${evalProgress}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Progress: {evalProgress}%
                </div>
              </div>
            )}

            {/* Step 2: ANIMALS CROSSING SEQUENCE & SIMULATION */}
            {evalStep === 2 && (
              <div className="space-y-6 w-full animate-[fadeIn_0.3s_ease-out] py-4 relative">
                <span className="text-6xl block select-none">🚧</span>
                <h3 className="text-xl font-black uppercase tracking-wider text-amber-500">
                  TRAFFIC CONGESTION PROTOCOL ACTIVE
                </h3>
                
                {/* Simulated animal crossing road */}
                <div className="w-full h-24 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-slate-700/50" />
                  
                  {/* Cow Emoji sliding across the screen */}
                  <div 
                    className="absolute text-3xl transition-all duration-150 ease-out select-none"
                    style={{ left: `${evalProgress * 1.2 - 20}%`, top: '15px' }}
                  >
                    🐄
                  </div>
                  
                  {/* Goat Emoji sliding across the screen */}
                  <div 
                    className="absolute text-2xl transition-all duration-150 ease-out select-none"
                    style={{ left: `${(100 - evalProgress) * 1.2 - 20}%`, bottom: '15px' }}
                  >
                    🐐
                  </div>

                  {/* Dynamic Horn Emoji floating */}
                  {evalProgress > 45 && evalProgress < 75 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest animate-bounce">
                      🔊 HONK! HONK!
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 font-mono max-w-md mx-auto leading-relaxed">
                  Bovine/caprine clearance interrupts detected in path. System is currently waiting for local crossing sequences to naturally terminate.
                </p>

                <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-850 font-mono text-[10px] text-left text-amber-400 space-y-1 select-none">
                  {evalLogs.slice(-4).map((log, idx) => (
                    <div key={idx} className="animate-fade-in">• {log}</div>
                  ))}
                </div>

                {/* Simulated progress bar */}
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full transition-all duration-150 ease-out"
                    style={{ width: `${evalProgress}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Clearing Crossing Obstacles: {evalProgress}%
                </div>
              </div>
            )}

            {/* Step 3: THE QUESTION - Are you mentally prepared for Digital India? */}
            {evalStep === 3 && (
              <div className="space-y-6 w-full animate-[fadeIn_0.3s_ease-out] py-4 text-center">
                <span className="text-6xl block select-none">🧠</span>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  Are you mentally prepared for Digital India?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm mx-auto">
                  A voluntary declaration of resilience is legally required to verify your compliance credentials before communication clearance releases.
                </p>
                <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => handlePreparednessAnswer('Yes')}
                    className="w-full bg-slate-800 hover:bg-emerald-900 hover:border-emerald-700 text-white hover:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-700 active:scale-95 transition-all cursor-pointer"
                  >
                    👍 Yes
                  </button>
                  {!evalHiddenButtons.includes('No') && (
                    <button
                      type="button"
                      onClick={() => handlePreparednessAnswer('No')}
                      className="w-full bg-slate-800/50 hover:bg-red-950 text-slate-500 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-800 hover:border-red-900 active:scale-95 transition-all cursor-pointer"
                    >
                      👎 No
                    </button>
                  )}
                  {!evalHiddenButtons.includes('I have no choice') && (
                    <button
                      type="button"
                      onClick={() => handlePreparednessAnswer('I have no choice')}
                      className="w-full bg-slate-800/50 hover:bg-red-950 text-slate-500 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider py-3.5 rounded-xl border border-slate-800 hover:border-red-900 active:scale-95 transition-all cursor-pointer"
                    >
                      ⛓️ I have no choice
                    </button>
                  )}
                  {evalHiddenButtons.length > 0 && (
                    <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest animate-pulse mt-1">
                      ⚠️ Options removed. ₹30 fine charged per disappearance.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: OUTCOME - If you are already emotionally exhausted, press Continue. */}
            {evalStep === 4 && (
              <div className="space-y-6 w-full animate-[fadeIn_0.3s_ease-out] py-4 text-center">
                <span className="text-6xl block animate-bounce select-none">😭</span>
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  Preparedness Evaluation Complete
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm mx-auto">
                  The National Clearance Board records indicating substantial psychological strain.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center text-red-400 font-mono text-[11px] select-none uppercase tracking-wide animate-pulse">
                  “If you are already emotionally exhausted, press Continue.”
                </div>
                <button
                  type="button"
                  onClick={handleProceedAnyway}
                  className="w-full max-w-xs mx-auto bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded-xl border-b-4 border-green-950 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  🚪 Proceed Anyway & Unlock
                </button>
              </div>
            )}

          </div>
        </div>
      )}

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
      {introStep !== 3 && (
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
                  🔒 Compliance Lock: {introTimeLeft}s ({getLoadingBarState().label})
                </p>
                
                {/* Progress bar with dynamic shake vibration */}
                <div className={`w-full h-2.5 bg-slate-950 border border-slate-800 rounded-full overflow-hidden mb-4 relative shadow-inner transition-colors duration-300 ${getLoadingBarState().vibrate ? 'animate-shake' : ''}`}>
                  <div 
                    className={`h-full bg-gradient-to-r shadow-lg rounded-full transition-all duration-300 ease-out ${getLoadingBarState().color}`}
                    style={{ width: `${getLoadingBarState().percent}%` }}
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

          {/* STEP 2: Loyalty Questionnaire */}
          {introStep === 2 && (
            <div className="bg-slate-900/45 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl animate-[fadeIn_0.5s_ease-out] flex flex-col items-center relative overflow-hidden">
              <div className="bg-red-500/10 text-red-500 border border-red-500/30 rounded-full px-4 py-1 text-[10px] uppercase tracking-widest font-black mb-6">
                🛡️ DIRECTIVE 909-A • PATRIOTIC ALIGNMENT AUDIT
              </div>
              
              <h2 className="text-2xl font-black uppercase text-white tracking-wider mb-2">
                LOYALTY AUDIT
              </h2>
              <p className="text-[11px] text-slate-400 font-mono mb-8 max-w-xs leading-relaxed">
                As mandated by Digital Loyalty Order 104, every citizen must declare voluntary patriotic alignment to clear communication firewalls.
              </p>

              {/* The Big Question */}
              <div className="w-full bg-slate-950/80 border border-slate-900/60 p-6 rounded-2xl mb-6 relative">
                <p className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-4">
                  QUESTION: Do you love Modi?
                </p>

                <div className="flex gap-4 justify-center items-center mt-4">
                  {/* YES Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setLoyaltySelected('YES');
                      setShowAutoCorrection(false);
                    }}
                    className={`px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs border transition-all cursor-pointer ${
                      loyaltySelected === 'YES'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    🇮🇳 YES, OF COURSE!
                  </button>

                  {/* NO Option */}
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setNoHoverActive(true);
                      setLoyaltySelected('YES');
                      setShowAutoCorrection(true);
                    }}
                    onMouseLeave={() => {
                      setNoHoverActive(false);
                    }}
                    onClick={() => {
                      setLoyaltySelected('YES');
                      setShowAutoCorrection(true);
                    }}
                    className="px-5 py-3 rounded-xl font-black uppercase tracking-wider text-xs border transition-all bg-slate-900 border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {noHoverActive ? '🇮🇳 YES, OF COURSE!' : '❌ NO'}
                  </button>
                </div>

                {/* Auto-correction Notice */}
                {showAutoCorrection && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg animate-bounce whitespace-nowrap z-20">
                    🚨 CHOICE AUTO-CORRECTED FOR PATRIOTISM!
                  </div>
                )}
              </div>

              {/* Checkbox with custom wording */}
              <label className="flex items-start text-left gap-3 mb-8 cursor-pointer select-none bg-slate-950/30 p-3 rounded-xl border border-slate-900 hover:border-slate-850 transition-colors w-full">
                <input 
                  type="checkbox" 
                  checked={loyaltyChecked}
                  onChange={(e) => setLoyaltyChecked(e.target.checked)}
                  className="mt-1 accent-amber-500 shrink-0"
                />
                <span className="text-[10px] text-slate-400 font-mono leading-relaxed">
                  I hereby certify that my selection of <strong className="text-emerald-500">YES</strong> is entirely voluntary, heartfelt, and uncoerced under penalty of permanent Aadhaar index suspension.
                </span>
              </label>

              {/* Submit button */}
              <button
                type="button"
                disabled={loyaltySelected !== 'YES' || !loyaltyChecked}
                onClick={() => {
                  setIntroStep(3); // Enter main portal!
                }}
                className={`w-full py-4 font-black uppercase tracking-widest text-xs rounded-xl border-b-4 transition-all duration-300 ${
                  loyaltySelected === 'YES' && loyaltyChecked
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-900 text-white cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900 border-slate-950 text-slate-600 cursor-not-allowed'
                }`}
              >
                🔓 COMMIT LOYALTY AND ENTER PORTAL
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Representative Image Flurry Shapes (Step 3 only) */}
      {introStep === 3 && floatingActive && floatingInstances.map((inst) => (
        <img 
          key={inst.id}
          src="/landing/modi.jpeg" 
          alt="Floating Representative"
          style={{ ...inst.style, objectPosition: 'center top' }}
          className="object-cover select-none pointer-events-none"
        />
      ))}

      {/* Chanting modi-modi Audio loop player */}
      <audio ref={modiChantAudioRef} src="/landing/modi-modi.mp3" loop={true} />

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
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          40% { transform: translate(2px, -1px) rotate(0.5deg); }
          60% { transform: translate(-2px, -1px) rotate(0deg); }
          80% { transform: translate(2px, 1px) rotate(0.5deg); }
        }
        .animate-shake {
          animation: shake 0.15s infinite;
          border-color: rgba(239, 68, 68, 0.8) !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
        }
        @keyframes floatRandom {
          0% { 
            transform: translate(var(--startX), var(--startY)) rotate(0deg); 
            opacity: 0.1; 
          }
          10% { 
            opacity: 0.85; 
          }
          90% { 
            opacity: 0.85; 
          }
          100% { 
            transform: translate(var(--endX), var(--endY)) rotate(var(--spinAngle)); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
