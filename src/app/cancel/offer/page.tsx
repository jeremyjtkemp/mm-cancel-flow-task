'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CancellationService } from '@/lib/cancellation-service';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancelOfferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [downsellVariant, setDownsellVariant] = useState<'A' | 'B' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get user ID and subscription ID from URL params
  const userId = searchParams.get('userId');
  const subscriptionId = searchParams.get('subscriptionId');

  useEffect(() => {
    if (userId) {
      // Determine A/B variant for this user
      const variant = CancellationService.getDownsellVariant(userId);
      setDownsellVariant(variant);
    }
    setIsLoading(false);
  }, [userId]);

  const handleAcceptOffer = () => {
    // TODO: Process the offer acceptance with the correct variant
    console.log('User accepted offer, variant:', downsellVariant);
    // Show offer confirmation page with variant info and user context
    router.push(`/cancel/offer-confirmation?variant=${downsellVariant}&userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleDeclineOffer = () => {
    // TODO: Show usage survey before final cancellation
    console.log('User declined offer, showing usage survey');
    // Show survey to understand how they used MigrateMate with user context
    router.push(`/cancel/survey?userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleBack = () => {
    // Go back to initial cancel page
    router.push('/cancel');
  };

  const handleClose = () => {
    router.push('/'); // Back to profile page
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
            
            {/* Progress indicator - Step 1 of 3 */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-[#b5b3af] h-2 rounded-[50px] w-6" />
                <div className="bg-[#e6e6e6] h-2 rounded-[50px] w-6" />
                <div className="bg-[#e6e6e6] h-2 rounded-[50px] w-6" />
              </div>
              <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                Step 1 of 3
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
                We built this to help you land the job, this makes it a little easier.
              </div>
            </div>

            {/* Subheading */}
            <div className="font-dm-sans font-semibold text-[#62605c] text-[20px] md:text-[24px] tracking-[-1px] md:tracking-[-1.2px] leading-normal w-full">
              We've been there and we're here to help you.
            </div>

            {/* Offer card */}
            {!isLoading && downsellVariant && (
              <div className="bg-[#ebe1fe] border border-[#9a6fff] rounded-xl p-3 w-full">
                <div className="flex flex-col gap-4">
                  {/* Offer title */}
                  <div className="flex flex-col gap-2">
                    <div className="font-dm-sans font-semibold text-[#41403d] text-[24px] md:text-[28px] leading-[24px] md:leading-[27px] tracking-[-1.2px] md:tracking-[-1.4px] text-center">
                      {downsellVariant === 'A' ? (
                        <>
                          <span>Here's </span>
                          <span className="underline decoration-solid underline-offset-[6%]">50% off</span>
                          <span> until you find a job.</span>
                        </>
                      ) : (
                        <>
                          <span>Here's </span>
                          <span className="underline decoration-solid underline-offset-[6%]">$10 off</span>
                          <span> until you find a job.</span>
                        </>
                      )}
                    </div>
                    
                    {/* Pricing */}
                    <div className="flex items-end justify-center gap-2.5">
                      <div className="font-dm-sans font-semibold text-[#9a6fff] text-center">
                        {downsellVariant === 'A' ? (
                          <>
                            <span className="text-[20px] md:text-[24px] tracking-[-1px] md:tracking-[-1.2px]">$12.50</span>
                            <span className="text-[16px] md:text-[20px] tracking-[-0.8px] md:tracking-[-1px]">/month</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[20px] md:text-[24px] tracking-[-1px] md:tracking-[-1.2px]">$15</span>
                            <span className="text-[16px] md:text-[20px] tracking-[-0.8px] md:tracking-[-1px]">/month</span>
                          </>
                        )}
                      </div>
                      <div className="font-dm-sans font-normal text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] line-through">
                        {downsellVariant === 'A' ? '$25 /month' : '$25 /month'}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={handleAcceptOffer}
                      className="bg-[#4abf71] h-10 w-full rounded-lg px-6 py-3 flex items-center justify-center hover:bg-[#3da85f] transition-colors"
                    >
                      <span className="font-dm-sans font-semibold text-white text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                        {downsellVariant === 'A' ? 'Get 50% off' : 'Get $10 off'}
                      </span>
                    </button>
                    <div className="font-dm-sans font-normal italic text-[#62605c] text-[12px] tracking-[-0.6px] text-center">
                      You wont be charged until your next billing date.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="bg-[#ebe1fe] border border-[#9a6fff] rounded-xl p-3 w-full">
                <div className="flex flex-col gap-4 items-center">
                  <div className="font-dm-sans font-semibold text-[#41403d] text-[24px] md:text-[28px] leading-[24px] md:leading-[27px] tracking-[-1.2px] md:tracking-[-1.4px] text-center">
                    Loading offer...
                  </div>
                </div>
              </div>
            )}

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* No thanks button */}
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={handleDeclineOffer}
                className="h-10 w-full rounded-lg border-2 border-[#e6e6e6] px-3 py-3 flex items-center justify-center hover:border-[#62605c] transition-colors group"
              >
                <span className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px] group-hover:text-[#41403d]">
                  No thanks
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
