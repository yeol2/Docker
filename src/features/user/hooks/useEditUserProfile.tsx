'use client';

import { USER_PATH } from '@/constants';
import { useAuth } from '@/features/auth/hooks';
import { authAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { UserProfileEditData } from '../schemas';
import { editUserProfile } from '../services';

export function useEditUserProfile(token: string) {
  const router = useRouter();

  const setAuthData = useSetAtom(authAtom);

  const { mutateAsync: getMe } = useAuth();

  return useMutation({
    mutationFn: (data: UserProfileEditData) => editUserProfile(token, data),
    onSuccess: async () => {
      const user = await getMe(token);

      setAuthData(user);
      router.push(USER_PATH.MY_PAGE);
    },
    onError: (error) => {
      console.error(error);
      alert('회원정보 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
