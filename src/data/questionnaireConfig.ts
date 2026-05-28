export type QuestionOption = {
  value: string;
  label: string;
  exclusive?: boolean;
};

export type RadioQuestion = {
  id: string;
  type: 'radio';
  question: string;
  hint?: string;
  options: QuestionOption[];
};

export type CheckboxQuestion = {
  id: string;
  type: 'checkbox';
  question: string;
  hint?: string;
  options: QuestionOption[];
  minSelection?: number;
};

export type FileUploadQuestion = {
  id: string;
  type: 'file-upload';
  question: string;
  hint?: string;
  exactFileCount?: number;
  maxFileSizeMB: number;
  acceptedTypes: string[];
};

export type Question = RadioQuestion | CheckboxQuestion | FileUploadQuestion;

// === Q1: Branch root ===
export const branchQuestion: RadioQuestion = {
  id: 'branch',
  type: 'radio',
  question: 'Which best describes where you are on your testosterone journey?',
  options: [
  {
    value: 'new-patient',
    label: 'I think I might have low testosterone and want to find out'
  },
  {
    value: 'switcher',
    label:
    'I am already on TRT with another provider and want to switch to Beast Labs'
  }]

};

// === New Patient Branch ===
export const newPatientQuestions: Question[] = [
{
  id: 'priorSteps',
  type: 'checkbox',
  question:
  'Before we move on, have you taken any steps to check or learn more about your testosterone levels?',
  hint: 'Select all that apply.',
  options: [
  { value: 'blood-test', label: 'Had a blood test' },
  { value: 'gp', label: 'Spoke to my GP' },
  { value: 'research', label: 'Researched online' },
  { value: 'none', label: 'None of the above', exclusive: true }],

  minSelection: 1
},
{
  id: 'symptomDuration',
  type: 'radio',
  question: 'How long have you been experiencing symptoms?',
  options: [
  { value: '<3', label: 'Less than 3 months' },
  { value: '3-6', label: '3–6 months' },
  { value: '6-12', label: '6–12 months' },
  { value: '>12', label: 'More than 1 year' }]

},
{
  id: 'symptoms',
  type: 'checkbox',
  question: 'Which symptoms are you experiencing?',
  hint: 'Select all that apply. You must select at least one.',
  options: [
  { value: 'fatigue', label: 'Fatigue or low energy' },
  { value: 'libido', label: 'Low sex drive' },
  { value: 'mood', label: 'Low mood or irritability' },
  { value: 'muscle', label: 'Reduced muscle mass' },
  { value: 'weight', label: 'Weight gain' },
  { value: 'focus', label: 'Brain fog or poor concentration' },
  { value: 'sleep', label: 'Poor sleep' },
  { value: 'other', label: 'Other' }],

  minSelection: 1
},
{
  id: 'severity',
  type: 'radio',
  question: 'How are these symptoms affecting your daily life?',
  options: [
  {
    value: 'mild',
    label: 'Mildly — I notice them but they do not affect my routine'
  },
  {
    value: 'moderate',
    label: 'Moderately — they affect some areas of my life'
  },
  {
    value: 'significant',
    label: 'Significantly — they have a major impact on my daily life'
  }]

}];


// === Switcher Branch ===
export const switcherQuestions: Question[] = [
{
  id: 'currentMeds',
  type: 'checkbox',
  question: 'Which testosterone medication are you currently taking?',
  hint: 'Select all that apply.',
  options: [
  { value: 'cypionate', label: 'Testosterone cypionate' },
  { value: 'nebido', label: 'Nebido' },
  { value: 'sustanon', label: 'Sustanon / enanthate' },
  { value: 'gel', label: 'Testosterone gel or cream' },
  { value: 'kyzatrex', label: 'Kyzatrex' },
  { value: 'clomifene', label: 'Clomifene' },
  { value: 'hcg', label: 'HCG' },
  { value: 'other', label: 'Other' }],

  minSelection: 1
},
{
  id: 'twoLowResults',
  type: 'radio',
  question:
  'Have you had two low testosterone test results in the last 12 months?',
  options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }]

},
{
  id: 'bloodTestFiles',
  type: 'file-upload',
  question: 'Please upload your two most recent blood test results.',
  hint: 'PDF, JPG or PNG. Max 10 MB per file. Results must be from the last 12 months.',
  exactFileCount: 2,
  maxFileSizeMB: 10,
  acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png']
}];


// Helper: human-readable label lookups for the result recap screen
export const symptomLabelMap: Record<string, string> = Object.fromEntries(
  (newPatientQuestions[2] as CheckboxQuestion).options.map((o) => [
  o.value,
  o.label]
  )
);

export const durationLabelMap: Record<string, string> = Object.fromEntries(
  (newPatientQuestions[1] as RadioQuestion).options.map((o) => [
  o.value,
  o.label]
  )
);

export const severityLabelMap: Record<string, string> = Object.fromEntries(
  (newPatientQuestions[3] as RadioQuestion).options.map((o) => [
  o.value,
  o.label]
  )
);