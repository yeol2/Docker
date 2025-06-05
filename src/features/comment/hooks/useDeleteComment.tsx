import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../services';

export function useDeleteComment(projectId: number) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ commentId, token }: { commentId: number; token: string }) =>
      deleteComment(commentId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEY.COMMENTS(projectId),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('댓글 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
