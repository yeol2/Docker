'use client';

import { cn } from '@/utils/style';
import { useTagInput } from '../../hooks';
import { TagList } from './TagList';

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
};

export function TagInput({
  value,
  onChange,
  maxTags = 5,
  disabled,
}: TagInputProps) {
  const { tagValue, handleChange, handleKeyDown, removeTag } = useTagInput(
    value,
    onChange,
    maxTags,
  );

  return (
    <div className={cn('flex flex-col w-full', value.length !== 0 && 'gap-2')}>
      <p className="text-grey text-sm absolute top-9 left-0">
        * 태그는 최대 5개까지 입력할 수 있습니다.
      </p>
      <input
        type="text"
        value={tagValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력해주세요 (Enter로 추가)"
        className="px-4 py-3 mt-4 placeholder:text-grey rounded-md outline-none border focus:border-transparent border-grey focus:ring-2 focus:ring-blue focus:ring-offset-0 disabled:bg-blue-white"
        disabled={value.length >= maxTags || !!disabled}
      />
      <TagList tags={value} removeTag={removeTag} />
    </div>
  );
}
