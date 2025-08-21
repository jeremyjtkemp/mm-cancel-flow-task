'use client';

import { useRouter, useSearchParams } from 'next/navigation';

// Empire State Building image from public folder
const imgBg = "/empire-state-compressed.jpg";

export default function CancelCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get completion type from URL params
  const completionType = searchParams.get('type'); // 'no_visa_help', 'has_visa_help', 'offer_accepted', 'offer_declined'
  const needsVisaHelp = completionType === 'has_visa_help';
  const offerAccepted = completionType === 'offer_accepted';
  const offerDeclined = completionType === 'offer_declined';

  // Calculate subscription end date (30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  const formattedEndDate = endDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleFinish = () => {
    // Return to profile page
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
              {offerAccepted ? 'Subscription Updated' : 'Subscription Cancelled'}
            </div>
            
            {/* Progress indicator - all completed */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
                <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
                <div className="bg-[#4abf71] h-2 rounded-[50px] w-6" />
              </div>
              <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                Completed
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleFinish}
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
          
          {/* Mobile: Image at top for no visa help and offer declined scenarios */}
          {(!needsVisaHelp && !offerAccepted && !offerDeclined) || offerDeclined ? (
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
          ) : null}
          
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 items-start w-full">
            
            {/* Main heading */}
            <div className="flex flex-col gap-2 md:gap-4 w-full">
              <div className="font-dm-sans font-semibold text-[#41403d] text-[28px] md:text-[36px] leading-[32px] md:leading-[36px] tracking-[-0.84px] md:tracking-[-1.08px] w-full">
                {offerAccepted ? (
                  <>
                    <p className="mb-0">Sweet! You're now getting</p>
                    <p className="mb-0">50% off until you land a job.</p>
                  </>
                ) : offerDeclined ? (
                  <>
                    <p className="mb-0">Sorry to see you go, mate.</p>
                  </>
                ) : needsVisaHelp ? (
                  <p className="mb-0">Your cancellation's all sorted, mate, no more charges.</p>
                ) : (
                  <>
                    <p className="mb-0">All done, your cancellation's</p>
                    <p className="mb-0">been processed.</p>
                  </>
                )}
              </div>
              
              {/* Additional subtitle for offer declined */}
              {offerDeclined && (
                <div className="font-dm-sans font-semibold text-[#41403d] text-[24px] md:text-[30px] leading-[28px] md:leading-[36px] tracking-[-0.72px] md:tracking-[-0.9px] w-full">
                  <p className="mb-0">Thanks for being with us, and you're always welcome back.</p>
                </div>
              )}
            </div>

            {/* Conditional content based on completion type */}
            {offerAccepted ? (
              /* Offer accepted - show discount confirmation */
              <div className="font-dm-sans font-semibold text-[#41403d] text-[18px] md:text-[20px] tracking-[-0.9px] md:tracking-[-1px] leading-normal w-full">
                You'll be charged $12.50/month starting from your next billing cycle. When you land that job, just let us know and we'll switch you back to the full plan. 🚀
              </div>
            ) : offerDeclined ? (
              /* Offer declined - show subscription end details */
              <div className="font-['Inter',sans-serif] text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal w-full">
                <p className="font-semibold mb-0">
                  Your subscription is set to end on {formattedEndDate}.
                  <br />
                  You'll still have full access until then. No further charges after that.
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="font-normal">
                  Changed your mind? You can reactivate anytime before your end date.
                </p>
              </div>
            ) : needsVisaHelp ? (
              /* Visa help offer card */
              <div className="bg-[#f6f6f6] rounded-lg p-4 w-full">
                <div className="flex gap-3 items-center mb-2">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/mihailo-profile.jpeg')` }}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="font-dm-sans font-semibold text-[#41403d] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                      Mihailo Bozic
                    </div>
                    <div className="font-dm-sans font-normal text-[#62605c] text-[12px] md:text-[14px] tracking-[-0.24px] md:tracking-[-0.28px]">
                      &lt;mihailo@migratemate.co&gt;
                    </div>
                  </div>
                </div>
                <div className="ml-[60px] font-['Inter',sans-serif] text-[#62605c] text-[14px] md:text-[16px] tracking-[-0.7px] md:tracking-[-0.8px] leading-normal">
                  <p className="font-semibold mb-0">I'll be reaching out soon to help with the visa side of things.</p>
                  <p className="mb-0">&nbsp;</p>
                  <p className="mb-0">We've got your back, whether it's questions, paperwork, or just figuring out your options.</p>
                  <p className="mb-0">&nbsp;</p>
                  <p className="font-medium">
                    Keep an eye on your inbox, I'll be in touch <span className="underline">shortly</span>.
                  </p>
                </div>
              </div>
            ) : (
              /* Congratulatory message for no visa help needed */
              <div className="font-dm-sans font-semibold text-[#41403d] text-[18px] md:text-[20px] tracking-[-0.9px] md:tracking-[-1px] leading-normal w-full">
                We're stoked to hear you've landed a job and sorted your visa. Big congrats from the team. 🙌
              </div>
            )}

            {/* Divider line */}
            <div className="w-full h-[1px] bg-[#e6e6e6]" />

            {/* Finish button */}
            <div className="flex flex-col gap-4 w-full mt-auto">
              <div className="flex flex-col gap-6 w-full">
                <button
                  onClick={handleFinish}
                  className="h-10 w-full rounded-lg px-3 py-3 bg-[#996EFF] text-white hover:bg-[#8952fc] transition-colors flex items-center justify-center"
                >
                  <span className="font-dm-sans font-semibold text-[14px] md:text-[16px] tracking-[-0.28px] md:tracking-[-0.32px]">
                    {offerDeclined ? 'Back to Jobs' : 'Finish'}
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
