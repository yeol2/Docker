import { useEffect, useRef, useState } from 'react';

/**
 * 이미지 파일 업로드를 처리하고 미리보기를 관리하는 커스텀 훅입니다.
 *
 * @param value - 현재 선택된 파일 객체 / 선택된 파일이 없는 경우 null
 * @param onChange - 파일이 변경될 때 호출되는 콜백 함수
 */
export function useImageUploader(
  value: File | null,
  onChange: (file: File | null) => void,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    onChange(file);
  };

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);

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
