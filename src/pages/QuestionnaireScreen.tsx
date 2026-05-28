import React, { useMemo, useState } from 'react';
import { useScreenInit } from '../useScreenInit.js';
import { Radio } from '../components/Radio';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { QuestionLayout } from '../components/questionnaire/QuestionLayout';
import {
  FileUploadField,
  UploadedFile } from
'../components/questionnaire/FileUploadField';
import { NewPatientResultScreen } from '../components/questionnaire/NewPatientResultScreen';
import { CreateAccountScreen } from '../components/questionnaire/CreateAccountScreen';
import { ConfirmationScreen } from '../components/questionnaire/ConfirmationScreen';
import {
  DeliveryAddress,
  DeliveryAddressScreen } from
'../components/questionnaire/DeliveryAddressScreen';
import { OrderConfirmationScreen } from '../components/questionnaire/OrderConfirmationScreen';
import { BasketAddedScreen } from '../components/questionnaire/BasketAddedScreen';
import {
  branchQuestion,
  newPatientQuestions,
  switcherQuestions,
  Question,
  CheckboxQuestion } from
'../data/questionnaireConfig';
type Branch = 'new-patient' | 'switcher';
type Answers = {
  branch?: Branch;
  // new patient
  priorSteps?: string[];
  symptomDuration?: string;
  symptoms?: string[];
  severity?: string;
  deliveryAddress?: DeliveryAddress;
  // switcher
  currentMeds?: string[];
  twoLowResults?: 'yes' | 'no';
  bloodTestFiles?: UploadedFile[];
  // shared
  email?: string;
};
type StepId =
'branch'
// new patient
| 'np-priorSteps' |
'np-symptomDuration' |
'np-symptoms' |
'np-severity' |
'np-result' |
'np-addedToBasket' |
'np-deliveryAddress' |
'np-orderConfirmation'
// switcher
| 'sw-currentMeds' |
'sw-twoLowResults' |
'sw-bloodTestFiles' |
'sw-createAccount' |
'sw-confirmation';
function getSteps(answers: Answers): StepId[] {
  if (!answers.branch) return ['branch'];
  if (answers.branch === 'new-patient') {
    return [
    'branch',
    'np-priorSteps',
    'np-symptomDuration',
    'np-symptoms',
    'np-severity',
    'np-result',
    'np-addedToBasket',
    'np-deliveryAddress',
    'np-orderConfirmation'];

  }
  // switcher
  const includesUpload = answers.twoLowResults === 'yes';
  return [
  'branch',
  'sw-currentMeds',
  'sw-twoLowResults',
  ...(includesUpload ? ['sw-bloodTestFiles'] as StepId[] : []),
  'sw-createAccount',
  'sw-confirmation'];

}
/** Returns [currentQuestionIndex, totalQuestions] for the progress bar.
 *  End screens (result/account/confirmation) are treated as complete. */
