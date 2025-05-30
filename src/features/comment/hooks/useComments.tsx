import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '../services';

export function useComments(projectId: number) {
  return useSuspenseInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY.COMMENTS(projectId),
    queryFn: ({ pageParam }) =>
      getComments(projectId, pageParam.nextCursorTime, pageParam.nextCursorId),
    initialPageParam: {
      nextCursorId: 0,
      nextCursorTime: null,
    },
    getNextPageParam: (lastPage) => {
      if (
        lastPage.meta.nextCursorId === null &&
        lastPage.meta.nextCursorTime === null
      ) {
        return null;
      }

      return {
        nextCursorId: lastPage.meta.nextCursorId,
        nextCursorTime: lastPage.meta.nextCursorTime,
      };
    },
  });
}
