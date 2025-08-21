'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CancellationService } from '@/lib/cancellation-service';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancellationReasonsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [additionalInput, setAdditionalInput] = useState<string>('');
  const [showTextareaError, setShowTextareaError] = useState(false);
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

  const reasons = [
    'Too expensive',
    'Platform not helpful',
    'Not enough relevant jobs',
    'Decided not to move',
    'Other'
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    // Clear additional input when switching reasons
    setAdditionalInput('');
    // Hide errors when user selects a reason
    if (showError) {
      setShowError(false);
    }
    if (showTextareaError) {
      setShowTextareaError(false);
    }
  };

  const handleGetOffer = () => {
    // Last chance - route back to offer page with user context
    router.push(`/cancel/offer?userId=${userId}&subscriptionId=${subscriptionId}`);
  };

  const handleCompleteCancellation = () => {
    if (!selectedReason) {
      // Show error if no reason selected
      setShowError(true);
      return;
    }

    // Check if additional input is required and valid
    if (selectedReason === 'Platform not helpful' || selectedReason === 'Not enough relevant jobs' || selectedReason === 'Decided not to move' || selectedReason === 'Other') {
      if (additionalInput.length < 25) {
        setShowTextareaError(true);
        return;
      }
    }

    // TODO: Save cancellation reason and additional input
    console.log('Cancellation reason:', selectedReason);
    console.log('Additional input:', additionalInput);
    
    // Complete the cancellation
    router.push('/cancel/complete?type=offer_declined');
  };

  const handleBack = () => {
    // Go back to survey page with user context
    router.push(`/cancel/survey?userId=${userId}&subscriptionId=${subscriptionId}`);
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
            
            {/* Progress indicator - Step 3 of 3 */}
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
                <p className="block mb-0">What's the main</p>
                <p className="block">reason for cancelling?</p>
              </div>
              <div className="font-dm-sans font-semibold text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] w-full">
                <p className="block leading-normal">Please take a minute to let us know why:</p>
              </div>
            </div>

            {/* Error message */}
            {showError && (
              <div className="font-dm-sans font-normal text-red-600 text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] h-[19px] leading-normal w-full">
                <p className="block leading-normal">
                  To help us understand your experience, please select a reason for cancelling*
                </p>
              </div>
            )}

            {/* Radio button options */}
            <div className="flex flex-col gap-2 w-full">
              {reasons.map((reason) => {
                // Only show this reason if no selection is made OR this reason is selected
                if (selectedReason && selectedReason !== reason) {
                  return null;
                }
                
                return (
                  <div key={reason} className="w-full">
                  <button
                    onClick={() => handleReasonSelect(reason)}
                    className="flex gap-3 items-center w-full hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <div className="w-5 h-5 relative">
                      <div className={`w-full h-full rounded-full border-2 transition-colors ${
                        selectedReason === reason 
                          ? 'border-[#996EFF] bg-[#996EFF]' 
                          : 'border-[#62605c] bg-white'
                      }`}>
                        {selectedReason === reason && (
                          <div className="w-full h-full rounded-full bg-white scale-50 transform transition-transform"></div>
                        )}
                      </div>
                    </div>
                    <div className="font-dm-sans font-medium text-[#62605c] text-[16px] tracking-[-0.8px] leading-normal">
                      {reason}
                    </div>
                  </button>
                  
                  {/* Conditional input for "Too expensive" */}
                  {selectedReason === 'Too expensive' && reason === 'Too expensive' && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                        What would be the maximum you would be willing to pay?*
                      </div>
                      <div className="relative h-10 w-full rounded-lg border border-[#62605c]">
                        <input
                          type="text"
                          value={additionalInput}
                          onChange={(e) => setAdditionalInput(e.target.value)}
                          placeholder=""
                          className="h-full w-full rounded-lg border-0 bg-transparent pl-6 pr-3 focus:outline-none focus:ring-0 font-dm-sans text-[#41403d]"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px] pointer-events-none">
                          $
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditional textarea for "Platform not helpful" */}
                  {selectedReason === 'Platform not helpful' && reason === 'Platform not helpful' && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                        <p className="mb-0">
                          What can we change to make the platform more helpful?*
                        </p>
                      </div>
                      
                      {/* Error message for textarea */}
                      {showTextareaError && (
                        <div className="font-dm-sans font-normal text-red-600 text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                          Please enter at least 25 characters so we can understand your feedback*
                        </div>
                      )}
                      
                      <div className="relative h-[150px] w-full rounded-lg border border-[#62605c]">
                        <textarea
                          value={additionalInput}
                          onChange={(e) => {
                            setAdditionalInput(e.target.value);
                            // Hide error when user starts typing and reaches 25 characters
                            if (e.target.value.length >= 25 && showTextareaError) {
                              setShowTextareaError(false);
                            }
                          }}
                          className="h-full w-full rounded-lg border-0 bg-transparent p-3 resize-none focus:outline-none focus:ring-0 font-dm-sans text-[#41403d]"
                        />
                        <div className="absolute bottom-3 right-3 font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px]">
                          Min 25 characters ({additionalInput.length}/25)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditional textarea for "Not enough relevant jobs" */}
                  {selectedReason === 'Not enough relevant jobs' && reason === 'Not enough relevant jobs' && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                        <p className="mb-0">
                          In which way can we make the jobs more relevant?*
                        </p>
                      </div>
                      
                      {/* Error message for textarea */}
                      {showTextareaError && (
                        <div className="font-dm-sans font-normal text-red-600 text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                          Please enter at least 25 characters so we can understand your feedback*
                        </div>
                      )}
                      
                      <div className="relative h-[150px] w-full rounded-lg border border-[#62605c]">
                        <textarea
                          value={additionalInput}
                          onChange={(e) => {
                            setAdditionalInput(e.target.value);
                            // Hide error when user starts typing and reaches 25 characters
                            if (e.target.value.length >= 25 && showTextareaError) {
                              setShowTextareaError(false);
                            }
                          }}
                          className="h-full w-full rounded-lg border-0 bg-transparent p-3 resize-none focus:outline-none focus:ring-0 font-dm-sans text-[#41403d]"
                        />
                        <div className="absolute bottom-3 right-3 font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px]">
                          Min 25 characters ({additionalInput.length}/25)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditional textarea for "Decided not to move" */}
                  {selectedReason === 'Decided not to move' && reason === 'Decided not to move' && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                        <p className="mb-0">
                          What changed for you to decide to not move?*
                        </p>
                      </div>
                      
                      {/* Error message for textarea */}
                      {showTextareaError && (
                        <div className="font-dm-sans font-normal text-red-600 text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                          Please enter at least 25 characters so we can understand your feedback*
                        </div>
                      )}
                      
                      <div className="relative h-[150px] w-full rounded-lg border border-[#62605c]">
                        <textarea
                          value={additionalInput}
                          onChange={(e) => {
                            setAdditionalInput(e.target.value);
                            // Hide error when user starts typing and reaches 25 characters
                            if (e.target.value.length >= 25 && showTextareaError) {
                              setShowTextareaError(false);
                            }
                          }}
                          className="h-full w-full rounded-lg border-0 bg-transparent p-3 resize-none focus:outline-none focus:ring-0 font-dm-sans text-[#41403d]"
                        />
                        <div className="absolute bottom-3 right-3 font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px]">
                          Min 25 characters ({additionalInput.length}/25)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditional textarea for "Other" */}
                  {selectedReason === 'Other' && reason === 'Other' && (
                    <div className="ml-8 mt-2 flex flex-col gap-2">
                      <div className="font-dm-sans font-normal text-[#41403d] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                        <p className="mb-0">
                          What would have helped you the most?*
                        </p>
                      </div>
                      
                      {/* Error message for textarea */}
                      {showTextareaError && (
                        <div className="font-dm-sans font-normal text-red-600 text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                          Please enter at least 25 characters so we can understand your feedback*
                        </div>
                      )}
                      
                      <div className="relative h-[150px] w-full rounded-lg border border-[#62605c]">
                        <textarea
                          value={additionalInput}
                          onChange={(e) => {
                            setAdditionalInput(e.target.value);
                            // Hide error when user starts typing and reaches 25 characters
                            if (e.target.value.length >= 25 && showTextareaError) {
                              setShowTextareaError(false);
                            }
                          }}
                          className="h-full w-full rounded-lg border-0 bg-transparent p-3 resize-none focus:outline-none focus:ring-0 font-dm-sans text-[#41403d]"
                        />
                        <div className="absolute bottom-3 right-3 font-dm-sans font-normal text-[#62605c] text-[12px] tracking-[-0.6px]">
                          Min 25 characters ({additionalInput.length}/25)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Action buttons */}
            <div className="flex flex-col gap-4 w-full">
              {/* Get offer button - last chance, variant specific */}
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

              {/* Complete cancellation button - always clickable, shows error if no selection */}
              <button
                onClick={handleCompleteCancellation}
                className={`h-10 w-full rounded-lg px-3 py-3 flex items-center justify-center transition-colors ${
                  selectedReason 
                    ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                    : 'bg-[#e6e6e6] hover:bg-[#d6d6d6] cursor-pointer'
                }`}
              >
                <span className={`font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px] ${
                  selectedReason ? 'text-white' : 'text-[#b5b3af]'
                }`}>
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
