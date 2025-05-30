import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getRankedProjects } from '../../services';
import { ProjectsContainer } from '../projects-container';

export async function ProjectsFetcher({ contextId }: { contextId: number }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: PROJECT_QUERY_KEY.RANKED_PROJECTS,
    queryFn: () => getRankedProjects(contextId),
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsContainer contextId={contextId} />
    </HydrationBoundary>
  );
}
