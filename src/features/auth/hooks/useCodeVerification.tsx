'use client';

import { isCodeVerifiedAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const VERIFICATION_CODE = process.env.NEXT_PUBLIC_KATEBOO_CODE;

export function useCodeVerification() {
  const { watch, trigger, setError } = useFormContext();
  const codeValue = watch('code', '');
  const [isVerifying, setIsVerifying] = useState(false);
  const setIsCodeVerified = useSetAtom(isCodeVerifiedAtom);

  const handleCodeVerification = async () => {
    const isValid = await trigger('code', { shouldFocus: true });

    if (!isValid) return;

    setIsVerifying(true);
    // 인증 코드 백엔드에서 검증
    if (codeValue === VERIFICATION_CODE) {
      setIsCodeVerified(true);
    } else {
      setIsCodeVerified(false);
      setError('code', { message: '잘못된 인증 코드입니다.' });
    }

    setIsVerifying(false);
  };

  return { codeValue, isVerifying, handleCodeVerification };
}
