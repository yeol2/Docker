import { PresignedUrl } from '@/schemas/presigned-url';
import { getPresignedUrl, uploadFileToS3 } from '@/services';
import { useMutation } from '@tanstack/react-query';

export function useUploadFileToS3() {
  return useMutation<PresignedUrl, Error, File>({
    mutationFn: (file: File) => getPresignedUrl(file),
    onSuccess: (data, file) => uploadFileToS3(data, file),
    onError: (error) => {
      console.error(error);
    },
  });
}
