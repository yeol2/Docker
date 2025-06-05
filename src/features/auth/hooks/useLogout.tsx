'use client';

import { ROOT_PATH } from '@/constants';
import { accessTokenAtom, authAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { logout } from '../services';

export function useLogout() {
  const router = useRouter();

  const setAccessToken = useSetAtom(accessTokenAtom);
  const setAuth = useSetAtom(authAtom);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      setAuth(null);
      router.push(ROOT_PATH);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
