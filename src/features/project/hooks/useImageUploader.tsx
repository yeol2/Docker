'use client';

import { FormImageType } from '@/schemas';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { newProjectFormSchema } from '../schemas';

export function useImageUploader<T extends FormImageType>(
  value: T[],
  onChange: (files: T[]) => void,
  maxImages: number,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const { setError, clearErrors } = useFormContext();

  const handleFileInputClick = () => {
    if (value.length >= maxImages) return;

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({ file })) as T[];
    const result = newProjectFormSchema.shape.images.safeParse(newFiles);
    if (!result.success) {
      const firstError = result.error.errors[0];
      setError('images', {
        type: 'manual',
        message: firstError.message,
      });
      return;
    }

    const currentFiles = [...value];
    const combinedFiles = [...currentFiles, ...newFiles].slice(0, maxImages);

    clearErrors('images');
    onChange(combinedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  // URL 해제에 대한 최적화 필요
  useEffect(() => {
    const newPreviews = value.map((item) => {
      if (item instanceof File) {
        return URL.createObjectURL(item);
      }
      return item?.url || URL.createObjectURL(item?.file!);
    });
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach(URL.revokeObjectURL);
    };
  }, [value, setPreviews]);

  return {
    fileInputRef,
    previews,
    handleFileInputClick,
    handleFileChange,
    removeImage,
  };
}
