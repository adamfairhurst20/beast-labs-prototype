import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '../Button';
type ConfirmationScreenProps = {
  email: string;
  reviewDays?: number;
  onReturnHome: () => void;
};
export function ConfirmationScreen({
  email,
  reviewDays = 3,
  onReturnHome
}: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
        <CheckCircleIcon className="w-7 h-7 text-beast-blue-dark" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-sans text-2xl leading-[35.6px] text-black font-normal">
          You're all set
        </h2>
        <p className="text-base text-grey-500 leading-relaxed">
          Your blood test results will be reviewed by our clinical team. We'll
          be in touch at <span className="text-black">{email}</span> within{' '}
          {reviewDays} days with next steps for your treatment.
        </p>
      </div>

      <Button hierarchy="secondary" leadingIcon={false} onClick={onReturnHome}>
        Return to home
      </Button>
    </div>);

}