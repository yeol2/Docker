'use client';

import { useState } from 'react';
import { useCodeVerification } from '../../../hooks';
import { FirstStep } from './FirstStep';
import { SecondStep } from './SecondStep';

export function SignupForm() {
  const [step, setStep] = useState(0);
  const [isTrainee, setIsTrainee] = useState(false);

  const { codeValue, isVerifying, handleCodeVerification } =
    useCodeVerification();

  const steps = [
    <FirstStep key={0} onNext={() => setStep(1)} />,
    <SecondStep
      key={1}
      onPrev={() => setStep(0)}
      isTrainee={isTrainee}
      setIsTrainee={setIsTrainee}
      codeValue={codeValue}
      isVerifying={isVerifying}
      onCodeVerification={handleCodeVerification}
    />,
  ];
  return steps[step];
}
