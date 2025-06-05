import { PresignedUrl } from '@/schemas';
import { getMultiPresignedUrl, uploadFileToS3 } from '@/services';
import { useMutation } from '@tanstack/react-query';

export function useMultiFilesToS3() {
  return useMutation<{ urls: PresignedUrl[] }, Error, File[]>({
    mutationFn: (files: File[]) => getMultiPresignedUrl(files),
    onSuccess: async (data, files) => {
      try {
        const uploadPromises = data.urls.map((presignedUrl, index) =>
          uploadFileToS3(presignedUrl, files[index]),
        );
        const uploadedUrls = await Promise.all(uploadPromises);

        return uploadedUrls;
      } catch (error) {
        console.error('Failed to upload files:', error);

        throw error;
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
