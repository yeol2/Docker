import { getProjectData } from '@/app/(header)/projects/[id]/page';
import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { getComments } from '@/features/comment/services';
import { getQueryClient } from '@/libs/tanstack-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { ProjectDetailContainer } from '../project-detail-container';

type ProjectDetailFetcherProps = {
  id: string;
};

export async function ProjectDetailFetcher({ id }: ProjectDetailFetcherProps) {
  const project = await getProjectData(id);
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENTS(Number(id)),
    queryFn: ({ pageParam }) =>
      getComments(Number(id), pageParam.nextCursorTime, pageParam.nextCursorId),
    staleTime: 1000 * 60,
    initialPageParam: {
      nextCursorId: 0,
      nextCursorTime: null,
    },
  });

  if (!project) {
    notFound();
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetailContainer project={project} />
    </HydrationBoundary>
  );
}
