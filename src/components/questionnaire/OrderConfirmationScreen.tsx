import React from 'react';
import { CheckCircleIcon, PackageIcon } from 'lucide-react';
import { Button } from '../Button';
import { DeliveryAddress } from './DeliveryAddressScreen';
type OrderConfirmationScreenProps = {
  email?: string;
  address?: DeliveryAddress;
  onReturnHome: () => void;
};
export function OrderConfirmationScreen({
  email,
  address,
  onReturnHome
}: OrderConfirmationScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100">
        <CheckCircleIcon className="w-7 h-7 text-beast-blue-dark" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-sans text-2xl leading-[35.6px] text-black font-normal">
          Your kit is on its way
        </h2>
        <p className="text-base text-grey-500 leading-relaxed">
          We've received your order. Your at-home blood test kit will be
          dispatched within 1 working day.
        </p>
      </div>

      {address &&
      <section
        aria-label="Delivery address"
        className="rounded border border-grey-300 bg-white/70 backdrop-blur-sm p-4 flex items-start gap-3">
        
          <PackageIcon className="w-5 h-5 text-grey-500 flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-grey-500 uppercase tracking-wide text-xs">
              Shipping to
            </p>
            <p className="text-black">{address.line1}</p>
            {address.line2 && <p className="text-black">{address.line2}</p>}
            <p className="text-black">
              {address.city}
              {address.county ? `, ${address.county}` : ''}
            </p>
            <p className="text-black">
              {address.postcode}, {address.country}
            </p>
          </div>
        </section>
      }

      {email &&
      <p className="text-sm text-grey-500">
          A confirmation has been sent to{' '}
          <span className="text-black">{email}</span>.
        </p>
      }

      <Button hierarchy="secondary" leadingIcon={false} onClick={onReturnHome}>
        Return to home
      </Button>
    </div>);

}