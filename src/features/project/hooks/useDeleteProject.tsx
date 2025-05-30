import { PROJECT_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { deleteProject } from '../services';

export function useDeleteProject() {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);

  return useMutation({
    mutationFn: (projectId: number) =>
      deleteProject(projectId, accessToken as string),
    onSuccess: () => {
      router.push(PROJECT_PATH.ROOT);
    },
    onError: (error) => {
      console.error(error);
      alert('프로젝트 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}
