'use client';

import { ConfirmModal, ModalPortal } from '@/components';
import { WarningIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useWithdraw } from '../../hooks';

type WithdrawModalContentProps = {
  onClose: () => void;
};

export function WithdrawModalContent({ onClose }: WithdrawModalContentProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);

  const { mutate: withdraw } = useWithdraw();

  const handleWithdraw = () => {
    if (!accessToken) {
      alert('로그인 후 탈퇴 가능합니다.');
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    withdraw(accessToken);
  };
  return (
    <ModalPortal>
      <ConfirmModal
        buttonText="탈퇴"
        onClose={onClose}
        onConfirm={handleWithdraw}
        destructive
      >
        <WarningIcon width={40} height={40} />
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold">
            정말 프로젝트를 삭제하시겠습니까?
          </h2>
          <p>삭제한 프로젝트는 복구할 수 없습니다.</p>
        </div>
      </ConfirmModal>
    </ModalPortal>
  );
}
