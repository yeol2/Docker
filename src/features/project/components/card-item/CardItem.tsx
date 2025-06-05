'use client';

import { PROJECT_PATH } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProjectItem } from '../../schemas';
import { TagList } from '../tag';

type CardItemProps = {
  project: ProjectItem;
};

export function CardItem({ project }: CardItemProps) {
  const { id, representativeImageUrl, title, introduction, tags, teamNumber } =
    project;
  const router = useRouter();

  const handleClick = () => {
    router.push(PROJECT_PATH.DETAIL(id.toString()));
  };
  return (
    <li
      className="flex flex-col rounded-lg overflow-hidden shadow-lg group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
        <Image
          src={representativeImageUrl}
          alt={title}
          fill
          sizes="100%"
          className="object-contain group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <div className="px-4 pt-2 pb-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold text-lg truncate">{title}</h3>
          <p className="ml-4 text-dark-grey text-sm font-semibold shrink-0">
            {teamNumber}팀
          </p>
        </div>
        <p className="mt-1 text-sm xs:text-[15px] text-dark-grey line-clamp-2 whitespace-pre-wrap break-words">
          {introduction}
        </p>
        <div className="max-h-[76px] overflow-hidden">
          <TagList tags={tags.map((tag) => tag.content)} />
        </div>
      </div>
    </li>
  );
}
