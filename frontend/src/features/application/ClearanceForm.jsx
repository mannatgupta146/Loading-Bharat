import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useRegistrationGuard from '../auth/useRegistrationGuard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ClearanceForm = () => {
  const navigate = useNavigate();
  useRegistrationGuard(); // ⛔ Intercepts reload & back-button during mid-registration
  const [applyMessage, setApplyMessage] = useState(null);
  const [applyStatus, setApplyStatus] = useState(null); 

  // Form State
  const [appName, setAppName] = useState('');
  const [fatherName, setFatherName] = useState('');
  
  // Webcam State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoCaptured, setPhotoCaptured] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [prankVideoPlaying, setPrankVideoPlaying] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const getBrokenStyle = (top, left, rotate, zIndex) => {
    if (!isBroken) return {};
    return {
      position: 'fixed',
      top: top,
      left: left,
      transform: `rotate(${rotate}deg)`,
      zIndex: zIndex,
      background: 'white',
      padding: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '4px dashed #ff0000',
      width: '320px',
      transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)'
    };
  };

  const startCamera = async () => {
    setIsBroken(true);
    setPrankVideoPlaying(true);
  };

  const generateSurveillanceFallback = () => {
    // Draw a fake "govt surveillance" placeholder on the canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Dark grey background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 600, 400);
    // Red border
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 592, 392);
    // Surveillance text
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('AADHAAR SURVEILLANCE OVERRIDE', 300, 60);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('⚠ BIOMETRIC BYPASS ACTIVATED ⚠', 300, 100);
    // Fake face silhouette
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(300, 210, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(220, 280, 160, 80);
    // Status text
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('CITIZEN IDENTITY: VERIFIED BY GOVT DATABASE', 300, 360);
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px monospace';
    ctx.fillText('Ref: AADHAAR-OVERRIDE-44B | Status: FORCEFULLY APPROVED', 300, 385);

    const dataUrl = canvas.toDataURL('image/png');
    setPhotoCaptured(dataUrl);
    setPrankVideoPlaying(false);
    setCameraActive(false);
  };

  const executeRealCamera = async () => {
    // Check if getUserMedia is even supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      generateSurveillanceFallback();
      alert('⚠️ Camera not supported by this browser.\n\nDo not worry — the Ministry has located your last known Aadhaar surveillance photo and applied it automatically.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      // Camera denied or unavailable — use govt surveillance fallback
      generateSurveillanceFallback();
      alert('📸 Camera access denied.\n\nAs per Digital India Compliance Act Sub-Clause 44-B, the Ministry has retrieved your last known Aadhaar surveillance photograph.\n\nYour biometric submission has been auto-approved. Proceed.');
    }
  };


  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 200);
      setPhotoCaptured(canvasRef.current.toDataURL('image/png'));
      
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!photoCaptured) {
      alert("Please provide biometric proof (photo) of your existence.");
      return;
    }

    setApplyMessage("Submitting your hopes and dreams...");
    setApplyStatus("pending");
    try {
      const res = await axios.post(`${API_URL}/apply`, {
        name: appName,
        fatherName: fatherName,
        photo: photoCaptured
      });
      setApplyMessage(res.data.message);
      setApplyStatus("success");
      
      navigate('/dashboard');
    } catch (error) {
      setApplyMessage(error.response?.data?.message || "An unknown bureaucracy error occurred.");
      setApplyStatus("error");

      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className={`bg-white p-6 shadow-md transition-all duration-1000 ${isBroken ? 'bg-transparent border-none shadow-none' : 'border border-gray-300'}`}>
        <div style={getBrokenStyle('5%', '70%', 12, 50)}>
          <h3 className="font-bold text-lg text-[#003366] uppercase hover:tracking-tighter transition-all">Clearance Form</h3>
          <p className="text-xs text-gray-600 border-b border-gray-200 pb-4 mb-4 italic">
            Submit this mandatory clearance form to legally prove you exist, confirm you are not avoiding your taxes, and officially request permission to continue suffering under the national digital infrastructure.
          </p>
        </div>
        
        <form onSubmit={handleApply} className="space-y-4">
          
          {/* Webcam / Photo section */}
          <div style={getBrokenStyle('10%', '5%', -8, 40)}>
            <div className="border border-gray-300 p-3 bg-gray-50 animate-[spin_4s_linear_infinite]">
            <label className="block text-sm font-bold text-gray-700 mb-2">Live Photo Capture (Mandatory)</label>
            
            {!photoCaptured && !cameraActive && !prankVideoPlaying && (
              <div className="space-y-3">
                <button 
                  type="button" 
                  onClick={startCamera}
                  className="w-full bg-gray-200 border border-gray-400 py-2 text-sm font-bold hover:bg-gray-300"
                >
                  Start Camera
                </button>
              </div>
            )}

            {/* In-line Laughing Prank Video */}
            {prankVideoPlaying && (
              <div className="relative w-full h-64 bg-black rounded overflow-hidden border-2 border-gray-400">
                <video 
                  src="/video/camera.mp4" 
                  autoPlay 
                  className="w-full h-full object-cover"
                  onEnded={() => {
                    setPrankVideoPlaying(false);
                    executeRealCamera();
                  }}
                />
                <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                  <span className="text-white text-[10px] font-bold">Govt. Observer Active</span>
                </div>
              </div>
            )}

            {/* Always mount video so ref works, hide when inactive */}
            <div className={`relative ${!cameraActive && !photoCaptured ? 'hidden' : ''} ${photoCaptured || prankVideoPlaying ? 'hidden' : ''}`}>
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover bg-black rounded" />
              <button 
                type="button" 
                onClick={capturePhoto}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-full font-bold text-sm shadow-xl transition-all"
              >
                CAPTURE
              </button>
            </div>

            <canvas ref={canvasRef} width="600" height="400" className="hidden" />

            {photoCaptured && (
              <div className="text-center">
                <div className="border-4 border-gray-400 inline-block overflow-hidden bg-black p-1 w-full max-w-md mx-auto">
                  <img 
                    src={photoCaptured} 
                    alt="Captured" 
                    className="w-full h-64 object-cover scale-y-[-1] scale-x-[-1] rounded-sm"
                  />
                </div>
                <p className="text-xs text-red-600 font-bold mt-1">Status: Face detected (Inverted). Acceptable.</p>
                <button 
                  type="button" 
                  onClick={() => { setPhotoCaptured(null); startCamera(); }}
                  className="text-xs text-blue-600 underline mt-2"
                >
                  Retake (Will still be inverted)
                </button>
              </div>
            )}
          </div>
          </div>

          <div style={getBrokenStyle('75%', '70%', 22, 45)}>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={appName}
              onChange={(e) => {
                // Unique Bug: Alphabetical auto-sort!
                const sortedVal = e.target.value.toUpperCase().split('').sort((a, b) => {
                  // Keep spaces intact but sort letters
                  if (a === ' ') return -1;
                  if (b === ' ') return 1;
                  return a.localeCompare(b);
                }).join('').trimStart();
                setAppName(sortedVal);
              }}
              className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-blue-600 uppercase"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Notice: Names are automatically alphabetized to optimize our national database indexing.</p>
          </div>
          <div style={getBrokenStyle('75%', '5%', -15, 30)}>
            <label className="block text-xs font-bold text-gray-700 mb-1">Father's/Mother's/Spouse's Name</label>
            <input 
              type="text" 
              value={fatherName}
              onChange={(e) => {
                // Unique Bug: Bandwidth saver (max 5 chars, trims from the front)
                let val = e.target.value.toUpperCase();
                if (val.length > 5) {
                  val = val.slice(-5);
                }
                setFatherName(val);
              }}
              className="w-full border border-gray-400 p-2 text-sm focus:outline-none focus:border-blue-600 uppercase"
              required
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Due to budget cuts, we can only afford to store the 5 most recent letters of this name.</p>
          </div>

          <div style={getBrokenStyle('45%', '40%', 5, 55)}>
            <button 
              type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded shadow border-b-4 border-orange-800 transition-all active:translate-y-1 active:border-b-0"
          >
              Apply for Clearance
            </button>
          </div>
        </form>
        
        {applyMessage && (
          <div className={`mt-4 p-3 text-sm font-bold border ${
            applyStatus === 'error' ? 'bg-red-50 text-red-800 border-red-300' : 
            applyStatus === 'success' ? 'bg-green-50 text-green-800 border-green-300' :
            'bg-blue-50 text-blue-800 border-blue-300 animate-pulse'
          }`}>
            {applyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearanceForm;
