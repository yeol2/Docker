'use client';

import { PlusIcon, ProfileIcon } from '@/components/icons';
import { useImageUploader } from '@/features/auth/hooks';
import { FormImageType } from '@/schemas';
import Image from 'next/image';

type ImageUploaderProps = {
  name: string;
  value: FormImageType | null;
  onChange: (file: FormImageType | null) => void;
};

export function ImageUploader({ name, value, onChange }: ImageUploaderProps) {
  const { fileInputRef, preview, handleFileInputClick, handleFileChange } =
    useImageUploader(value, onChange);

  return (
    <div className="relative self-center w-[120px] h-[120px]">
      <div
        onClick={handleFileInputClick}
        className="w-full h-full bg-light-grey rounded-full overflow-hidden flex items-end justify-center cursor-pointer"
      >
        {preview ? (
          <Image
            src={preview}
            alt="미리보기"
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        ) : (
          <ProfileIcon width={88} height={88} fill="var(--color-soft-grey)" />
        )}
      </div>
      <button
        type="button"
        onClick={handleFileInputClick}
        className="absolute bottom-0 right-1 w-[28px] h-[28px] bg-soft-grey border-2 border-white rounded-full flex items-center justify-center"
      >
        <PlusIcon width={24} height={24} fill="var(--color-white)" />
      </button>
      <input
        ref={fileInputRef}
        id={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
