import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { NewProject } from '../schemas';
import { editProject } from '../services';

export function useEditProject(projectId: number) {
  const accessToken = useAtomValue(accessTokenAtom);

  return useMutation({
    mutationFn: (data: NewProject) =>
      editProject(projectId, data, accessToken as string),
    onError: (error) => {
      console.error(error);
      alert('프로젝트 수정에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
