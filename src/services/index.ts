import { PresignedUrl } from '@/schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPresignedUrl = async (file: File) => {
  try {
    const response = await fetch(`${BASE_URL}/api/pre-signed-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get presigned URL:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting presigned URL');
  }
};

export const getMultiPresignedUrl = async (files: File[]) => {
  try {
    const response = await fetch(`${BASE_URL}/api/pre-signed-urls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: files.map((file) => ({
          fileName: file.name,
          contentType: file.type,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to get presigned URL:', error);
    throw error instanceof Error
      ? error
      : new Error('An unexpected error occurred while getting presigned URL');
  }
};

export const uploadFileToS3 = async (
  presignedUrl: PresignedUrl,
  file: File,
) => {
  try {
    const response = await fetch(presignedUrl.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
        'x-amz-acl': 'public-read',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return presignedUrl.publicUrl;
  } catch (error) {
    console.error('Failed to upload file to S3:', error);
    throw error;
  }
};