function getProgress(
stepId: StepId,
branch: Branch | undefined,
answers: Answers)
: number {
  if (!branch) return 1 / 5; // showing Q1, assume new-patient denominator until they pick
  if (branch === 'new-patient') {
    const order: StepId[] = [
    'branch',
    'np-priorSteps',
    'np-symptomDuration',
    'np-symptoms',
    'np-severity'];

    if (
    stepId === 'np-result' ||
    stepId === 'np-addedToBasket' ||
    stepId === 'np-deliveryAddress' ||
    stepId === 'np-orderConfirmation')

    return 1;
    const idx = order.indexOf(stepId);
    return (idx + 1) / 5;
  }
  // switcher: denominator is 4 (or 3 if user said "No" to two low results)
  const willUpload = answers.twoLowResults === 'yes';
  const denominator = answers.twoLowResults ? willUpload ? 4 : 3 : 4;
  const order: StepId[] = [
  'branch',
  'sw-currentMeds',
  'sw-twoLowResults',
  ...(willUpload ? ['sw-bloodTestFiles'] as StepId[] : [])];

  if (stepId === 'sw-createAccount' || stepId === 'sw-confirmation') return 1;
  const idx = order.indexOf(stepId);
  return (idx + 1) / denominator;
}
export function QuestionnaireScreen() {
  const screenInit = useScreenInit();
  const [answers, setAnswers] = useState<Answers>(screenInit?.answers ?? {});
  const [stepIndex, setStepIndex] = useState<number>(screenInit?.stepIndex ?? 0);
  const steps = useMemo(() => getSteps(answers), [answers]);
  const currentStep: StepId = steps[stepIndex] ?? 'branch';
  const progress = getProgress(currentStep, answers.branch, answers);
  const goNext = () => {
    const nextSteps = getSteps(answers);
    setStepIndex(Math.min(nextSteps.length - 1, stepIndex + 1));
  };
  const goBack = () => setStepIndex(Math.max(0, stepIndex - 1));
  const updateAnswers = (patch: Partial<Answers>) => {
    setAnswers((prev) => ({
      ...prev,
      ...patch
    }));
  };
  // ----- Render helpers -----
  const renderRadio = (
  q: Question,
  value: string | undefined,
  onChange: (v: string) => void) =>
  {
    if (q.type !== 'radio') return null;
    return (
      <div className="flex flex-col gap-8">
        {q.options.map((option) =>
        <Radio
          key={option.value}
          name={q.id}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange(option.value)} />

        )}
      </div>);

  };
  const renderCheckbox = (
  q: CheckboxQuestion,
  selected: string[] | undefined,
  onChange: (values: string[]) => void) =>
  {
    const current = selected ?? [];
    const toggle = (val: string) => {
      const option = q.options.find((o) => o.value === val);
      const isExclusive = option?.exclusive;
      let next: string[];
      if (current.includes(val)) {
        next = current.filter((v) => v !== val);
      } else if (isExclusive) {
        next = [val];
      } else {
        // adding a non-exclusive option: strip any exclusive ones
        const stripped = current.filter(
          (v) => !q.options.find((o) => o.value === v)?.exclusive
        );
        next = [...stripped, val];
      }
      onChange(next);
    };
    return (
      <div className="flex flex-col gap-6">
        {q.options.map((option) =>
        <Checkbox
          key={option.value}
          name={q.id}
          value={option.value}
          label={option.label}
          checked={current.includes(option.value)}
          onChange={() => toggle(option.value)} />

        )}
      </div>);

  };
  // ----- Validation per step -----
  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 'branch':
        return Boolean(answers.branch);
      case 'np-priorSteps':
        return (answers.priorSteps?.length ?? 0) >= 1;
      case 'np-symptomDuration':
        return Boolean(answers.symptomDuration);
      case 'np-symptoms':
        return (answers.symptoms?.length ?? 0) >= 1;
      case 'np-severity':
        return Boolean(answers.severity);
      case 'np-deliveryAddress':
        return Boolean(answers.deliveryAddress);
      case 'sw-currentMeds':
        return (answers.currentMeds?.length ?? 0) >= 1;
      case 'sw-twoLowResults':
        return Boolean(answers.twoLowResults);
      case 'sw-bloodTestFiles':
        return (answers.bloodTestFiles?.length ?? 0) === 2;
      default:
        return true;
    }
  };
  const continueAction =
  <Button
    hierarchy="primary"
    leadingIcon={false}
    disabled={!isCurrentStepValid()}
    onClick={goNext}>
    
      Continue
    </Button>;

  // ----- Step rendering -----
  if (currentStep === 'branch') {
    return (
      <QuestionLayout
        progress={progress}
        showBack={false}
        question={branchQuestion.question}
        hint={branchQuestion.hint}
        actions={continueAction}>
        
        {renderRadio(branchQuestion, answers.branch, (v) =>
        updateAnswers({
          branch: v as Branch
        })
        )}
      </QuestionLayout>);

  }
  // -------- NEW PATIENT BRANCH --------
  if (currentStep === 'np-priorSteps') {
    const q = newPatientQuestions[0] as CheckboxQuestion;
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderCheckbox(q, answers.priorSteps, (v) =>
        updateAnswers({
          priorSteps: v
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'np-symptomDuration') {
    const q = newPatientQuestions[1];
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderRadio(q, answers.symptomDuration, (v) =>
        updateAnswers({
          symptomDuration: v
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'np-symptoms') {
    const q = newPatientQuestions[2] as CheckboxQuestion;
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderCheckbox(q, answers.symptoms, (v) =>
        updateAnswers({
          symptoms: v
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'np-severity') {
    const q = newPatientQuestions[3];
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderRadio(q, answers.severity, (v) =>
        updateAnswers({
          severity: v
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'np-result') {
    return (
      <QuestionLayout progress={progress} onBack={goBack}>
        <NewPatientResultScreen
          symptoms={answers.symptoms ?? []}
          symptomDuration={answers.symptomDuration ?? ''}
          severity={answers.severity ?? ''}
          onAddToBasket={goNext}
          onLearnMore={() => console.log('Learn more')} />
        
      </QuestionLayout>);

  }
  if (currentStep === 'np-addedToBasket') {
    return (
      <QuestionLayout progress={progress} showBack={false}>
        <BasketAddedScreen onComplete={goNext} />
      </QuestionLayout>);

  }
  if (currentStep === 'np-deliveryAddress') {
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question="Where should we send your blood test kit?"
        actions={continueAction}>
        
        <DeliveryAddressScreen
          value={answers.deliveryAddress}
          onChange={(addr) =>
          updateAnswers({
            deliveryAddress: addr
          })
          } />
        
      </QuestionLayout>);

  }
  if (currentStep === 'np-orderConfirmation') {
    return (
      <QuestionLayout progress={progress} showBack={false}>
        <OrderConfirmationScreen
          email={answers.email}
          address={answers.deliveryAddress}
          onReturnHome={() => {
            setAnswers({});
            setStepIndex(0);
          }} />
        
      </QuestionLayout>);

  }
  // -------- SWITCHER BRANCH --------
  if (currentStep === 'sw-currentMeds') {
    const q = switcherQuestions[0] as CheckboxQuestion;
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderCheckbox(q, answers.currentMeds, (v) =>
        updateAnswers({
          currentMeds: v
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'sw-twoLowResults') {
    const q = switcherQuestions[1];
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        {renderRadio(q, answers.twoLowResults, (v) =>
        updateAnswers({
          twoLowResults: v as 'yes' | 'no'
        })
        )}
      </QuestionLayout>);

  }
  if (currentStep === 'sw-bloodTestFiles') {
    const q = switcherQuestions[2];
    if (q.type !== 'file-upload') return null;
    return (
      <QuestionLayout
        progress={progress}
        onBack={goBack}
        question={q.question}
        hint={q.hint}
        actions={continueAction}>
        
        <FileUploadField
          files={answers.bloodTestFiles ?? []}
          onChange={(files) =>
          updateAnswers({
            bloodTestFiles: files
          })
          }
          acceptedTypes={q.acceptedTypes}
          maxFileSizeMB={q.maxFileSizeMB}
          exactFileCount={q.exactFileCount} />
        
      </QuestionLayout>);

  }
  if (currentStep === 'sw-createAccount') {
    return (
      <QuestionLayout progress={progress} onBack={goBack}>
        <CreateAccountScreen
          initialEmail={answers.email}
          onSubmit={(email) => {
            updateAnswers({
              email
            });
            // advance to confirmation
            const nextSteps = getSteps({
              ...answers,
              email
            });
            setStepIndex(nextSteps.indexOf('sw-confirmation'));
          }} />
        
      </QuestionLayout>);

  }
  if (currentStep === 'sw-confirmation') {
    return (
      <QuestionLayout progress={progress} showBack={false}>
        <ConfirmationScreen
          email={answers.email ?? ''}
          reviewDays={3}
          onReturnHome={() => {
            setAnswers({});
            setStepIndex(0);
          }} />
        
      </QuestionLayout>);

  }
  return null;
}