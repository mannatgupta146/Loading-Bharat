import React from 'react';

const Services = () => {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-white border border-gray-300 shadow-md flex flex-col">
        <div className="bg-[#003366] text-white p-3 border-b border-[#002244]">
          <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            🏛️ Government Services Portal
          </h3>
        </div>
        <div className="p-4 bg-gray-100 border-t border-gray-300 flex-grow">
          <div className="flex flex-col gap-4">
            <button className="bg-white p-6 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-colors text-left shadow-sm group" onClick={() => alert("Server is currently on a tea break. Come back in 2028.")}>
              <div className="font-black mb-2 text-lg group-hover:text-red-700">Aadhaar Re-Linking</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Estimated wait time: 42 years</div>
            </button>
            <button className="bg-white p-6 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-colors text-left shadow-sm group" onClick={() => alert("You owe ₹4,00,000 in unknown taxes. Pay immediately to proceed.")}>
              <div className="font-black mb-2 text-lg group-hover:text-red-700">Voluntary Tax Donation</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Status: ALWAYS WORKING</div>
            </button>
            <button className="bg-white p-6 border-2 border-dashed border-gray-400 text-gray-600 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-colors text-left shadow-sm group" onClick={() => alert("Error 404: Pension funds relocated to political campaigns.")}>
              <div className="font-black mb-2 text-lg group-hover:text-red-700">Claim Pension</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Requirement: Must be 150 years old</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
