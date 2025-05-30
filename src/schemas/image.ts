import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { z } from 'zod';

export const presignedUrlSchema = z.object({
  objectKey: z.string(),
  publicUrl: z.string().url(),
  uploadUrl: z.string().url(),
});

export type PresignedUrl = z.infer<typeof presignedUrlSchema>;

export const editImageFormSchema = z
  .object({
    url: z.string().url().optional(),
    file: z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        '이미지 용량은 최대 10MB 까지 가능합니다.',
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        '지원하지 않는 이미지 형식입니다.',
      )
      .optional(),
  })
  .optional();

export type EditProjectFormImage = z.infer<typeof editImageFormSchema>;

export type FormImageType = File | EditProjectFormImage;
