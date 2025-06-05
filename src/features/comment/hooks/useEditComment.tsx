import { COMMENT_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { CreateComment } from '../schemas';
import { editComment } from '../services';

export function useEditComment(projectId: number) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
      token,
    }: {
      commentId: number;
      content: CreateComment;
      token: string;
    }) => editComment(commentId, content, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMENT_QUERY_KEY.COMMENTS(projectId),
      });
    },
    onError: (error) => {
      console.error(error);
      alert('댓글 수정에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
