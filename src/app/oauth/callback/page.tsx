'use client';

import {
  LoginCallbackContent,
  LoginFallback,
} from '@/features/auth/components';
import { Suspense } from 'react';

export default function LoginCallbackPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginCallbackContent />
    </Suspense>
  );
}
