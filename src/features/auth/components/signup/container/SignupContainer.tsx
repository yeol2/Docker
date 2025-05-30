'use client';

import { AUTH_PATH, ROOT_PATH } from '@/constants';
import { useAuth, useSignup, useSignupForm } from '@/features/auth/hooks';
import {
  SignupData,
  SignupForm as SignupFormData,
} from '@/features/auth/schemas';
import { useUploadFileToS3 } from '@/hooks';
import { isCodeVerifiedAtom, signupTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { SignupForm } from '../form';

export function SignupContainer() {
  const router = useRouter();
  const signupToken = useAtomValue(signupTokenAtom);
  const isCodeVerified = useAtomValue(isCodeVerifiedAtom);

  const methods = useSignupForm();
  const { handleSubmit, setError } = methods;

  const { mutateAsync: getPresignedUrl, isPending: isUploadingImage } =
    useUploadFileToS3();
  const { mutateAsync: signup, isPending: isSigningUp } = useSignup();
  const { mutateAsync: getAuth, isPending: isGettingAuth } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    if (isUploadingImage || isSigningUp || isGettingAuth) {
      return;
    }

    if (!signupToken) {
      throw new Error('Signup token is not found');
    }

    if (!isCodeVerified) {
      setError('code', { message: '인증코드가 확인되지 않았습니다.' });
      return;
    }

    const { name, nickname, term, teamNumber, course } = data;
    const signupData: SignupData = {
      name,
      nickname,
      term,
      teamNumber,
      course,
      signupToken,
      role: 'TRAINEE',
      mailConsent: true,
      profileImageUrl: null,
    };

    if (data.profileImageUrl && data.profileImageUrl.file) {
      const { publicUrl } = await getPresignedUrl(data.profileImageUrl.file);
      signupData.profileImageUrl = publicUrl;
    }

    const { accessToken } = await signup(signupData);
    await getAuth(accessToken);

    router.replace(ROOT_PATH);
  };

  useEffect(() => {
    if (!signupToken) {
      alert('죄송합니다. 처음부터 다시 회원가입을 진행해주세요.');
      router.replace(AUTH_PATH.LOGIN);
    }
  }, [signupToken, router]);
  return (
    <FormProvider {...methods}>
      <form
        className="mt-12 w-full max-w-[25rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SignupForm />
      </form>
    </FormProvider>
  );
}
