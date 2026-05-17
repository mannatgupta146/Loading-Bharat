import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const charMap = {
  'a': '@', 'A': '@', 'b': '8', 'B': '8', 'c': '©', 'C': '©', 'd': 'Ð', 'D': 'Ð',
  'e': '3', 'E': '3', 'f': 'ƒ', 'F': 'ƒ', 'g': '9', 'G': '9', 'h': 'µ', 'H': 'µ',
  'i': '!', 'I': '!', 'j': '¿', 'J': '¿', 'k': 'X', 'K': 'X', 'l': '1', 'L': '1',
  'm': '#', 'M': '#', 'n': '∆', 'N': '∆', 'o': '0', 'O': '0', 'p': '¶', 'P': '¶',
  'q': 'Ø', 'Q': 'Ø', 'r': '®', 'R': '®', 's': '$', 'S': '$', 't': '7', 'T': '7',
  'u': 'ü', 'U': 'ü', 'v': 'v', 'V': 'v', 'w': 'W', 'W': 'W', 'x': '×', 'X': '×',
  'y': '¥', 'Y': '¥', 'z': '2', 'Z': '2'
};

const reverseMap = {
  '@': 'a', '8': 'b', '©': 'c', 'Ð': 'd', '3': 'e', 'ƒ': 'f', '9': 'g', 'µ': 'h',
  '!': 'i', '¿': 'j', 'X': 'k', '1': 'l', '#': 'm', '∆': 'n', '0': 'o', '¶': 'p',
  'Ø': 'q', '®': 'r', '$': 's', '7': 't', 'ü': 'u', 'v': 'v', 'W': 'w', '×': 'x',
  '¥': 'y', '2': 'z'
};

const scrambleText = (text) => text.split('').map(c => charMap[c] || c).join('');
const unscrambleText = (text) => text.split('').map(c => reverseMap[c] || c).join('');

