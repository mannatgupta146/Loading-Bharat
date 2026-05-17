import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
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
          setAttempts(prev => prev + 1);
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
    if (attempts > 0 && videoRef.current) {
      videoRef.current.play().catch(err => console.log(err));
    }
  }, [attempts]);

  const handleVideoEnded = () => {
    alert("Your allotted time for government interaction has expired. Start from the beginning.");
    navigate('/register');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
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
                let rawVal = e.target.value.toUpperCase();
                // Increment any newly typed numbers
                let newVal = '';
                for(let i=0; i<rawVal.length; i++) {
                  let char = rawVal[i];
                  if (/[0-9]/.test(char) && i === rawVal.length - 1 && rawVal.length > username.length) {
                    char = (parseInt(char) + 1) % 10;
                  }
                  newVal += char;
                }
                
                if (Math.random() < 0.1 && newVal.length > 0 && !newVal.endsWith('-')) newVal += '-';
                setUsername(newVal);
              }}
              className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-red-600 focus:bg-gray-100 transition-colors"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Warning: Hyphens are randomly inserted to test your emotional stability. For security, digits are automatically incremented by 1.</p>
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
      {isScattered && attempts === 0 && (
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
                className="absolute pointer-events-auto bg-orange-600 hover:bg-red-600 text-white font-black text-2xl w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 border-4 border-white cursor-crosshair animate-bounce"
                style={{ 
                  top: `${item.y}%`, 
                  left: `${item.x}%`,
                  animationDelay: `${i * 0.1}s` 
                }}
              >
                {item.letter}
              </button>
            )
          ))}
        </div>
      )}

      {/* INESCAPABLE FULL SCREEN VIDEO OVERLAY */}
      {attempts > 0 && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl animate-pulse">
            <h1 className="text-red-500 font-black text-4xl text-center uppercase tracking-widest mb-4 drop-shadow-lg">
              CRITICAL NOTIFICATION
            </h1>
          </div>
          
          <div className="w-full max-w-4xl border-8 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.6)] bg-black pointer-events-none">
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
            <p className="text-white text-xl font-bold tracking-widest">
              THE SERVERS ARE OFFICIALLY IGNORING YOU.
            </p>
            <p className="text-orange-400 font-bold text-lg mt-4 uppercase">
              System Update: You can't login anyway. Just register. We have absolutely no data backup.
            </p>
            <p className="text-red-400 text-sm mt-2">
              (There is no cancel button. You must watch the official response.)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
