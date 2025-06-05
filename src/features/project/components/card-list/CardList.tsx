import { SpinnerIcon } from '@/components/icons';
import { cn } from '@/utils/style';
import { RefObject } from 'react';
import { ProjectItem } from '../../schemas';
import { CardItem } from '../card-item';

type CardListProps = {
  ref: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  projects: ProjectItem[];
};

export function CardList({ ref, isFetchingNextPage, projects }: CardListProps) {
  return (
    <article className={cn('w-full', isFetchingNextPage ? 'pb-8' : 'pb-20')}>
      <ul className="flex flex-col gap-5 mb-4">
        {projects.map((project) => (
          <CardItem key={project.id} project={project} />
        ))}
      </ul>
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="flex justify-center items-center gap-2 h-12 bg-blue-white text-blue">
            <SpinnerIcon
              width={20}
              height={20}
              className="animate-spin"
              fill="var(--color-blue)"
            />
            <p>잠시만 기다려주세요...</p>
          </div>
        )}
      </div>
    </article>
  );
}
