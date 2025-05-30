'use client';

import { ArrowIcon } from '@/components/icons';
import { COURSE, USER_PATH } from '@/constants';
import { authAtom } from '@/store';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Information() {
  const router = useRouter();
  const authData = useAtomValue(authAtom);

  if (!authData) {
    // 에러 throw 하고 에러바운더리로 처리
    return null;
  }

  const { term, teamNumber, email, name, nickname, profileImageUrl, course } =
    authData;

  const handleEditClick = () => {
    router.push(USER_PATH.MY_PAGE_EDIT);
  };
  return (
    <section className="flex flex-col gap-4 w-full mb-12">
      <h2 className="text-lg font-semibold">회원 정보</h2>
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 text-sm">
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold">
              {nickname}({name})/
              <span>{course ? COURSE[course] : '외부인'}</span>
            </p>
            <button onClick={handleEditClick} className="cursor-pointer">
              <ArrowIcon
                width={20}
                height={20}
                fill="var(--color-dark-grey)"
                className="rotate-90"
              />
            </button>
          </div>
          <p className="flex flex-wrap gap-2">
            {course && (
              <>
                <span className="text-dark-grey">
                  판교 {term}기, {teamNumber}팀
                </span>
                <span className="text-soft-grey">|</span>
              </>
            )}
            <span className="text-dark-grey whitespace-pre-wrap break-all">
              {email}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
