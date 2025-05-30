import { cn } from '@/utils/style';
import { TagItem } from './TagItem';

type TagListProps = {
  tags: string[];
  removeTag?: (index: number) => void;
};

export function TagList({ tags, removeTag }: TagListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', tags.length !== 0 && 'mt-2')}>
      {tags.map((tag, index) => (
        <TagItem
          key={`${tag}-${index}`}
          tag={tag}
          removeTag={removeTag && (() => removeTag(index))}
        />
      ))}
    </ul>
  );
}
