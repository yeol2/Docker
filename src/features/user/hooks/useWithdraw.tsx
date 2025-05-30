'use client';

import { ROOT_PATH } from '@/constants';
import { withdraw } from '@/features/user/services';
import { accessTokenAtom, authAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export function useWithdraw() {
  const router = useRouter();

  const setAccessToken = useSetAtom(accessTokenAtom);
  const setAuthData = useSetAtom(authAtom);

  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      setAccessToken(null);
      setAuthData(null);
      router.push(ROOT_PATH);
    },
    onError: (error) => {
      console.error(error);
      alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
