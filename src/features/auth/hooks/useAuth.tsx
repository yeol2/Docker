'use client';

import { AuthData } from '@/features/user/schemas';
import { authAtom } from '@/store/atoms/user';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMe } from '../services';

export function useAuth() {
  const setAuth = useSetAtom(authAtom);

  return useMutation<AuthData, Error, string>({
    mutationFn: getMe,
    onSuccess: setAuth,
    onError: (error) => {
      console.error(error);
    },
  });
}
