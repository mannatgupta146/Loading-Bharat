import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(null);
  const [fee, setFee] = useState(0);
  const [log, setLog] = useState([]);

  // Loitering fee accrues every second you sit here
  useEffect(() => {
    const interval = setInterval(() => {
      setFee(prev => parseFloat((prev + 7.5).toFixed(2)));
      setLog(prev => [...prev.slice(-4), `[SYS] 404 loitering charge applied: +₹7.50`]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartOver = () => {
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans p-6 select-none">
      {/* Fee ticker */}
      <div className="fixed top-0 left-0 right-0 bg-red-950/90 border-b border-red-500/30 text-red-200 text-[11px] font-mono py-2 px-4 flex justify-between items-center z-50">
        <span className="font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping inline-block" />
          🛰️ Ministry of Missing Pages
        </span>
        <span className="bg-red-900/60 px-3 py-0.5 rounded border border-red-500/40 font-black animate-pulse text-[10px] tracking-wider">
          💸 404 LOITERING FEE: ₹{fee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="text-center space-y-6 max-w-lg pt-12">
        {/* Giant 404 */}
        <div className="relative">
          <h1 className="text-[10rem] font-black leading-none text-slate-900 select-none pointer-events-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl animate-bounce select-none">😭</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-red-900/50 rounded-2xl p-6 space-y-3 text-left">
          <h2 className="text-xl font-black uppercase tracking-wide text-white text-center">
            Error 404: Democracy Not Found
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            The page you are looking for has been temporarily transferred to the Ministry of Pending Files (Annexure Sub-Division). It will be returned within 6–8 business years, subject to server mood.
          </p>
          <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl px-4 py-3 text-[10px] font-mono text-amber-400 space-y-1">
            <p>• Possible causes: wrong URL, government restructuring, or your IP was flagged</p>
            <p>• Immediate action: Submit Annexure 404-Z in triplicate at your nearest Common Service Centre</p>
            <p>• Processing time: 45–90 working days (holidays excluded)</p>
          </div>
        </div>

        {/* Live log */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-[9px] text-sky-400 text-left space-y-0.5 h-24 overflow-hidden">
          {log.length === 0 && <p className="text-slate-600">• [SYS] Initializing 404 penalty module...</p>}
          {log.map((l, i) => <p key={i}>{l}</p>)}
        </div>

        {/* CTA */}
        {countdown === null ? (
          <button
            type="button"
            onClick={handleStartOver}
            className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl border-b-4 border-blue-950 shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer text-sm"
          >
            🔄 Restart Application From Step 1
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest animate-pulse">
              Redirecting to start in {countdown}…
            </p>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <p className="text-[9px] text-slate-700 font-mono uppercase tracking-widest">
          © 2026 Department of Unhinged Bureaucracy (DoUB) • Best viewed in Internet Explorer 6
        </p>
      </div>
    </div>
  );
};

export default NotFound;
