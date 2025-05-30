import { METADATA } from '@/constants';
import { AUTH_QUERY_KEY } from '@/constants/query-key';
import { SignupContainer } from '@/features/auth/components';
import { getTeamList } from '@/features/auth/services';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = METADATA.SIGNUP;

export default async function SignupPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: AUTH_QUERY_KEY.TEAM_LIST,
    queryFn: getTeamList,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <section className="flex justify-center items-center gap-10 pb-12 min-h-[calc(100vh-6rem)]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SignupContainer />
      </HydrationBoundary>
    </section>
  );
}
