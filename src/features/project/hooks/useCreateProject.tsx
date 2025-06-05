import { STORAGE_KEY } from '@/constants';
import { PROJECT_QUERY_KEY } from '@/constants/query-key';
import { getQueryClient } from '@/libs/tanstack-query';
import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { NewProject } from '../schemas';
import { createProject } from '../services';

export function useCreateProject() {
  const accessToken = useAtomValue(accessTokenAtom);

  const queryClient = getQueryClient();

  return useMutation<{ id: number }, Error, NewProject>({
    mutationFn: (data) => createProject(data, accessToken as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_QUERY_KEY.RANKED_PROJECTS,
      });
      sessionStorage.removeItem(STORAGE_KEY);
    },
    onError: (error) => {
      console.error(error);
      alert('프로젝트 생성에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
