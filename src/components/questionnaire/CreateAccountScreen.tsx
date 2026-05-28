import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
type CreateAccountScreenProps = {
  initialEmail?: string;
  onSubmit: (email: string) => void;
};
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
export function CreateAccountScreen({
  initialEmail = '',
  onSubmit
}: CreateAccountScreenProps) {
  const [email, setEmail] = useState(initialEmail);
  const [touched, setTouched] = useState(false);
  const valid = isValidEmail(email);
  const showError = touched && !valid;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (valid) onSubmit(email.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <h2 className="font-sans text-2xl leading-[35.6px] text-black font-normal">
        Create your account
      </h2>
      <p className="text-base text-grey-500 leading-relaxed">
        We'll use this to send you your results and treatment plan. Age, ID and
        delivery details are collected at checkout.
      </p>

      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={showError}
        helperText={
        showError ? 'Please enter a valid email address.' : undefined
        }
        autoComplete="email"
        required />
      

      <Button
        hierarchy="primary"
        leadingIcon={false}
        type="submit"
        disabled={!email}>
        
        Continue
      </Button>
    </form>);

}