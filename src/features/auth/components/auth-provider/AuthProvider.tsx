'use client';

import { SpinnerIcon } from '@/components/icons';
import { accessTokenAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { useRefresh } from '../../hooks/useRefresh';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = useSetAtom(accessTokenAtom);

  const {
    data: refreshData,
    isLoading: isRefreshing,
    isError: isRefreshError,
  } = useRefresh();
  const { mutate: getAuth, isPending: isGettingAuth } = useAuth();

  useEffect(() => {
    if (refreshData?.accessToken) {
      const accessToken = refreshData.accessToken;

      setAccessToken(accessToken);
      getAuth(accessToken, {
        onSuccess: () => {
          setIsLoading(false);
        },
      });
    }
  }, [refreshData, getAuth, setAccessToken]);

  if (isRefreshError) {
    return <>{children}</>;
  }

  if (isLoading || isRefreshing || isGettingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <SpinnerIcon
          width={32}
          height={32}
          fill="var(--color-blue)"
          className="animate-spin"
        />
      </div>
    );
  }

  return <>{children}</>;
}
