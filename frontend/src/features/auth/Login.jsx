import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [postLoginState, setPostLoginState] = useState(0); // 0: normal, 1: warning text, 2: video
  const [isEncrypting, setIsEncrypting] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Scatter Button State
  const word = "SUBMIT".split('');
  const [isScattered, setIsScattered] = useState(false);
  const [scatteredLetters, setScatteredLetters] = useState([]);
  const [expectedIndex, setExpectedIndex] = useState(0);

  const scatterTheLetters = () => {
    // Generate random positions between 10% and 80% of the viewport
    const newLetters = word.map((letter, index) => ({
      id: index,
      letter,
      x: Math.floor(Math.random() * 70) + 10,
      y: Math.floor(Math.random() * 70) + 10,
      clicked: false
    }));
    setScatteredLetters(newLetters);
    setIsScattered(true);
    setExpectedIndex(0);
  };

  const handleLetterClick = (index) => {
    if (index === expectedIndex) {
      // Correct letter clicked
      setScatteredLetters(prev => prev.map((item, i) => i === index ? { ...item, clicked: true } : item));
      if (expectedIndex === word.length - 1) {
        // Successfully spelled SUBMIT!
        setTimeout(() => {
          setPostLoginState(1);
          setIsScattered(false);
        }, 500);
      } else {
        setExpectedIndex(prev => prev + 1);
      }
    } else {
      // Wrong letter clicked
      alert("Incorrect sequence! Bureaucracy reset. Please click them in the correct order: S-U-B-M-I-T.");
      scatterTheLetters(); // Re-scatter them!
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isScattered) {
      scatterTheLetters();
    }
  };

  useEffect(() => {
    if (postLoginState === 2 && videoRef.current) {
      videoRef.current.play().catch(err => console.log(err));
    }
  }, [postLoginState]);

  useEffect(() => {
    let interval;
    if (isScattered) {
      interval = setInterval(() => {
        setScatteredLetters(prev => prev.map(item => ({
          ...item,
          x: Math.floor(Math.random() * 70) + 10,
          y: Math.floor(Math.random() * 70) + 10,
        })));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isScattered]);

  const handleVideoEnded = () => {
    alert("Your allotted time for government interaction has expired. Start from the beginning.");
    navigate('/register');
  };

  return (
    <div className="max-w-md mx-auto space-y-6 relative">
      <div className="bg-white p-8 border border-gray-300 shadow-md relative overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#003366] uppercase border-b-2 border-orange-500 pb-2">
          Citizen Portal Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Aadhaar / PAN / Ration Card Number</label>
            <input 
              type="text" 
              value={username}
              maxLength={16}
              onChange={(e) => {
                setUsername(e.target.value.toUpperCase());
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                  e.preventDefault();
                  const badChars = ['!', 'X', '?', '#', '🤡', '§', '¥', '💀'];
                  const randomChar = badChars[Math.floor(Math.random() * badChars.length)];
                  setUsername(prev => prev + randomChar);
                }
              }}
              className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-red-600 focus:bg-gray-100 transition-colors"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Notice: The Backspace key has been disabled. Deleting is for cowards.</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Ultra-Secure Password
              {isEncrypting && <span className="text-red-500 animate-pulse ml-2 text-xs">Encrypting keystroke...</span>}
            </label>
            <input 
              type="password" 
              value={password}
              disabled={isEncrypting}
              minLength={6}
              onChange={(e) => {
                let val = e.target.value;
                val = val.replace(/a/g, '@').replace(/e/g, '3').replace(/i/g, '!');
                setPassword(val);
                setIsEncrypting(true);
                setTimeout(() => setIsEncrypting(false), 800);
              }}
              className={`w-full border p-2 text-sm focus:outline-none focus:border-red-600 transition-colors ${isEncrypting ? 'bg-gray-300 border-gray-500 cursor-not-allowed' : 'border-gray-400 bg-gray-100'}`}
              required
            />
            <p className="text-[10px] text-red-600 mt-1 font-bold">Notice: Passwords must be a minimum of 6 characters long.</p>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs">
            <input type="checkbox" required className="accent-blue-600 cursor-pointer" />
            <span className="font-bold">I acknowledge that I have probably forgotten my password.</span>
          </div>

          <div className="pt-2 relative">
            {!isScattered ? (
              <button 
                type="submit"
                className="w-full h-14 bg-[#003366] hover:bg-red-800 text-white font-bold py-3 px-4 rounded shadow border-b-4 border-orange-600 active:translate-y-1 active:border-b-0 transition-colors"
              >
                SUBMIT LOGIN
              </button>
            ) : (
              <div className="w-full h-14 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center gap-2 rounded">
                {scatteredLetters.map((item, i) => (
                  <span key={i} className="text-xl font-black text-[#003366] border-b-2 border-[#003366] w-6 text-center h-8 leading-none inline-block">
                    {item.clicked ? item.letter : '\u00A0'}
                  </span>
                ))}
              </div>
            )}
            {isScattered && (
              <p className="text-[10px] text-red-600 text-center mt-2 font-bold animate-pulse">
                SECURITY MEASURE: Click the scattered letters in order (S-U-B-M-I-T) to login.
              </p>
            )}
          </div>
        </form>

        <div className="mt-6 text-center text-sm border-t pt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Register for Suffering Here
          </Link>
        </div>
      </div>

      {/* Scattered Letters Rendered Over Everything */}
      {isScattered && postLoginState === 0 && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {scatteredLetters.map((item, i) => (
            !item.clicked && (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleLetterClick(i);
                }}
                className="absolute pointer-events-auto bg-[#003366] hover:bg-orange-600 text-white font-black text-3xl w-16 h-16 rounded-full flex items-center justify-center border-4 border-orange-500 cursor-crosshair transition-all duration-[2000ms] ease-in-out"
                style={{ 
                  top: `${item.y}%`, 
                  left: `${item.x}%`,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, spin 1.5s linear infinite'
                }}
              >
                {item.letter}
              </button>
            )
          ))}
        </div>
      )}

      {/* INESCAPABLE FULL SCREEN VIDEO OVERLAY */}
      {postLoginState > 0 && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-2 overflow-hidden">
          {postLoginState === 1 ? (
            <div className="max-w-2xl bg-gray-900 border-4 border-red-600 p-8 shadow-[0_0_50px_rgba(220,38,38,0.8)] text-center animate-pulse">
              <h1 className="text-red-500 font-black text-3xl md:text-4xl uppercase tracking-widest mb-6 drop-shadow-lg">
                CRITICAL SYSTEM FAILURE
              </h1>
              <p className="text-white text-xl font-bold uppercase mb-4">
                Login Failed: Server Capacity Exceeded
              </p>
              <p className="text-orange-400 font-bold text-md md:text-lg mb-6">
                System Update: You can't actually login. Our legacy servers cannot handle the load of 1.4 billion people clicking at once. You must go back and Register.
              </p>
              <p className="text-yellow-300 font-bold text-sm md:text-md mb-8 bg-black/50 p-4 rounded border border-yellow-500">
                You want to know why this is happening? You demand answers about the servers? We have prepared an official response regarding this matter.
              </p>
              <button 
                onClick={() => setPostLoginState(2)}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 px-8 rounded shadow-lg border-2 border-red-300 transition-transform active:scale-95"
              >
                VIEW OFFICIAL RESPONSE
              </button>
            </div>
          ) : (
            <>
              <div className="w-full max-w-xl animate-pulse">
                <h1 className="text-red-500 font-black text-2xl md:text-3xl text-center uppercase tracking-widest mb-2 drop-shadow-lg">
                  OFFICIAL RESPONSE
                </h1>
              </div>
              
              <div className="w-full max-w-xl border-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)] bg-black pointer-events-none mt-4">
                <video 
                  ref={videoRef}
                  src="/video/NO REPLY.mp4" 
                  autoPlay
                  controls={false}
                  onEnded={handleVideoEnded}
                  className="w-full h-auto object-cover pointer-events-auto"
                />
              </div>
              
              <div className="mt-8 text-center animate-bounce">
                <p className="text-red-400 text-sm mt-4 italic font-bold">
                  (There is no cancel button. Please endure the silence.)
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
