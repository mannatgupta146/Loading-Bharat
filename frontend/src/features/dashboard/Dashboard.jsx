import React from 'react';
import NewsFeed from './NewsFeed.jsx';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* News Feed Section */}
      <div className="w-full">
        <NewsFeed />
      </div>

      {/* Services Section */}
      <div className="w-full">
        <div className="bg-white border border-gray-300 shadow-md">
          <div className="bg-[#003366] text-white p-3 border-b border-[#002244]">
            <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              🏛️ Government Services Portal
            </h3>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-white p-4 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors text-left shadow-sm" onClick={() => alert("Server is currently on a tea break. Come back in 2028.")}>
                <div className="font-bold mb-1 text-sm">Aadhaar Re-Linking</div>
                <div className="text-[10px] text-gray-500">Estimated wait time: 42 years</div>
              </button>
              <button className="bg-white p-4 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors text-left shadow-sm" onClick={() => alert("You owe ₹4,00,000 in unknown taxes. Pay immediately to proceed.")}>
                <div className="font-bold mb-1 text-sm">Voluntary Tax Donation</div>
                <div className="text-[10px] text-gray-500">Status: ALWAYS WORKING</div>
              </button>
              <button className="bg-white p-4 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors text-left shadow-sm" onClick={() => alert("Error 404: Pension funds relocated to political campaigns.")}>
                <div className="font-bold mb-1 text-sm">Claim Pension</div>
                <div className="text-[10px] text-gray-500">Requirement: Must be 150 years old</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
