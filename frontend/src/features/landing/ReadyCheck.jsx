import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReadyCheck = () => {
  const navigate = useNavigate();

  const [fee, setFee] = useState(0);
  const [evalStep, setEvalStep] = useState(0); // 0: landing, 1: scanning, 2: animals crossing, 3: question, 4: outcome
  const [evalProgress, setEvalProgress] = useState(0);
  const [evalLogs, setEvalLogs] = useState([]);
  const [evalHiddenButtons, setEvalHiddenButtons] = useState([]);

  // Auto-run progress for step 1 and step 2
  useEffect(() => {
    if (evalStep !== 1 && evalStep !== 2) return;

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
              '[NOTICE] Civic infrastructure scanner: ONLINE.',
              '[WARNING] Bovine congestion detected ahead.',
            ]);
            return 100;
          }
          const next = p + 5;
          if (next === 25) setEvalLogs((prev) => [...prev, '[SYS] Syncing with dynamic clearance index...']);
          if (next === 60) setEvalLogs((prev) => [...prev, '[SYS] Authorizing citizen biological clearance vectors...']);
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
          const next = parseFloat((p + 2.5).toFixed(1));
          if (next === 10)  setEvalLogs((prev) => [...prev, '🐄 herd blockading regional subnet gateway. Waiting...']);
          if (next === 30)  setEvalLogs((prev) => [...prev, '🐐 migration protocol: ACTIVE. Proceeding slowly...']);
          if (next === 55)  setEvalLogs((prev) => [...prev, '🔊 Honking simulated citizen traffic horn (110dB equivalent)...']);
          if (next === 75)  setEvalLogs((prev) => [...prev, '📈 Queue position temporarily drifting +4,800 due to crossing...']);
          if (next === 90)  setEvalLogs((prev) => [...prev, '🛡️ Performing auditory stress assessment...']);
          return next;
        });
      }, 150);
    }

    return () => clearInterval(timer);
  }, [evalStep]);

  const handleStart = () => {
    setFee((prev) => prev + 45);
    setEvalStep(1);
    setEvalProgress(0);
    setEvalHiddenButtons([]);
    setEvalLogs(['[SYS] Initiating Stress evaluation receptors...', '[SYS] Calibrating civic clearance buffers...']);
  };

  const handleAnswer = (answer) => {
    setFee((prev) => prev + 25);
    if (answer === 'Yes') {
      setEvalLogs((prev) => [
        ...prev,
        '[USER ANSWER] Choice recorded: "Yes"',
        '[ANALYSIS] Positive alignment confirmed. Unlocking clearance vectors...',
      ]);
      setEvalStep(4);
    } else {
      // Wrong — just vanish that button, stay on question
      setFee((prev) => prev + 30);
      setEvalHiddenButtons((prev) => [...prev, answer]);
    }
  };

  const handleProceed = () => {
    setFee((prev) => prev + 15);
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden select-none font-sans p-4">

      {/* Sticky fee ticker at top */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-red-950/80 border-b border-red-500/30 text-red-200 text-[11px] font-mono py-2 px-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="font-bold tracking-widest uppercase">🛰️ Citizen Preparedness Portal</span>
        </div>
        {fee > 0 && (
          <span className="bg-red-900/60 px-3 py-0.5 rounded border border-red-500/40 font-black animate-pulse text-[10px] tracking-wider">
            💸 FINES ACCRUED: ₹{fee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        )}
      </div>

      {/* ── Step 0: Landing / Start screen ── */}
      {evalStep === 0 && (
        <div className="flex flex-col items-center text-center space-y-8 max-w-md animate-[fadeIn_0.4s_ease-out]">
          <span className="text-8xl select-none">🚫</span>
          <h1 className="text-3xl font-black uppercase tracking-widest text-white leading-tight">
            Citizen<br />Preparedness<br />Check
          </h1>
          <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-xs">
            Before you may proceed to Digital India registration services, the National Clearance Board requires a mandatory stress evaluation to verify your mental alignment.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left text-[10px] font-mono text-amber-400 space-y-1 w-full max-w-xs">
            <p className="text-slate-500 uppercase tracking-widest mb-2">Evaluation includes:</p>
            <p>• Civic buffer stress test (Phase I)</p>
            <p>• Bovine/caprine obstruction simulation (Phase II)</p>
            <p>• Voluntary resilience declaration (Phase III)</p>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black uppercase tracking-widest px-10 py-4 rounded-2xl border-b-4 border-blue-950 shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer text-sm"
          >
            🛡️ Begin Evaluation
          </button>
        </div>
      )}

      {/* ── Step 1: STOP + scanning ── */}
      {evalStep === 1 && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
          <span className="text-8xl animate-pulse select-none">🚫</span>
          <h2 className="text-2xl font-black uppercase tracking-wider text-white">
            Citizen Stress Evaluation In Progress
          </h2>
          <p className="text-xs text-slate-400 font-mono max-w-sm leading-relaxed">
            The National Clearance Board is actively conducting real-time civic buffer tests. Do not refresh.
          </p>
          <div className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-[10px] text-left text-sky-400 space-y-1 select-none">
            {evalLogs.map((log, i) => <div key={i}>• {log}</div>)}
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-150"
              style={{ width: `${evalProgress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Progress: {Math.round(evalProgress)}%
          </p>
        </div>
      )}

      {/* ── Step 2: Animals crossing ── */}
      {evalStep === 2 && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
          <span className="text-6xl select-none">🚧</span>
          <h2 className="text-xl font-black uppercase tracking-wider text-amber-500">
            Traffic Congestion Protocol Active
          </h2>

          {/* Road with moving animals */}
          <div className="w-full h-24 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-slate-700/50" />
            <div
              className="absolute text-3xl transition-all duration-150 ease-out select-none"
              style={{ left: `${Math.min(evalProgress * 1.1, 100)}%`, top: '12px', transform: 'translateX(-50%)' }}
            >
              🐄
            </div>
            <div
              className="absolute text-2xl transition-all duration-150 ease-out select-none"
              style={{ left: `${Math.max(100 - evalProgress * 1.1, 0)}%`, bottom: '12px', transform: 'translateX(-50%)' }}
            >
              🐐
            </div>
            {evalProgress > 45 && evalProgress < 75 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest animate-bounce">
                🔊 HONK! HONK!
              </div>
            )}
          </div>

          <div className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-[10px] text-left text-amber-400 space-y-1 select-none">
            {evalLogs.slice(-4).map((log, i) => <div key={i}>• {log}</div>)}
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full transition-all duration-150"
              style={{ width: `${evalProgress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Clearing Obstacles: {Math.round(evalProgress)}%
          </p>
        </div>
      )}

      {/* ── Step 3: The Question ── */}
      {evalStep === 3 && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-sm w-full animate-[fadeIn_0.3s_ease-out]">
          <span className="text-6xl select-none">🧠</span>
          <h2 className="text-2xl font-black uppercase tracking-wide text-white leading-tight">
            Are you mentally prepared<br />for Digital India?
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-light max-w-xs">
            A voluntary declaration of resilience is legally required to verify your compliance credentials before clearance releases.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={() => handleAnswer('Yes')}
              className="w-full bg-slate-800 hover:bg-emerald-900 hover:border-emerald-700 text-white hover:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider py-4 rounded-xl border border-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              👍 Yes
            </button>
            {!evalHiddenButtons.includes('No') && (
              <button
                type="button"
                onClick={() => handleAnswer('No')}
                className="w-full bg-slate-800/50 hover:bg-red-950 text-slate-500 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider py-4 rounded-xl border border-slate-800 hover:border-red-900 active:scale-95 transition-all cursor-pointer"
              >
                👎 No
              </button>
            )}
            {!evalHiddenButtons.includes('I have no choice') && (
              <button
                type="button"
                onClick={() => handleAnswer('I have no choice')}
                className="w-full bg-slate-800/50 hover:bg-red-950 text-slate-500 hover:text-red-400 text-xs font-mono font-bold uppercase tracking-wider py-4 rounded-xl border border-slate-800 hover:border-red-900 active:scale-95 transition-all cursor-pointer"
              >
                ⛓️ I have no choice
              </button>
            )}
            {evalHiddenButtons.length > 0 && (
              <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest animate-pulse">
                ⚠️ Options removed. ₹30 fine charged per disappearance.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Step 4: Outcome ── */}
      {evalStep === 4 && (
        <div className="flex flex-col items-center text-center space-y-6 max-w-sm w-full animate-[fadeIn_0.3s_ease-out]">
          <span className="text-6xl animate-bounce select-none">😭</span>
          <h2 className="text-2xl font-black uppercase tracking-wide text-white">
            Preparedness Evaluation Complete
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-light max-w-xs">
            The National Clearance Board records indicate substantial psychological strain detected.
          </p>
          <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl text-center text-red-400 font-mono text-[11px] uppercase tracking-wide animate-pulse w-full">
            "If you are already emotionally exhausted, press Continue."
          </div>
          <button
            type="button"
            onClick={handleProceed}
            className="w-full max-w-xs bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white text-xs font-mono font-black uppercase tracking-widest py-4 rounded-xl border-b-4 border-green-950 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            🚪 Proceed Anyway
          </button>
        </div>
      )}

    </div>
  );
};

export default ReadyCheck;
