'use client';

import { ArrowIcon } from '@/components/icons';
import { ROOT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';

export function AuthHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push(ROOT_PATH);
  };
  return (
    <header className="sticky top-0 flex justify-center items-center px-6 py-4 w-full h-16 border-b border-soft-grey bg-white z-40">
      <button onClick={handleBack} className="absolute left-6 cursor-pointer">
        <ArrowIcon
          width={28}
          height={28}
          fill="var(--color-dark-grey)"
          className="-rotate-90"
        />
      </button>
      <h1 className="text-xl font-semibold flex-1 text-center">
        로그인 및 회원가입
      </h1>
    </header>
  );
}
