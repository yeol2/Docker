'use client';

import { CallToAction } from '@/components';
import { PROJECT_PATH } from '@/constants';
import { useIntersectionObserve } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../hooks';
import { CardList } from '../card-list';

type ProjectsContainerProps = {
  contextId: number;
};

export function ProjectsContainer({ contextId }: ProjectsContainerProps) {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProjects(contextId);
  const projects = data.pages.flatMap((page) => page.data);

  const ref = useIntersectionObserve({
    onIntersect: (entry, observer) => {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  return (
    <>
      <CallToAction
        text="프로젝트를 생성해보세요!"
        buttonText="생성하기"
        action={() => router.push(PROJECT_PATH.NEW)}
      />
      <CardList
        ref={ref}
        isFetchingNextPage={isFetchingNextPage}
        projects={projects}
      />
    </>
  );
}
