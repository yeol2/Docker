'use client';

import { useIsMounted } from '@/hooks';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalPortalProps = {
  children: ReactNode;
};

export function ModalPortal({ children }: ModalPortalProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const node = document.getElementById('modal-portal') as Element;

  return createPortal(children, node);
}
