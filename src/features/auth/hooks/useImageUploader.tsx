'use client';

import { userProfileEditFormSchema } from '@/features/user/schemas';
import { FormImageType } from '@/schemas';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * 이미지 파일 업로드를 처리하고 미리보기를 관리하는 커스텀 훅입니다.
 *
 * @param value - 현재 선택된 파일 객체 / 선택된 파일이 없는 경우 null
 * @param onChange - 파일이 변경될 때 호출되는 콜백 함수
 */
export function useImageUploader(
  value: FormImageType | null,
  onChange: (file: FormImageType | null) => void,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { setError, clearErrors } = useFormContext();

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const result = userProfileEditFormSchema.shape.profileImageUrl.safeParse({
      file,
    });
    if (!result.success) {
      const firstError = result.error.errors[0];
      setError('profileImageUrl', {
        type: 'manual',
        message: firstError.message,
      });
      return;
    }

    clearErrors('profileImageUrl');
    onChange({ file });
  };

  useEffect(() => {
    if (value) {
      let url: string;
      if (value instanceof File) {
        url = URL.createObjectURL(value);
        setPreview(url);
      } else {
        setPreview(
          value?.url ??
            (value?.file instanceof Blob
              ? URL.createObjectURL(value.file)
              : ''),
        );
      }

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value, setPreview]);

  return {
    fileInputRef,
    preview,
    handleFileInputClick,
    handleFileChange,
  };
}
