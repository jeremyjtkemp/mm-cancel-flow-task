'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function OfferConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [downsellVariant, setDownsellVariant] = useState<'A' | 'B' | null>(null);

  // Get variant from URL params
  useEffect(() => {
    const variant = searchParams.get('variant') as 'A' | 'B';
    setDownsellVariant(variant);
  }, [searchParams]);

  const handleLandDreamRole = () => {
    // Close the modal and return to profile page
    router.push('/');
  };

  const handleClose = () => {
    // Close the modal and return to profile page
    router.push('/');
  };

  // Calculate next billing date (example: 30 days from now)
  const nextBillingDate = new Date();
  nextBillingDate.setDate(nextBillingDate.getDate() + 30);
  const formattedDate = nextBillingDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  // Get pricing based on variant
  const getPricing = () => {
    if (downsellVariant === 'A') {
      return { newPrice: '$12.50', oldPrice: '$25' };
    } else if (downsellVariant === 'B') {
      return { newPrice: '$15', oldPrice: '$25' };
    }
    return { newPrice: '$12.50', oldPrice: '$25' }; // Default to variant A
  };

  const pricing = getPricing();

  return (
    <div className="bg-[#f8fafc] fixed inset-0 z-50 flex items-center justify-center p-4">

      
      {/* Main modal container */}
      <div className="relative bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)] w-full max-w-[1000px] max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white flex items-center justify-between px-5 py-[18px] h-[60px] border-b border-[#e6e6e6] relative">
          {/* Mobile: Header content at top left, Desktop: Centered */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-2 md:gap-6 w-full md:w-auto">
            <div className="font-dm-sans font-semibold text-[#41403d] text-[14px] md:text-[16px] text-left md:text-center leading-normal">
              Subscription
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
          
          {/* Mobile: Image at top */}
          <div className="w-full md:hidden h-[200px] relative">
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
          
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 items-start w-full">
            
            {/* Main heading */}
            <div className="flex flex-col gap-2 md:gap-4 w-full">
              <div className="font-dm-sans font-semibold leading-[0] text-[#41403d] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                <p className="block leading-[32px] md:leading-[36px] mb-3 md:mb-5 text-[28px] md:text-[36px]">
                  Great choice, mate!
                </p>
                <p className="leading-[28px] md:leading-[36px] text-[24px] md:text-[32px] tracking-[-0.72px] md:tracking-[-0.96px]">
                  <span>You're still on the path to your dream role. </span>
                  <span className="text-[#9a6fff]">Let's make it happen together!</span>
                </p>
              </div>
            </div>

            {/* Billing details */}
            <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
              <p className="mb-0 break-words">
                You've got 30 days left on your current plan.
                <br />
                Starting from {formattedDate}, your monthly payment will be {pricing.newPrice}.
              </p>
              <p className="mb-0 text-[14px] md:text-[16px]">&nbsp;</p>
              <p className="font-normal italic text-[12px] mb-0 break-words">
                You can cancel anytime before then.
              </p>
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Action button */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-6 w-full">
                <button
                  onClick={handleLandDreamRole}
                  className="bg-[#996eff] h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center hover:bg-[#8952fc] transition-colors"
                >
                  <span className="font-dm-sans font-semibold text-white text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                    Land your dream role
                  </span>
                </button>
              </div>
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
