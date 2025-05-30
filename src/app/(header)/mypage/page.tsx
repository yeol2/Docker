import { DashboardFetcher, Information } from '@/features/user/components';

export default async function MyPage() {
  return (
    <>
      <h1 className="text-xl font-semibold my-9">마이페이지</h1>
      <Information />
      <div className="mb-12 w-full">
        <DashboardFetcher />
      </div>
    </>
  );
}
