import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Question } from '../Question';
type QuestionLayoutProps = {
  /** Progress bar fill, 0-1. */
  progress: number;
  /** Show the back button (default true). */
  showBack?: boolean;
  /** Click handler for the back button. */
  onBack?: () => void;
  /** Optional question heading rendered above the content slot. */
  question?: string;
  hint?: string;
  /** Main slot — question controls or end-screen content. */
  children: ReactNode;
  /** Action buttons slot (typically Continue or end-screen CTAs). */
  actions?: ReactNode;
};
export function QuestionLayout({
  progress,
  showBack = true,
  onBack,
  question,
  hint,
  children,
  actions
}: QuestionLayoutProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full opacity-70 blur-3xl animate-gradient-blob-1"
          style={{
            width: '60vw',
            height: '60vw',
            left: '-15vw',
            bottom: '-20vw',
            background:
            'radial-gradient(circle, var(--color-blue-300) 0%, var(--color-blue-200) 40%, transparent 70%)'
          }} />
        
        <div
          className="absolute rounded-full opacity-60 blur-3xl animate-gradient-blob-2"
          style={{
            width: '55vw',
            height: '55vw',
            right: '-15vw',
            bottom: '-15vw',
            background:
            'radial-gradient(circle, var(--color-blue-300) 0%, var(--color-blue-200) 40%, transparent 70%)'
          }} />
        
        <div
          className="absolute rounded-full opacity-40 blur-3xl animate-gradient-blob-3"
          style={{
            width: '50vw',
            height: '50vw',
            left: '20vw',
            bottom: '-25vw',
            background:
            'radial-gradient(circle, var(--color-blue-200) 0%, var(--color-blue-100) 50%, transparent 75%)'
          }} />
        
      </div>

      {/* Content layer */}
      <div className="relative">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-blue-200 relative">
          <div
            className="absolute top-0 left-0 h-2 bg-grey-500 transition-all duration-500 ease-out"
            style={{
              width: `${clampedProgress * 100}%`
            }} />
          
        </div>

        {/* Back button row */}
        <div className="w-full flex justify-start pt-6 px-6 h-12">
          {showBack && onBack &&
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-grey-500 hover:text-black transition-colors">
            
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </button>
          }
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center pt-4">
          <div className="w-[640px] px-[83px]">
            {/* Logo */}
            <div className="mb-10">
              <img
                src="/86-1145.png"
                alt="Beast Labs"
                width={168}
                height={20} />
              
            </div>

            <div className="w-[474px] flex flex-col gap-10">
              {question &&
              <div className="[&_h2]:font-sans [&_h2]:text-2xl [&_h2]:leading-[35.6px] [&_h2]:font-normal">
                  <Question align="left" question={question} hint={hint} />
                </div>
              }

              {children}

              {actions}
            </div>
          </div>
        </div>
      </div>
    </div>);

}