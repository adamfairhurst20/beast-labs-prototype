import React from 'react';
import { CheckCircleIcon, FlaskConicalIcon } from 'lucide-react';
import { Button } from '../Button';
import {
  symptomLabelMap,
  durationLabelMap,
  severityLabelMap } from
'../../data/questionnaireConfig';
type NewPatientResultScreenProps = {
  symptoms: string[];
  symptomDuration: string;
  severity: string;
  onAddToBasket: () => void;
  onLearnMore: () => void;
};
export function NewPatientResultScreen({
  symptoms,
  symptomDuration,
  severity,
  onAddToBasket,
  onLearnMore
}: NewPatientResultScreenProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Eligibility headline */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-blue-100 px-3 py-1 text-sm text-beast-blue-dark">
          <CheckCircleIcon className="w-4 h-4" />
          You qualify for testing
        </div>
        <h2 className="font-sans text-2xl leading-[35.6px] text-black font-normal">
          Based on your answers, we recommend starting with an at-home blood
          test.
        </h2>
      </div>

      {/* Recap */}
      <section
        aria-label="Your answers"
        className="rounded border border-grey-300 bg-white/70 backdrop-blur-sm p-4 flex flex-col gap-3">
        
        <h3 className="font-sans text-base text-black font-medium uppercase tracking-wide">
          Your answers
        </h3>
        <dl className="flex flex-col gap-3 text-sm">
          <div>
            <dt className="text-grey-500">Symptoms</dt>
            <dd className="text-black">
              {symptoms.length > 0 ?
              symptoms.map((s) => symptomLabelMap[s] ?? s).join(', ') :
              '—'}
            </dd>
          </div>
          <div>
            <dt className="text-grey-500">Duration</dt>
            <dd className="text-black">
              {durationLabelMap[symptomDuration] ?? '—'}
            </dd>
          </div>
          <div>
            <dt className="text-grey-500">Impact</dt>
            <dd className="text-black">{severityLabelMap[severity] ?? '—'}</dd>
          </div>
        </dl>
      </section>

      {/* Kit info */}
      <section
        aria-label="At-home blood test kit"
        className="rounded border-2 border-black bg-white p-5 flex flex-col gap-4">
        
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded bg-blue-100 flex-shrink-0">
            <FlaskConicalIcon className="w-6 h-6 text-beast-blue-dark" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-grey-500 uppercase tracking-wide">
              Recommended next step
            </p>
            <h3 className="font-sans text-xl text-black mt-1">
              At-home blood test kit
            </h3>
            <p className="text-2xl text-black mt-1">£30</p>
          </div>
        </div>
        <p className="text-sm text-grey-500 leading-relaxed">
          A simple finger-prick test posted to your door. Measures 4
          testosterone biomarkers our clinicians use to assess eligibility for
          TRT. Results are reviewed before any treatment is offered.
        </p>
      </section>

      {/* How it works */}
      <section aria-label="How it works" className="flex flex-col gap-4">
        <h3 className="font-sans text-base text-black font-medium uppercase tracking-wide">
          How it works
        </h3>
        <ol className="flex flex-col">
          {[
          {
            n: 1,
            title: 'At-home blood test kit',
            price: '£30',
            recommended: true,
            description:
            'A simple finger-prick test posted to your door. Measures 4 testosterone biomarkers to find out if you have low T.'
          },
          {
            n: 2,
            title: 'Enhanced blood test kit',
            price: '£50',
            description:
            'If your at-home test finds low testosterone, a full-panel blood test at one of our partner clinics near you confirms TRT is safe for you.'
          },
          {
            n: 3,
            title: 'Doctor consultation',
            price: 'Free',
            description:
            'A clinician reviews your results and chooses a treatment plan specific to you.'
          },
          {
            n: 4,
            title: 'Start treatment',
            price: 'From £100/month',
            description:
            'Your prescribed medication is delivered to your door and reviewed by your clinician on an ongoing basis.'
          }].
          map((step, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <li key={step.n} className="relative flex gap-4">
                {/* Number + connector */}
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-white text-sm text-black flex-shrink-0 z-10">
                    {step.n}
                  </div>
                  {!isLast &&
                  <div className="w-px flex-1 bg-grey-300 my-1" aria-hidden />
                  }
                </div>

                {/* Step content */}
                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-sans text-base text-black font-medium">
                        {step.title}
                      </h4>
                      {step.recommended &&
                      <span className="inline-flex items-center self-start rounded-full bg-blue-100 px-2 py-0.5 text-xs text-beast-blue-dark uppercase tracking-wide">
                          Recommended
                        </span>
                      }
                    </div>
                    <span className="text-sm text-black whitespace-nowrap font-medium">
                      {step.price}
                    </span>
                  </div>
                  <p className="text-sm text-grey-500 leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>
              </li>);

          })}
        </ol>
      </section>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button hierarchy="primary" leadingIcon={false} onClick={onAddToBasket}>
          Add to basket
        </Button>
        <Button hierarchy="secondary" leadingIcon={false} onClick={onLearnMore}>
          Learn more
        </Button>
      </div>
    </div>);

}