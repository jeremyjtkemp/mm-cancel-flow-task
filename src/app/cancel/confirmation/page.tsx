'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancelConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visaLawyerAnswer, setVisaLawyerAnswer] = useState<'yes' | 'no' | null>(null);
  const [visaType, setVisaType] = useState('');
  
  // Get the type of confirmation flow
  const confirmationType = searchParams.get('type'); // 'success' or 'no_usage'
  const userId = searchParams.get('userId');
  const subscriptionId = searchParams.get('subscriptionId');
  
  const handleBack = () => {
    // Go back to feedback page with user context
    router.push(`/cancel/feedback?found_with_mm=${confirmationType === 'success' ? 'yes' : 'no'}&userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleClose = () => {
    router.push('/'); // Back to profile page
  };

  const handleVisaLawyerSelect = (answer: 'yes' | 'no') => {
    setVisaLawyerAnswer(answer);
    // Clear visa type when switching options since the context changes
    setVisaType('');
  };

  const isFormComplete = () => {
    if (visaLawyerAnswer === null) return false;
    
    // For success flow (used MigrateMate), both paths require visa type input
    if (confirmationType === 'success') {
      if ((visaLawyerAnswer === 'yes' || visaLawyerAnswer === 'no') && visaType.trim() === '') return false;
    }
    // For no_usage flow, both "Yes" and "No" require visa type input
    if (confirmationType === 'no_usage') {
      if ((visaLawyerAnswer === 'yes' || visaLawyerAnswer === 'no') && visaType.trim() === '') return false;
    }
    
    return true;
  };

  const handleCompleteCancellation = () => {
    if (isFormComplete()) {
      // TODO: Actually process the cancellation in database
      console.log('Cancellation completed with visa lawyer answer:', visaLawyerAnswer);
      console.log('Visa type:', visaType);
      
      // Navigate to completion page (same logic for both success and no_usage flows)
      if (visaLawyerAnswer === 'no') {
        // User's company doesn't provide lawyer - they need MigrateMate's help
        router.push(`/cancel/complete?type=has_visa_help&userId=${userId}&subscriptionId=${subscriptionId}`);
      } else {
        // User's company provides lawyer - they're all set
        router.push(`/cancel/complete?type=no_visa_help&userId=${userId}&subscriptionId=${subscriptionId}`);
      }
    }
  };

  // Handle different confirmation types
  if (confirmationType === 'no_usage') {
    // User didn't find job through MigrateMate - show upsell opportunity
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
                  <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
                  <div className="bg-[#b5b3af] h-2 rounded-[50px] w-6" />
                </div>
                <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                  Step 3 of 3
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
              <div className="flex flex-col gap-2 md:gap-3 w-full">
                <div className="flex flex-col gap-2 md:gap-4 w-full">
                  <div className="font-['Inter',sans-serif] font-semibold text-[#41403d] text-[28px] md:text-[36px] leading-[32px] md:leading-[36px] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                    <p className="mb-0">You landed the job!</p>
                    <p className="italic mb-0">That's what we live for.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:gap-4 w-full">
                  <div className="font-dm-sans font-semibold text-[#41403d] text-[16px] md:text-[20px] tracking-[-0.8px] md:tracking-[-1px] leading-normal w-full">
                    <p className="mb-0">Even if it wasn't through Migrate Mate,</p>
                    <p className="mb-0">let us help get your visa sorted.</p>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="flex flex-col gap-3 md:gap-4 w-full">
                <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                  Is your company providing an immigration lawyer to help with your visa?
                </div>
              </div>

              {/* Radio button options */}
              <div className="flex flex-col gap-2 w-full">
                {/* Show "Yes" option only when not "no" is selected, or when "yes" is selected */}
                {visaLawyerAnswer !== 'no' && (
                  <button
                    onClick={() => handleVisaLawyerSelect('yes')}
                    className="flex gap-3 items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <div className="w-5 h-5 relative">
                      <div className={`w-full h-full rounded-full border-2 transition-colors ${
                        visaLawyerAnswer === 'yes' 
                          ? 'border-[#996EFF] bg-[#996EFF]' 
                          : 'border-[#62605c] bg-white'
                      }`}>
                        {visaLawyerAnswer === 'yes' && (
                          <div className="w-full h-full rounded-full bg-white scale-50 transform transition-transform"></div>
                        )}
                      </div>
                    </div>
                    <div className="font-dm-sans font-medium text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal">
                      Yes
                    </div>
                  </button>
                )}
                
                {/* Conditional visa type input when "Yes" is selected in no_usage flow */}
                {visaLawyerAnswer === 'yes' && (
                  <div className="ml-8 flex flex-col gap-2">
                    <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                      What visa will you be applying for?*
                    </div>
                    <input
                      type="text"
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      placeholder="Enter visa type..."
                      className="h-10 w-full px-3 py-3 border border-[#62605c] rounded-lg focus:outline-none focus:border-[#996EFF] transition-colors font-dm-sans text-[14px] text-[#41403d] placeholder-gray-400"
                    />
                  </div>
                )}
                
                {/* Show "No" option only when not "yes" is selected, or when "no" is selected */}
                {visaLawyerAnswer !== 'yes' && (
                  <button
                    onClick={() => handleVisaLawyerSelect('no')}
                    className="flex gap-3 items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <div className="w-5 h-5 relative">
                      <div className={`w-full h-full rounded-full border-2 transition-colors ${
                        visaLawyerAnswer === 'no' 
                          ? 'border-[#996EFF] bg-[#996EFF]' 
                          : 'border-[#62605c] bg-white'
                      }`}>
                        {visaLawyerAnswer === 'no' && (
                          <div className="w-full h-full rounded-full bg-white scale-50 transform transition-transform"></div>
                        )}
                      </div>
                    </div>
                    <div className="font-dm-sans font-medium text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal">
                      No
                    </div>
                  </button>
                )}
                
                {/* Conditional trusted partners message and visa type input when "No" is selected in no_usage flow */}
                {visaLawyerAnswer === 'no' && (
                  <div className="ml-8 flex flex-col gap-2">
                    <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                      We can connect you with one of our trusted partners. Which visa would you like to apply for?*
                    </div>
                    <input
                      type="text"
                      value={visaLawyerAnswer === 'no' ? visaType : ''}
                      onChange={(e) => setVisaType(e.target.value)}
                      placeholder="Enter visa type..."
                      className="h-10 w-full px-3 py-3 border border-[#62605c] rounded-lg focus:outline-none focus:border-[#996EFF] transition-colors font-dm-sans text-[14px] text-[#41403d] placeholder-gray-400"
                    />
                  </div>
                )}
              </div>

              {/* Divider line */}
              <div className="w-full h-[1px] bg-[#e6e6e6]" />

              {/* Complete cancellation button */}
              <div className="flex flex-col gap-4 w-full mt-auto">
                <button
                  onClick={handleCompleteCancellation}
                  disabled={!isFormComplete()}
                  className={`h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center transition-colors ${
                    isFormComplete()
                      ? 'bg-[#996EFF] text-white hover:bg-[#8952fc]'
                      : 'bg-[#e6e6e6] text-[#b5b3af] cursor-not-allowed'
                  }`}
                >
                  <span className="font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                    Complete cancellation
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

  // Default case for other types
  if (confirmationType !== 'success') {
    return (
      <div className="bg-neutral-50 fixed inset-0 z-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cancellation Complete</h1>
          <p className="mb-4">Thank you for your feedback.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#996EFF] text-white px-6 py-2 rounded-lg hover:bg-[#8952fc]"
          >
            Return to Profile
          </button>
        </div>
      </div>
    );
  }

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
                <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
                <div className="bg-[#b5b3af] h-2 rounded-[50px] w-6" />
              </div>
              <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                Step 3 of 3
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
                We helped you land the job, now let's help you secure your visa.
              </div>
            </div>

            {/* Question */}
            <div className="flex flex-col gap-3 md:gap-4 w-full">
              <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                Is your company providing an immigration lawyer to help with your visa?
              </div>
            </div>

            {/* Radio button options */}
            <div className="flex flex-col gap-2 w-full">
              {/* Show "Yes" option only when not "no" is selected, or when "yes" is selected */}
              {visaLawyerAnswer !== 'no' && (
                <button
                  onClick={() => handleVisaLawyerSelect('yes')}
                  className="flex gap-3 items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div className="w-5 h-5 relative">
                    <div className={`w-full h-full rounded-full border-2 transition-colors ${
                      visaLawyerAnswer === 'yes' 
                        ? 'border-[#996EFF] bg-[#996EFF]' 
                        : 'border-[#62605c] bg-white'
                    }`}>
                      {visaLawyerAnswer === 'yes' && (
                        <div className="w-full h-full rounded-full bg-white scale-50 transform transition-transform"></div>
                      )}
                    </div>
                  </div>
                  <div className="font-dm-sans font-medium text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal">
                    Yes
                  </div>
                </button>
              )}
              
              {/* Conditional visa type input when "Yes" is selected */}
              {visaLawyerAnswer === 'yes' && (
                <div className="ml-8 flex flex-col gap-2">
                  <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                    What visa will you be applying for?*
                  </div>
                  <input
                    type="text"
                    value={visaLawyerAnswer === 'yes' ? visaType : ''}
                    onChange={(e) => setVisaType(e.target.value)}
                    placeholder="Enter visa type..."
                    className="h-10 w-full px-3 py-3 border border-[#62605c] rounded-lg focus:outline-none focus:border-[#996EFF] transition-colors font-dm-sans text-[14px] text-[#41403d] placeholder-gray-400"
                  />
                </div>
              )}
              
              {/* Show "No" option only when not "yes" is selected, or when "no" is selected */}
              {visaLawyerAnswer !== 'yes' && (
                <button
                  onClick={() => handleVisaLawyerSelect('no')}
                  className="flex gap-3 items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div className="w-5 h-5 relative">
                    <div className={`w-full h-full rounded-full border-2 transition-colors ${
                      visaLawyerAnswer === 'no' 
                        ? 'border-[#996EFF] bg-[#996EFF]' 
                        : 'border-[#62605c] bg-white'
                    }`}>
                      {visaLawyerAnswer === 'no' && (
                        <div className="w-full h-full rounded-full bg-white scale-50 transform transition-transform"></div>
                      )}
                    </div>
                  </div>
                  <div className="font-dm-sans font-medium text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal">
                    No
                  </div>
                </button>
              )}
              
              {/* Conditional visa service offer when "No" is selected */}
              {visaLawyerAnswer === 'no' && (
                <div className="ml-8 flex flex-col gap-2">
                  <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                    We can connect you with one of our trusted partners. Which visa would you like to apply for?*
                  </div>
                  <input
                    type="text"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    placeholder="Enter visa type..."
                    className="h-10 w-full px-3 py-3 border border-[#62605c] rounded-lg focus:outline-none focus:border-[#996EFF] transition-colors font-dm-sans text-[14px] text-[#41403d] placeholder-gray-400"
                  />
                </div>
              )}
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Complete cancellation button */}
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={handleCompleteCancellation}
                disabled={!isFormComplete()}
                className={`h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center transition-colors ${
                  isFormComplete()
                    ? 'bg-[#996EFF] text-white hover:bg-[#8952fc]'
                    : 'bg-[#e6e6e6] text-[#b5b3af] cursor-not-allowed'
                }`}
              >
                <span className="font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                  Complete cancellation
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
