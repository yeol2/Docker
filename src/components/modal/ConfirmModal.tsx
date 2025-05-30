'use client';

import { useOutsideClick } from '@/hooks';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../button';

type ConfirmModalProps = {
  children: ReactNode;
  buttonText: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  destructive?: boolean;
};

export function ConfirmModal({
  children,
  buttonText,
  isLoading = false,
  onClose,
  onConfirm,
  destructive = false,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <section className="fixed top-0 left-0 w-full h-full z-50">
      <div className="relative flex justify-center items-center mx-auto max-w-[600px] w-full min-h-screen h-full backdrop-blur-xs bg-neutral-800/30">
        <div
          ref={modalRef}
          className="flex flex-col items-center gap-4 p-4 w-11/12 xs:w-4/5 bg-white rounded-lg"
        >
          {children}
          <div className="flex gap-1 w-full">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              취소
            </Button>
            <Button
              onClick={onConfirm}
              variant={destructive ? 'destructive' : 'primary'}
              isLoading={isLoading}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
