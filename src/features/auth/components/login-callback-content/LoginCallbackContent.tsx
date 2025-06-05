'use client';

import { AUTH_PATH, ROOT_PATH } from '@/constants';
import { accessTokenAtom, signupTokenAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import { LoginFallback } from '../login-fallback';

export function LoginCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const setSignupToken = useSetAtom(signupTokenAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);

  const { mutate: getAuth } = useAuth();

  useEffect(() => {
    if (message === 'additionalInfoRequired') {
      setSignupToken(searchParams.get('signupToken'));
      router.replace(AUTH_PATH.SIGN_UP);
    } else if (message === 'loginSuccess') {
      const accessToken = searchParams.get('accessToken') as string;

      setAccessToken(accessToken);
      getAuth(accessToken, {
        onSuccess: () => {
          router.replace(ROOT_PATH);
        },
      });
    } else {
      // 로그인 실패 처리 Toast
      router.push(AUTH_PATH.LOGIN);
    }
  }, [message, getAuth, router, searchParams, setAccessToken, setSignupToken]);
  return <LoginFallback />;
}
