'use client';

import { useImageUploader } from '../../hooks';
import { EditProjectFormImage } from '../../schemas';
import { ImageList } from './ImageList';
import { UploadBox } from './UploadBox';

export type FormImageType = File | EditProjectFormImage;

type ImageUploaderProps = {
  name: string;
  maxImages?: number;
  disabled?: boolean;
  value: FormImageType[];
  onChange: (files: FormImageType[]) => void;
};

export function ImageUploader({
  name,
  maxImages = 5,
  disabled,
  value,
  onChange,
}: ImageUploaderProps) {
  const {
    fileInputRef,
    previews,
    handleFileInputClick,
    handleFileChange,
    removeImage,
  } = useImageUploader(value, onChange, maxImages);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-grey text-sm absolute top-9 left-0">
        * PNG, JPG, JPEG 형식, 최대 10MB, 최대 5장
      </p>
      <UploadBox
        onClick={handleFileInputClick}
        disabled={value.length >= maxImages || !!disabled}
      />
      <ImageList
        previews={previews}
        removeImage={removeImage}
        maxImages={maxImages}
      />
      <input
        ref={fileInputRef}
        id={name}
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
