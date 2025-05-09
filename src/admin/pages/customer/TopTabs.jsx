import React, { useState } from 'react';

const TopTabs = ({tabs}) => {

  
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full max-w-4xl p-4">
      <div className="flex flex-wrap justify-center gap-2 p-1 rounded-full bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.label)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col justify-center items-center
               'text-gray-600 hover:bg-gray-100'
            `}
       
          >
            <span>
           {tab.label.split(' ')[0]}
           </span>
           <span>
           {tab.label.split(' ')[1]}
           </span>
          </button>
        ))}
      </div>
      
     
    </div>
  );
};

export default TopTabs;