import React, { useState, useEffect, useRef } from 'react';

const PillTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const buttons = Array.from(container?.querySelectorAll('button') || []);

    // Remove old lines
    container.querySelectorAll('.row-line').forEach(el => el.remove());

    let seenTops = new Set();
    let firstTop = null;

    buttons.forEach((btn) => {
      const top = btn.offsetTop;

      if (firstTop === null) firstTop = top;

      if (!seenTops.has(top)) {
        seenTops.add(top);
        if (top !== firstTop) {
          const line = document.createElement('div');
          line.className = 'row-line';
          line.style.top = `${top - 4}px`; // position slightly above the row
          container.appendChild(line);
        }
      }
    });
  }, [tabs]);

  return (
    <div className="w-full max-w-4xl p-1 flex justify-center">
       <div
        ref={containerRef}
        className="flex flex-wrap justify-center gap-2 p-1 rounded-full bg-gray-200 relative"
        style={{ position: 'relative' }}
      >
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.label)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col gap-0 justify-center items-center
              ${activeTab === tab.label 
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            <span>{tab.label.split('(')[0]}</span>
            <span>{tab.label.split('(')[1]?.replace(/\)$/, '')}</span>
          </button>
        ))}
      </div>

      {/* Style for separation line */}
      <style>{`
        .row-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background-color:rgb(47, 87, 148); /* Tailwind gray-200 */
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default PillTabs;
