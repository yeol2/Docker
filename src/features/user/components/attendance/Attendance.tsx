'use client';

import { AlertModal, Button, ModalPortal } from '@/components';
import { SmallIcon } from '@/components/icons/SmallIcon';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom, isLoggedInAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAttendanceState, useCheckAttendance } from '../../hooks';

export function Attendance() {
  const router = useRouter();

  const [luckMessage, setLuckMessage] = useState('운세 생성중...');
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const accessToken = useAtomValue(accessTokenAtom);

  const { mutateAsync: checkAttendance, isPending: isCheckingAttendance } =
    useCheckAttendance();
  const { data: attendanceState } = useAttendanceState();

  const isAttendanceChecked = attendanceState?.today && isLoggedIn;

  const handleAttendance = async () => {
    if (!isLoggedIn || !accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    setIsAttendanceModalOpen(true);
    const { devLuck } = await checkAttendance(accessToken);
    setLuckMessage(devLuck.overall);
  };
  return (
    <article className="flex flex-col items-center justify-center gap-4 p-8 my-10 bg-blue-white">
      <h2 className="text-lg font-semibold">오늘의 운세</h2>
      <p className="text-center mb-4">
        하루 한 번, 출석 체크하고 <br /> 개발자의 운세도 받아가세요!
      </p>
      <Button
        size="md"
        onClick={handleAttendance}
        disabled={isAttendanceChecked}
      >
        {isAttendanceChecked ? '출석 체크 완료' : '출석 체크'}
      </Button>
      {isAttendanceModalOpen && (
        <ModalPortal>
          <AlertModal
            onClose={() => setIsAttendanceModalOpen(false)}
            buttonText="확인"
            isLoading={isCheckingAttendance}
          >
            <div className="flex flex-col items-center mt-2">
              <SmallIcon width={24} height={24} />
              <h3 className="text-lg font-semibold">오늘의 코딩 운세</h3>
            </div>
            <p className="text-center font-medium w-full break-words">
              {luckMessage}
            </p>
          </AlertModal>
        </ModalPortal>
      )}
    </article>
  );
}
