import React from 'react';
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";

const Accordion = ({ steps, currentStep, setCurrentStep, firstStep, children }) => {
  const handleStepClick = (stepNumber) => {
    if (firstStep) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.number} className="border rounded-lg" onClick={()=>setCurrentStep(step.number)}>
          <button
            onClick={() => handleStepClick(step.number)}
            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <span className="font-semibold">{step.label}</span>
            <span>
              {currentStep === step.number ? <IoIosArrowDropupCircle size={25} /> : <IoIosArrowDropdownCircle size={25} />}
            </span>
          </button>
          {currentStep === step.number && (
            <div className="p-4">
              {children(step.number)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;