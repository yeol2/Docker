'use client';

import { MyData } from '@/features/user/schemas';
import { authAtom } from '@/store/atoms/user';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { getMe } from '../services';

export function useAuth() {
  const setAuth = useSetAtom(authAtom);

  return useMutation<MyData, Error, string>({
    mutationFn: getMe,
    onSuccess: ({ id, email, name, profileImageUrl, teamId }) => {
      setAuth({
        id,
        email,
        name,
        profileImageUrl,
        teamId,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
