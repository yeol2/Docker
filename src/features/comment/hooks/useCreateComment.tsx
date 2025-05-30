import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { CreateComment } from '@/features/comment/schemas';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '../services';

export function useCreateComment(projectId: number) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      commentData,
      token,
    }: {
      commentData: CreateComment;
      token: string;
    }) => createComment(projectId, commentData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEY.COMMENTS(projectId),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('댓글 작성에 실패했습니다.');
    },
  });
}
