import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const navigate = useNavigate();

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 50) + 10;
    const c = Math.floor(Math.random() * 200) + 50;
    return {
      text: `${a} × ${b} - ${c} = ?`,
      answer: String(a * b - c)
    };
  };

  const [problem, setProblem] = useState(generateProblem());
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0); // tracks 'Incorrect format' attempts
  const [totalFails, setTotalFails] = useState(0); // tracks total failures (math or timeout)
  const [showBlockingPopup, setShowBlockingPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlockingPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showBlockingPopup) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !showBlockingPopup) {
      const newFails = totalFails + 1;
      setTotalFails(newFails);
      if (newFails >= 2) {
        navigate('/clearance');
      } else {
        setError("OTP Expired! Generating a new one...");
        setProblem(generateProblem());
        setTimeLeft(30);
        setOtp('');
        setAttempts(0);
      }
    }
  }, [timeLeft, showBlockingPopup, totalFails, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expectedFormat = `OTP-${problem.answer}-BHARAT`;

    if (otp === problem.answer) {
      setError("Incorrect format.");
      setAttempts(1);
    } else if (otp === expectedFormat) {
      navigate('/clearance');
    } else {
      const newFails = totalFails + 1;
      setTotalFails(newFails);
      if (newFails >= 2) {
        navigate('/clearance');
      } else {
        setError("Invalid OTP. Your math is weak. Try a new one.");
        setProblem(generateProblem());
        setTimeLeft(30);
        setOtp('');
        setAttempts(0);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 shadow-md relative">
      {/* Blocking Popup */}
      {showBlockingPopup && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center border-4 border-red-500">
          <h3 className="text-xl font-bold text-red-600 mb-2">URGENT NOTIFICATION</h3>
          <p className="text-sm font-bold">Please read this important message about server load before proceeding.</p>
          <p className="text-xs text-gray-500 mt-4">(This popup cannot be closed. Please wait...)</p>
        </div>
      )}

      <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-6 uppercase text-center text-[#003366]">
        Verify Identity
      </h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-800 font-bold mb-1">OTP sent to your registered device.</p>
        <p className="text-xs">If not received, please check with your local post office.</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm mb-2">To prove you are the account owner, please calculate your OTP:</p>
        <div className="text-2xl font-mono font-bold bg-gray-100 py-3 border border-gray-300 shadow-inner">
          {problem.text}
        </div>
        <p className="text-xs text-gray-500 mt-2">Use the answer as your OTP.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-sm font-bold text-gray-700">Enter OTP</label>
            <span className={`text-xs font-bold ${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
              Expires in: {timeLeft}s
            </span>
          </div>
          <input 
            type="text" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-400 p-3 text-center text-lg tracking-widest focus:outline-none focus:border-blue-600 font-mono bg-gray-50 uppercase"
            placeholder="XXXX"
            autoComplete="off"
          />
          {error && (
            <div className="mt-2 text-red-600 text-sm font-bold bg-red-50 p-2 border border-red-200">
              {error}
              {attempts === 1 && (
                <div className="mt-1 text-gray-700 text-xs font-normal">
                  Expected format: <code className="bg-gray-200 px-1 text-black font-bold">OTP-{problem.answer}-BHARAT</code>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#003366] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded shadow border-b-4 border-blue-900"
        >
          Verify
        </button>
      </form>
      {/* Cursed Siren */}
      <audio autoPlay loop src="/audio/siren.mp3" />
    </div>
  );
};

export default OtpVerification;
