import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { HelpCircle, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Layout = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Namaskar! I am SarkariGPT. How can I delay your work today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  const location = useLocation();
  const isInternalPage = location.pathname === '/dashboard' || location.pathname === '/services';

  // Prevent reload / page refresh and restart registration
  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';
    const protectedPaths = ['/otp', '/clearance', '/dashboard', '/services'];
    
    if (isReload && protectedPaths.includes(window.location.pathname)) {
      // Wiping state lock and local storages
      localStorage.removeItem('stateMediaLock');
      sessionStorage.clear();
      
      // Navigate back to step 1
      navigate('/register', { replace: true });
      
      // Popup high-warning bureaucratic decree
      alert("❌ CRITICAL VIOLATION DETECTED!\n\nYou have refreshed your secure browser connection during a National Onboarding Clearance session.\n\nUnder digital compliance sub-clause 44-B, your temporary registration has been completely voided. You must restart your citizen application from Step 1.");
    }
  }, [navigate]);

  // Window-level beforeunload warn triggers
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const protectedPaths = ['/otp', '/clearance', '/dashboard', '/services'];
      if (protectedPaths.includes(location.pathname)) {
        e.preventDefault();
        e.returnValue = 'Warning: Refreshing now will completely reset your government registration progress!';
        return 'Warning: Refreshing now will completely reset your government registration progress!';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping, showChat]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message.trim();
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      
      const data = await res.json();
      setIsTyping(false);

      if (Math.random() < 0.15) {
        setChatHistory(prev => [...prev, { 
          sender: 'bot', 
          text: '...[System Error] Session expired. Please submit Annexure-J in triplicate to restart.' 
        }]);
        return;
      }

      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: data.reply 
      }]);
    } catch (error) {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: 'Error 404: Our servers are currently protesting. Try again later.' 
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif flex flex-col items-center">
      <header className="w-full bg-[#003366] text-white p-4 shadow-md border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-[#003366]">GOV</div>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-widest">National Portal of Suffering</h1>
              <p className="text-xs text-gray-300">Department of Unhinged Bureaucracy (DoUB)</p>
            </div>
          </div>
          <div className="text-sm">
            Status: <span className="text-red-400 font-bold">SERVERS UNDER STRESS</span>
          </div>
        </div>

        {isInternalPage && (
          <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#002244] flex gap-4">
            <Link 
              to="/dashboard" 
              onClick={(e) => {
                if (localStorage.getItem('stateMediaLock') === 'true') {
                  e.preventDefault();
                  alert("❌ ACCESS DENIED! You are currently under the 'Anti-Loitering & Forced Consuming Protocol'. You are prohibited from leaving this page until you have watched all 7 mandatory state news broadcasts for at least 10 seconds each.");
                }
              }}
              className={`px-4 py-2 font-bold rounded ${location.pathname === '/dashboard' ? 'bg-orange-500 text-white' : 'bg-[#002244] text-gray-300 hover:bg-[#001122]'}`}
            >
              National News
            </Link>
            <Link 
              to="/services" 
              onClick={(e) => {
                if (localStorage.getItem('stateMediaLock') === 'true') {
                  e.preventDefault();
                  alert("❌ ACCESS DENIED! You are currently under the 'Anti-Loitering & Forced Consuming Protocol'. You are prohibited from leaving this page until you have watched all 7 mandatory state news broadcasts for at least 10 seconds each.");
                }
              }}
              className={`px-4 py-2 font-bold rounded ${location.pathname === '/services' ? 'bg-orange-500 text-white' : 'bg-[#002244] text-gray-300 hover:bg-[#001122]'}`}
            >
              Govt Services
            </Link>
          </div>
        )}
      </header>

      <main className="w-full max-w-7xl flex-grow p-6">
        <Outlet />
      </main>

      <footer className="w-full bg-gray-200 text-center p-4 text-xs text-gray-600 mt-auto border-t border-gray-300">
        &copy; 2026 Department of Unhinged Bureaucracy. Best viewed in Internet Explorer 6.
      </footer>

      {/* SarkariGPT Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        {!showChat ? (
          <button 
            onClick={() => setShowChat(true)}
            className="bg-[#003366] text-white rounded-full p-4 shadow-2xl hover:bg-blue-800 transition-all flex items-center gap-2 border-2 border-orange-500 animate-pulse"
          >
            <HelpCircle /> SarkariGPT
          </button>
        ) : (
          <div className="bg-white border border-gray-400 shadow-2xl rounded-t-lg w-[380px] sm:w-[440px] flex flex-col h-[520px]">
            <div className="bg-[#003366] text-white p-3 rounded-t-lg flex justify-between items-center border-b-2 border-orange-500">
              <div>
                <div className="font-bold">SarkariGPT</div>
                <div className="text-[10px] text-orange-300">Powered by Digital Bharat Intelligence</div>
              </div>
              <button 
                onClick={() => setShowChat(false)} 
                className="text-white hover:text-red-400 transition-colors p-1 rounded hover:bg-blue-800"
                title="Dismiss"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 text-sm space-y-3">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 max-w-[80%] rounded ${
                    chat.sender === 'user' 
                      ? 'bg-blue-100 border border-blue-200 text-blue-900 rounded-br-none' 
                      : 'bg-white border border-gray-300 text-gray-800 rounded-bl-none shadow-sm [&>p]:mb-2 [&>p:last-child]:mb-0 [&_strong]:font-bold [&_em]:italic'
                  }`}>
                    {chat.sender === 'bot' ? (
                      <ReactMarkdown>
                        {chat.text}
                      </ReactMarkdown>
                    ) : (
                      chat.text
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-300 p-2 rounded rounded-bl-none shadow-sm text-gray-500 italic text-xs">
                    SarkariGPT is analyzing your patriotism...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="border-t border-gray-300 p-2 flex bg-white">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow border border-gray-400 p-2 text-sm focus:outline-none focus:border-[#003366] bg-gray-50"
                placeholder="Ask your query..."
              />
              <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm ml-2 font-bold shadow-sm">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
