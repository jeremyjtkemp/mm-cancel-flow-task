'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CancellationService } from '@/lib/cancellation-service';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

type SurveyAnswers = {
  rolesApplied: string | null;
  companiesEmailed: string | null;
  companiesInterviewed: string | null;
};

export default function SurveyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<SurveyAnswers>({
    rolesApplied: null,
    companiesEmailed: null,
    companiesInterviewed: null,
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [downsellVariant, setDownsellVariant] = useState<'A' | 'B' | null>(null);

  // Get user ID and subscription ID from URL params
  useEffect(() => {
    const urlUserId = searchParams.get('userId');
    const urlSubscriptionId = searchParams.get('subscriptionId');
    
    // For demo purposes, use defaults if not provided
    const finalUserId = urlUserId || 'demo-user-123';
    setUserId(finalUserId);
    setSubscriptionId(urlSubscriptionId || 'demo-subscription-456');
    
    // Determine A/B variant for this user
    const variant = CancellationService.getDownsellVariant(finalUserId);
    setDownsellVariant(variant);
  }, [searchParams]);

  const handleAnswerSelect = (question: keyof SurveyAnswers, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const isFormComplete = () => {
    return answers.rolesApplied && answers.companiesEmailed && answers.companiesInterviewed;
  };

  const handleGetOffer = () => {
    // Route back to offer page with user context
    router.push(`/cancel/offer?userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleContinue = () => {
    if (isFormComplete()) {
      // TODO: Save survey data
      console.log('Survey answers:', answers);
      // Continue to reasons page with user context
      router.push(`/cancel/reasons?userId=${userId}&subscriptionId=${subscriptionId}`);
    }
  };

  const handleBack = () => {
    // Go back to offer page with user context
    router.push(`/cancel/offer?userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleClose = () => {
    // Close and go back to profile
    router.push('/');
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
            
            {/* Progress indicator - Step 2 of 3 */}
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
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 6.5L7 12" stroke="#62605c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <p className="block mb-0">Help us understand how you</p>
                <p className="block">were using Migrate Mate.</p>
              </div>
            </div>

            {/* Survey questions */}
            <div className="flex flex-col gap-6 md:gap-9 w-full">
              
              {/* Question 1: Roles applied */}
              <div className="flex flex-col gap-3 md:gap-4 w-full">
                <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] w-full">
                  <p className="leading-normal">
                    <span>How many roles did you </span>
                    <span className="underline decoration-solid underline-offset-[25%]">apply</span>
                    <span> for through Migrate Mate?</span>
                  </p>
                </div>
                <div className="flex gap-2 h-[30px] w-full">
                  {['0', '1 - 5', '6 - 20', '20+'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect('rolesApplied', option)}
                      className={`flex-1 px-3 md:px-6 py-3 rounded flex items-center justify-center transition-colors ${
                        answers.rolesApplied === option 
                          ? 'bg-[#9a6fff] text-white' 
                          : 'bg-[#f6f6f6] text-[#62605c] hover:bg-[#e6e6e6]'
                      }`}
                    >
                      <span className="font-dm-sans font-normal text-[11px] md:text-[14px] tracking-[-0.22px] md:tracking-[-0.28px]">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Companies emailed */}
              <div className="flex flex-col gap-3 md:gap-4 w-full">
                <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] w-full">
                  <p className="leading-normal">
                    <span>How many companies did you </span>
                    <span className="underline decoration-solid">email</span>
                    <span> directly?</span>
                  </p>
                </div>
                <div className="flex gap-2 h-[30px] w-full">
                  {['0', '1-5', '6-20', '20+'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect('companiesEmailed', option)}
                      className={`flex-1 px-3 md:px-6 py-3 rounded flex items-center justify-center transition-colors ${
                        answers.companiesEmailed === option 
                          ? 'bg-[#9a6fff] text-white' 
                          : 'bg-[#f6f6f6] text-[#62605c] hover:bg-[#e6e6e6]'
                      }`}
                    >
                      <span className="font-dm-sans font-normal text-[11px] md:text-[14px] tracking-[-0.22px] md:tracking-[-0.28px]">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Companies interviewed */}
              <div className="flex flex-col gap-3 md:gap-4 w-full">
                <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] w-full">
                  <p className="leading-normal">
                    <span>How many different companies did you </span>
                    <span className="underline decoration-solid">interview</span>
                    <span> with?</span>
                  </p>
                </div>
                <div className="flex gap-2 h-[30px] w-full">
                  {['0', '1-2', '3-5', '5+'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect('companiesInterviewed', option)}
                      className={`flex-1 px-3 md:px-6 py-3 rounded flex items-center justify-center transition-colors ${
                        answers.companiesInterviewed === option 
                          ? 'bg-[#9a6fff] text-white' 
                          : 'bg-[#f6f6f6] text-[#62605c] hover:bg-[#e6e6e6]'
                      }`}
                    >
                      <span className="font-dm-sans font-normal text-[11px] md:text-[14px] tracking-[-0.22px] md:tracking-[-0.28px]">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Action buttons */}
            <div className="flex flex-col gap-4 w-full">
              {/* Get offer button - variant specific */}
              <button
                onClick={handleGetOffer}
                className="bg-[#4abf71] h-10 w-full rounded-lg px-6 py-3 flex items-center justify-center hover:bg-[#3da85f] transition-colors"
              >
                <span className="font-dm-sans font-semibold text-white text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                  {downsellVariant === 'A' ? (
                    <>Get 50% off | $12.50 <span className="line-through text-[12px] md:text-[12px] text-[rgba(255,255,255,0.5)]">$25</span></>
                  ) : (
                    <>Get $10 off | $15 <span className="line-through text-[12px] md:text-[12px] text-[rgba(255,255,255,0.5)]">$25</span></>
                  )}
                </span>
              </button>

              {/* Continue button - always visible, disabled until form is complete */}
              <button
                onClick={handleContinue}
                disabled={!isFormComplete()}
                className={`h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center transition-colors ${
                  isFormComplete() 
                    ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                    : 'bg-[#e6e6e6] cursor-not-allowed'
                }`}
              >
                <span className={`font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px] ${
                  isFormComplete() ? 'text-white' : 'text-[#b5b3af]'
                }`}>
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
