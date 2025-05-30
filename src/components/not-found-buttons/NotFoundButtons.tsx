'use client';

import { ROOT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';
import { Button } from '../button';

export function NotFoundButtons() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-[25rem] gap-2 mt-6">
      <Button variant="outline" onClick={() => router.replace(ROOT_PATH)}>
        홈으로
      </Button>
      <Button onClick={() => router.back()}>이전 페이지</Button>
    </div>
  );
}
