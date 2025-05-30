'use client';

import { PROJECT_PATH } from '@/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCheckProjectExists } from '../../hooks';
import { CreateForm } from '../create-form';

export function NewProjectContent() {
  const router = useRouter();
  const { data: projectExists, error } = useCheckProjectExists();

  useEffect(() => {
    if (projectExists && projectExists.exists) {
      alert('프로젝트는 팀당 한 개만 작성할 수 있습니다.');
      router.replace(PROJECT_PATH.ROOT);
      return;
    }

    if (error) {
      alert('교육생만 프로젝트를 작성할 수 있습니다.');
      router.replace(PROJECT_PATH.ROOT);
      return;
    }
  }, [projectExists, router, error]);
  return <CreateForm />;
}
