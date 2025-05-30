'use client';

import { Button } from '@/components';
import { KakaoIcon } from '@/components/icons';
import { loginWithProvider } from '../../services';

export function LoginButton() {
  return (
    <Button
      variant="kakao"
      size="lg"
      icon={<KakaoIcon width={20} height={20} />}
      onClick={() => loginWithProvider('kakao')}
    >
      카카오 로그인
    </Button>
  );
}
