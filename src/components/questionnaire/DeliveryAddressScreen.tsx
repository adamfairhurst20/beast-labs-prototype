import React, { useState } from 'react';
import { MapPinIcon, Loader2Icon, CheckIcon } from 'lucide-react';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
export type DeliveryAddress = {
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
};
type DeliveryAddressScreenProps = {
  value?: DeliveryAddress;
  onChange: (address: DeliveryAddress | undefined) => void;
};
// --- Mocked Google Maps Places lookup -------------------------------------
// In production this would call the Places API (e.g. via the Places Autocomplete
// + Place Details endpoints) and return real candidates. We fake it so the
// prototype demonstrates the full UX without an API key.
function mockLookup(postcode: string): Promise<DeliveryAddress[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tidy = postcode.trim().toUpperCase().replace(/\s+/g, ' ');
      resolve([
      {
        line1: '12 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      },
      {
        line1: '14 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      },
      {
        line1: '16 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      },
      {
        line1: '18 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      },
      {
        line1: 'Flat 1, 20 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      },
      {
        line1: 'Flat 2, 20 Beaumont Street',
        city: 'London',
        postcode: tidy,
        country: 'United Kingdom'
      }]
      );
    }, 600);
  });
}
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
export function DeliveryAddressScreen({
  value,
  onChange
}: DeliveryAddressScreenProps) {
  const [mode, setMode] = useState<'lookup' | 'manual'>('lookup');
  const [postcode, setPostcode] = useState(value?.postcode ?? '');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<DeliveryAddress[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualForm, setManualForm] = useState<DeliveryAddress>(
    value ?? {
      line1: '',
      line2: '',
      city: '',
      county: '',
      postcode: '',
      country: 'United Kingdom'
    }
  );
  const handleFindAddress = async () => {
    setError(null);
    if (!POSTCODE_RE.test(postcode.trim())) {
      setError('Please enter a valid UK postcode.');
      return;
    }
    setSearching(true);
    setResults(null);
    try {
      const found = await mockLookup(postcode);
      setResults(found);
    } finally {
      setSearching(false);
    }
  };
  const handleSelectAddress = (addr: DeliveryAddress) => {
    onChange(addr);
  };
  const handleEditPostcode = () => {
    setResults(null);
    onChange(undefined);
  };
  const updateManualField = (field: keyof DeliveryAddress, val: string) => {
    const next = {
      ...manualForm,
      [field]: val
    };
    setManualForm(next);
    // Sync to parent only when required fields are filled
    if (next.line1 && next.city && next.postcode) {
      onChange(next);
    } else {
      onChange(undefined);
    }
  };
  const switchMode = (next: 'lookup' | 'manual') => {
    setMode(next);
    onChange(undefined);
    setResults(null);
    setError(null);
  };
  // ----- Lookup mode -----
  if (mode === 'lookup') {
    return (
      <div className="flex flex-col gap-6">
        {/* Postcode entry */}
        {!results &&
        <>
            <TextInput
            label="Postcode"
            placeholder="e.g. SW1A 1AA"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            error={Boolean(error)}
            helperText={error ?? undefined}
            autoComplete="postal-code" />
          
            <div>
              <Button
              hierarchy="primary"
              leadingIcon={false}
              onClick={handleFindAddress}
              disabled={searching || !postcode.trim()}>
              
                {searching ?
              <span className="inline-flex items-center gap-2">
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                    Finding…
                  </span> :

              'Find address'
              }
              </Button>
            </div>
          </>
        }

        {/* Results list */}
        {results &&
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-grey-500">
                {results.length} addresses found for{' '}
                <span className="text-black">{postcode.toUpperCase()}</span>
              </p>
              <button
              type="button"
              onClick={handleEditPostcode}
              className="text-sm text-grey-500 hover:text-black underline transition-colors">
              
                Change postcode
              </button>
            </div>
            <ul className="flex flex-col rounded border border-grey-300 bg-white divide-y divide-grey-300 overflow-hidden">
              {results.map((addr, i) => {
              const isSelected =
              value?.line1 === addr.line1 &&
              value?.postcode === addr.postcode;
              return (
                <li key={i}>
                    <button
                    type="button"
                    onClick={() => handleSelectAddress(addr)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-grey-100'}`}>
                    
                      <MapPinIcon className="w-4 h-4 text-grey-500 flex-shrink-0" />
                      <span className="flex-1 text-sm text-black">
                        {addr.line1}, {addr.city}, {addr.postcode}
                      </span>
                      {isSelected &&
                    <CheckIcon className="w-4 h-4 text-beast-blue-dark flex-shrink-0" />
                    }
                    </button>
                  </li>);

            })}
            </ul>
          </div>
        }

        {/* Manual entry link */}
        <button
          type="button"
          onClick={() => switchMode('manual')}
          className="self-start text-sm text-grey-500 hover:text-black underline transition-colors">
          
          Or enter address manually
        </button>
      </div>);

  }
  // ----- Manual mode -----
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label="Address line 1"
        placeholder="Street and house number"
        value={manualForm.line1}
        onChange={(e) => updateManualField('line1', e.target.value)}
        autoComplete="address-line1"
        required />
      
      <TextInput
        label="Address line 2 (optional)"
        placeholder="Flat, suite, building"
        value={manualForm.line2 ?? ''}
        onChange={(e) => updateManualField('line2', e.target.value)}
        autoComplete="address-line2" />
      
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="City"
          value={manualForm.city}
          onChange={(e) => updateManualField('city', e.target.value)}
          autoComplete="address-level2"
          required />
        
        <TextInput
          label="County (optional)"
          value={manualForm.county ?? ''}
          onChange={(e) => updateManualField('county', e.target.value)}
          autoComplete="address-level1" />
        
      </div>
      <TextInput
        label="Postcode"
        value={manualForm.postcode}
        onChange={(e) => updateManualField('postcode', e.target.value)}
        autoComplete="postal-code"
        required />
      

      <button
        type="button"
        onClick={() => switchMode('lookup')}
        className="self-start text-sm text-grey-500 hover:text-black underline transition-colors mt-2">
        
        Or look up by postcode
      </button>
    </div>);

}