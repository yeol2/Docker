import { z } from 'zod';

export const loginProviderSchema = z.enum(['kakao']);

export type LoginProvider = z.infer<typeof loginProviderSchema>;

export const authSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  profileImageUrl: z.string().url(),
  teamId: z.number(),
});

export type Auth = z.infer<typeof authSchema>;
