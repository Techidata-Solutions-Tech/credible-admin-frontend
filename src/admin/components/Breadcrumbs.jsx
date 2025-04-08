import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ pageTitle, items }) => {
    return (
      <div className="w-full px-4 py-3 my-3 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          {pageTitle}
        </h1>
        <div className="flex items-center text-sm">
          {items?.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-semibold">
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.href} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  export default Breadcrumbs;