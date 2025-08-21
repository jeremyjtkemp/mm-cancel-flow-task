'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  // Get user ID and subscription ID from URL params or use defaults for demo
  useEffect(() => {
    const urlUserId = searchParams.get('userId');
    const urlSubscriptionId = searchParams.get('subscriptionId');
    
    // For demo purposes, use defaults if not provided
    setUserId(urlUserId || 'demo-user-123');
    setSubscriptionId(urlSubscriptionId || 'demo-subscription-456');
  }, [searchParams]);

  const handleOptionSelect = (option: 'yes' | 'no') => {
    setSelectedOption(option);
    // Navigate to next step based on selection
    if (option === 'yes') {
      // User found a job - go to job survey flow
      router.push(`/cancel/reason?job=yes&userId=${userId}&subscriptionId=${subscriptionId}`);
    } else {
      // User still looking - show downsell offer
      router.push(`/cancel/offer?userId=${userId}&subscriptionId=${subscriptionId}`);
    }
  };

  const handleClose = () => {
    router.push('/'); // Back to profile page
  };

  return (
    <div className="bg-[#f8fafc] fixed inset-0 z-50 flex items-center justify-center p-4">

      
      {/* Main modal container */}
      <div className="relative bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] w-full max-w-[1000px] max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-center px-0 py-[18px] h-[60px] border-b border-[#e6e6e6] relative">
          <div className="font-dm-sans font-semibold text-[#41403d] text-[14px] md:text-[16px] text-center px-4">
            Subscription Cancellation
          </div>
          <button
            onClick={handleClose}
            className="absolute right-[18px] top-[18px] w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L1 11M1 1L11 11" stroke="#41403d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start justify-start p-5 md:p-5 p-4 min-h-0">
          
          {/* Mobile: Image at top, Desktop: Image on right */}
          <div className="order-1 md:order-2 w-full md:w-[400px] h-[200px] md:h-auto md:self-stretch relative">
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
          
          {/* Mobile: Content below image, Desktop: Content on left */}
          <div className="order-2 md:order-1 flex-1 flex flex-col gap-4 md:gap-5 items-start w-full">
            
            {/* Main heading */}
            <div className="flex flex-col gap-2 md:gap-4 w-full">
              <div className="font-dm-sans font-semibold text-[#41403d] text-[28px] md:text-[36px] leading-[32px] md:leading-[36px] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                <p className="mb-0">Hey mate,</p>
                <p className="mb-0">Quick one before you go.</p>
              </div>
              <div className="font-dm-sans font-semibold italic text-[#41403d] text-[28px] md:text-[36px] leading-[32px] md:leading-[36px] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                <p className="mb-0">Have you found a job yet?</p>
              </div>
            </div>

            {/* Description */}
            <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
              Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Action buttons */}
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => handleOptionSelect('yes')}
                className="h-10 w-full rounded-lg border-2 border-[#e6e6e6] px-6 py-3 flex items-center justify-center hover:border-[#41403d] transition-colors group"
              >
                <span className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px] group-hover:text-[#41403d]">
                  Yes, I've found a job
                </span>
              </button>
              
              <button
                onClick={() => handleOptionSelect('no')}
                className="h-10 w-full rounded-lg border-2 border-[#e6e6e6] px-3 py-3 flex items-center justify-center hover:border-[#41403d] transition-colors group"
              >
                <span className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px] group-hover:text-[#41403d]">
                  Not yet - I'm still looking
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