const Register = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [translatedName, setTranslatedName] = useState(false);
  const [password, setPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const [captchaError, setCaptchaError] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(true);
  
  const [hoverCount, setHoverCount] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    "Verifying citizenship...",
    "Cross-checking databases...",
    "Fetching Aadhaar-linked emotions...",
    "Session expired."
  ];

  const forceScramble = () => {
    if (translatedName) {
      setTranslatedName(false);
      setName(prev => scrambleText(prev));
    }
  };

  const handleNameChange = (e) => {
    let val = e.target.value;
    if (translatedName) {
      // If they type while it's human readable, instantly scramble the whole thing again
      setTranslatedName(false);
      setName(scrambleText(val));
    } else {
      // Just map the new value
      setName(scrambleText(val));
    }
  };

  const handleButtonHover = () => {
    if (hoverCount < 3) {
      const maxDist = 150;
      const rx = (Math.random() - 0.5) * maxDist * 2;
      const ry = (Math.random() - 0.5) * maxDist * 2;
      setButtonPos({ x: rx, y: ry });
      setHoverCount(prev => prev + 1);
    } else {
      setButtonPos({ x: 0, y: 0 });
    }
  };

  const hasEmoji = /\p{Emoji}/u.test(password);
  const hasRoman = /[IVXLCDM]/i.test(password);
  const hasSanskrit = /[\u0900-\u097F]/.test(password); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      alert("Please solve the captcha first.");
      return;
    }

    if (!hasEmoji || !hasRoman || !hasSanskrit) {
      alert("Your password does not meet the mandatory national security guidelines. Please ensure it contains an Emoji, a Roman Numeral, and a Devanagari character.");
      return;
    }

    setIsLoading(true);
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      setLoadingStep(step);
      
      if (step >= loadingSteps.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/otp'); 
        }, 2000);
      }
    }, 1500);
  };

  useEffect(() => {
    if (!termsAgreed) {
      const timeout = setTimeout(() => {
        setTermsAgreed(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [termsAgreed]);



  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md">
      <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-6 uppercase text-center text-[#003366]">
        Citizen Onboarding
      </h2>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold text-gray-700 h-8">
            {loadingSteps[loadingStep]}
          </p>
          {loadingStep === loadingSteps.length - 1 && (
            <p className="text-red-500 font-bold mt-2 animate-pulse">Redirecting to punishment portal...</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name (As per records)</label>
            <input 
              type="text" 
              value={name}
              onChange={handleNameChange}
              onFocus={forceScramble}
              onClick={forceScramble}
              className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-600 font-mono bg-gray-50"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">For national security formatting.</p>
            {name.length > 0 && !translatedName && (
              <button 
                type="button"
                onClick={() => { 
                  setTranslatedName(true); 
                  setName(prev => unscrambleText(prev));
                }}
                className="text-xs text-blue-600 underline mt-1"
              >
                Translate to human-readable format
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Aadhaar / PAN / Ration Card Number</label>
            <input 
              type="text" 
              value={aadhaar}
              maxLength={16}
              onChange={(e) => {
                let rawVal = e.target.value.toUpperCase();
                // Increment any newly typed numbers
                let newVal = '';
                for(let i=0; i<rawVal.length; i++) {
                  let char = rawVal[i];
                  if (/[0-9]/.test(char) && i === rawVal.length - 1 && rawVal.length > aadhaar.length) {
                    char = (parseInt(char) + 1) % 10;
                  }
                  newVal += char;
                }
                
                if (Math.random() < 0.1 && newVal.length > 0 && !newVal.endsWith('-')) newVal += '-';
                setAadhaar(newVal);
              }}
              className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-600 bg-gray-50"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Note: For security, digits are automatically incremented by 1.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email ID</label>
            <input 
              type="email" 
              className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-600 bg-gray-50"
              placeholder="applicant@domain.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ultra-Secure Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-2 focus:outline-none focus:border-blue-600 bg-gray-50 mb-2"
              required
            />
            <div className="bg-orange-50 border border-orange-200 p-3 text-xs text-gray-700 space-y-1">
              <p className="font-bold text-orange-800 mb-2">Password must contain:</p>
              <p className={hasEmoji ? "text-green-600" : "text-red-600"}>
                {hasEmoji ? "✓" : "✗"} One Emoji
              </p>
              <p className={hasRoman ? "text-green-600" : "text-red-600"}>
                {hasRoman ? "✓" : "✗"} One Roman Numeral
              </p>
              <p className={hasSanskrit ? "text-green-600" : "text-red-600"}>
                {hasSanskrit ? "✓" : "✗"} One special character from Sanskrit (Devanagari)
              </p>
            </div>
          </div>

          <div className="border border-gray-300 p-4 bg-gray-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={captchaChecked} 
                onChange={(e) => {
                  e.preventDefault();
                  setShowCaptchaModal(true);
                  if (audioRef.current && !isPlaying) {
                    audioRef.current.play().catch(err => console.log("Audio play blocked", err));
                    setIsPlaying(true);
                  }
                }}
                className="w-7 h-7 accent-blue-600 cursor-pointer"
              />
              <span className="font-medium text-lg">I'm not a robot</span>
            </div>
            <div className="flex flex-col items-center justify-center opacity-80">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" className="w-8 h-8 mb-1" alt="reCAPTCHA icon" />
              <span className="text-[10px] text-gray-500 tracking-wide mt-1">reCAPTCHA</span>
              <span className="text-[8px] text-gray-500 mt-0.5">Privacy - Terms</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm mt-4">
            <input 
              type="checkbox" 
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-1"
            />
            <label className="text-gray-700">
              I agree to share my data with 47 departments, including but not limited to the Ministry of Minor Inconveniences.
            </label>
          </div>

          <div className="relative h-16 flex items-center justify-center mt-6">
            <motion.button
              type="submit"
              ref={buttonRef}
              onMouseEnter={handleButtonHover}
              animate={{ x: buttonPos.x, y: buttonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded shadow-lg border-b-4 border-green-900 absolute"
            >
              Submit Application
            </motion.button>
          </div>
        </form>
      )}

      {/* Navigation link added below the form but outside the loading state so it is visible */}
      {!isLoading && (
        <div className="mt-6 text-center text-sm border-t border-gray-300 pt-4">
          <p className="text-gray-600">Already a registered sufferer?</p>
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login Here
          </Link>
        </div>
      )}

      {/* Fake Captcha Modal */}
      {showCaptchaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-blue-600 shadow-2xl p-4 w-[350px]">
            <div className="bg-[#4a90e2] text-white p-4 mb-4 flex flex-col justify-center h-28">
              <span className="text-sm font-normal">Select all squares with</span>
              <span className="text-3xl font-black uppercase tracking-widest mt-1 mb-1">Potholes</span>
              <span className="text-sm font-normal">If there are none, click skip.</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mb-4 relative">
              {/* Fake grid of images */}
              <div className="absolute inset-0 pointer-events-none border border-white"></div>
              {Array.from({ length: 9 }).map((_, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                return (
                  <div 
                    key={i} 
                    className={`bg-gray-300 aspect-square cursor-pointer relative flex items-center justify-center overflow-hidden transition-all duration-200 ${
                      selectedSquares.includes(i) ? 'border-4 border-blue-600 scale-95' : 'border-2 border-transparent hover:border-gray-400'
                    }`}
                    onClick={() => {
                      setSelectedSquares(prev => 
                        prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
                      );
                    }}
                  >
                    <div 
                      className="w-full h-full opacity-90"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=300&h=300&fit=crop')`,
                        backgroundSize: '300%',
                        backgroundPosition: `${col * 50}% ${row * 50}%`
                      }}
                    ></div>
                    {selectedSquares.includes(i) && (
                      <div className="absolute top-1 left-1 bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-red-600 text-xs font-bold mb-3 h-4 text-center">
              {captchaError}
            </div>

            <div className="flex justify-between items-center border-t border-gray-300 pt-3">
              <div className="text-xl text-gray-500 flex gap-4 cursor-pointer">
                <span title="Get a new challenge" onClick={() => {
                  setSelectedSquares([]);
                  setCaptchaError("Network error. Could not fetch new challenge.");
                }}>⟳</span> 
                <span title="Audio challenge" onClick={() => {
                  setCaptchaError("Audio challenge is only available in Sanskrit.");
                }}>🎧</span>
                <span title="Info" onClick={() => {
                  setCaptchaError("Info: Submit Annexure 420-Kh (in triplicate) via Speed Post to the Ministry of Potholes for Captcha details.");
                }}>ⓘ</span>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => {
                    setCaptchaError("Potholes are mandatory. You cannot skip.");
                  }}
                  className="text-gray-600 font-bold px-4 py-2 hover:bg-gray-100 rounded text-sm"
                >
                  SKIP
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (selectedSquares.length === 0) {
                      setCaptchaError("Please select all matching images.");
                      return;
                    }
                    setCaptchaChecked(true);
                    setShowCaptchaModal(false);
                    setCaptchaError('');
                  }}
                  className="bg-[#4a90e2] hover:bg-blue-600 text-white px-6 py-2 font-bold rounded text-sm transition-colors"
                >
                  VERIFY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cursed Audio Player */}
      <audio ref={audioRef} loop src="/song/Never gonna give you up.mp3" />
      
      {isPlaying && (
        <div className="fixed bottom-4 left-4 bg-white border-2 border-[#003366] p-2 shadow-2xl flex items-center gap-3 z-50">
          <div className="flex gap-1 items-end h-4">
            <div className="w-1.5 bg-blue-600 animate-[bounce_1s_infinite] h-2"></div>
            <div className="w-1.5 bg-blue-600 animate-[bounce_1.2s_infinite] h-4"></div>
            <div className="w-1.5 bg-blue-600 animate-[bounce_0.8s_infinite] h-3"></div>
          </div>
          <span className="text-xs font-bold text-[#003366] uppercase tracking-wider">Mandatory Portal Theme</span>
          <button 
            type="button"
            onClick={() => alert("Muting the National Theme is a punishable offense under Section 420. Audio cannot be turned off.")}
            className="text-xl hover:bg-red-100 rounded p-1 transition-colors"
            title="Mute"
          >
            🔊
          </button>
        </div>
      )}

    </div>
  );
};

export default Register;
