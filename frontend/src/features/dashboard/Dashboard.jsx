import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [queue, setQueue] = useState(482000);
  const [complaints, setComplaints] = useState([]);
  const [scams, setScams] = useState([]);

  const fetchData = async () => {
    try {
      const [queueRes, compRes, scamRes] = await Promise.all([
        axios.get(`${API_URL}/queue`).catch(() => ({ data: { currentWaiting: 482921 } })),
        axios.get(`${API_URL}/complaints`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/scams`).catch(() => ({ data: [] }))
      ]);
      setQueue(queueRes.data.currentWaiting);
      setComplaints(compRes.data);
      setScams(scamRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Left Column: Status & Scams */}
      <div className="space-y-6">
        
        {/* User Application Status */}
        <div className="bg-white p-6 border border-gray-300 shadow-md text-center">
          <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Your Application Status</h3>
          <div className="text-2xl font-black text-[#003366] font-mono tracking-widest bg-yellow-100 p-4 border-2 border-yellow-400 border-dashed animate-pulse">
            PENDING
          </div>
          <p className="text-xs text-red-500 font-bold mt-2">Next update expected: 2029</p>
        </div>

        {/* Scam Reports */}
        <div className="bg-white border border-gray-300 shadow-md">
          <div className="bg-red-700 text-white p-3 border-b border-red-800">
            <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              ⚠️ Official Scam Alerts
            </h3>
          </div>
          <div className="p-4 space-y-4 max-h-60 overflow-y-auto">
            {scams.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No scams reported. Totally safe environment.</p>
            ) : (
              scams.map(s => (
                <div key={s.id} className="border border-red-200 p-3 bg-red-50">
                  <h4 className="font-bold text-red-800 text-sm mb-1">{s.title}</h4>
                  <p className="text-red-900 text-sm">{s.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Right Column: Complaints */}
      <div className="space-y-6">
        
        {/* Complaints Feed */}
        <div className="bg-white border border-gray-300 shadow-md h-full">
          <div className="bg-gray-100 border-b border-gray-300 p-3 flex justify-between items-center">
            <h3 className="font-bold text-[#003366]">Public Complaint Feed</h3>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded border border-red-200">Ignoring Mode: ON</span>
          </div>
          <div className="p-4 space-y-4 h-[550px] overflow-y-auto">
            {complaints.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No complaints. Everyone is perfectly happy.</p>
            ) : (
              complaints.map(c => (
                <div key={c.id} className="border-l-4 border-orange-500 pl-3 py-1 bg-gray-50 pr-2">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm">{c.user}</span>
                    <span className="text-[10px] text-gray-500">{c.time}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{c.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
