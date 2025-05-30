import { z } from 'zod';

export const presignedUrlSchema = z.object({
  objectKey: z.string(),
  publicUrl: z.string().url(),
  uploadUrl: z.string().url(),
});

export type PresignedUrl = z.infer<typeof presignedUrlSchema>;
