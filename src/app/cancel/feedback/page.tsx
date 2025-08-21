'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancelFeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState('');
  const minCharacters = 25;
  
  // Get the user's survey answers from URL params or session storage
  // For now, we'll use URL params - could move to context/state management later
  const foundJobWithMigrateMate = searchParams.get('found_with_mm');
  const userId = searchParams.get('userId');
  const subscriptionId = searchParams.get('subscriptionId');

  const handleBack = () => {
    // Go back to reason page with user context
    router.push(`/cancel/reason?job=yes&userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleClose = () => {
    router.push('/'); // Back to profile page
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const isFormValid = () => {
    return feedback.trim().length >= minCharacters;
  };

  const handleContinue = () => {
    if (isFormValid()) {
      // Branch based on whether they found job through MigrateMate
      if (foundJobWithMigrateMate === 'yes') {
        // They used MigrateMate successfully - direct to final confirmation
        router.push(`/cancel/confirmation?type=success&userId=${userId}&subscriptionId=${subscriptionId}`);
      } else {
        // They didn't use MigrateMate - show upsell opportunity for visa services
        router.push(`/cancel/confirmation?type=no_usage&userId=${userId}&subscriptionId=${subscriptionId}`);
      }
    }
  };

  return (
    <div className="bg-[#f8fafc] fixed inset-0 z-50 flex items-center justify-center p-4">

      
      {/* Main modal container */}
      <div className="relative bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] w-full max-w-[1000px] max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white flex items-center justify-between px-5 py-[18px] h-[60px] border-b border-[#e6e6e6] relative">
          {/* Mobile: Header content at top left, Desktop: Centered */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-2 md:gap-6 w-full md:w-auto">
            <div className="font-dm-sans font-semibold text-[#41403d] text-[14px] md:text-[16px] text-left md:text-center">
              Subscription Cancellation
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
                <div className="bg-[#b5b3af] h-2 rounded-[50px] w-6" />
                <div className="bg-[#e6e6e6] h-2 rounded-[50px] w-6" />
              </div>
              <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                Step 2 of 3
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L1 11M1 1L11 11" stroke="#41403d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start justify-start p-5 md:p-5 p-4 min-h-0">
          
          {/* Mobile: Back button below header, Desktop: Hidden */}
          <div className="w-full md:hidden mb-0">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 hover:bg-gray-100 rounded p-2 transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="7.5" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                  <path d="M1 1L7 6.5L1 12" stroke="#62605c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-dm-sans font-semibold text-[#62605c] text-[14px]">Back</span>
            </button>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 items-start w-full">
            
            {/* Main heading */}
            <div className="flex flex-col gap-2 md:gap-4 w-full">
              <div className="font-dm-sans font-semibold text-[#41403d] text-[28px] md:text-[36px] leading-[32px] md:leading-[36px] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                What's one thing you wish we could've helped you with?
              </div>
            </div>

            {/* Description */}
            <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full md:max-w-[395px]">
              We're always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*
            </div>

            {/* Text area */}
            <div className="relative w-full h-[120px] md:h-[150px]">
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Share your thoughts..."
                className="w-full h-full p-3 border border-[#62605c] rounded-lg resize-none focus:outline-none focus:border-[#996EFF] transition-colors font-dm-sans text-[14px] text-[#41403d]"
              />
              <div className="absolute bottom-3 right-3">
                <div className="font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px] text-right">
                  Min {minCharacters} characters ({feedback.length}/{minCharacters})
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Continue button */}
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={handleContinue}
                disabled={!isFormValid()}
                className={`h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center transition-colors ${
                  isFormValid()
                    ? 'bg-[#996EFF] text-white hover:bg-[#8952fc]'
                    : 'bg-[#e6e6e6] text-[#b5b3af] cursor-not-allowed'
                }`}
              >
                <span className="font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                  Continue
                </span>
              </button>
            </div>
          </div>
          
          {/* Desktop: Image on right side */}
          <div className="hidden md:block w-[400px] self-stretch relative">
            <div 
              className="w-full h-full rounded-xl bg-cover bg-center shadow-[0px_0px_30px_0px_rgba(0,0,0,0.2)] relative overflow-hidden"
              style={{ backgroundImage: `url('${imgBg}')` }}
            >
              {/* Inner shadow overlay */}
              <div className="absolute inset-0 shadow-[0px_-6px_4px_0px_inset_rgba(0,0,0,0.5)]" />
              {/* Border highlight */}
              <div className="absolute inset-0 border-[2px_0px_0px] border-[rgba(255,255,255,0.3)] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
