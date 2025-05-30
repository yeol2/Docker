'use client';

import { PROJECT_PATH } from '@/constants';
import { authAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useDashboard } from '../../hooks';
import { Dashboard } from './Dashboard';
import { DashboardFallback } from './DashboardFallback';

export function DashboardFetcher() {
  const router = useRouter();

  const authData = useAtomValue(authAtom);
  const { data: dashboard, isLoading } = useDashboard(authData?.teamId);

  if (!authData) {
    // 에러 throw 하고 에러바운더리로 처리
    return null;
  }

  const handleBrowseProjectsClick = () => {
    router.push(PROJECT_PATH.DETAIL(dashboard?.projectId));
  };
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      {authData.course ? (
        <>
          <div className="flex justify-between items-end w-full">
            <h2 className="text-lg font-semibold">대시보드</h2>
            <button
              className="text-sm text-blue cursor-pointer hover:underline"
              onClick={handleBrowseProjectsClick}
            >
              프로젝트 보러가기
            </button>
          </div>
          {isLoading ? (
            <DashboardFallback />
          ) : (
            <Dashboard dashboard={dashboard} />
          )}
        </>
      ) : (
        <div className="mt-9 flex flex-col items-center gap-4">
          <h3 className="text-center font-bold text-lg">
            개발자로 성장하고 싶은 당신의 꿈을
            <br />
            카카오테크 부트캠프와 함께 키워보세요
          </h3>
          <a
            className="text-blue hover:underline cursor-pointer"
            href="https://ktb.goorm.io/"
          >
            카카오테크 부트캠프 바로가기
          </a>
        </div>
      )}
    </section>
  );
}
