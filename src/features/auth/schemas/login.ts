import { z } from 'zod';

export const loginProviderSchema = z.enum(['kakao']);

export type LoginProvider = z.infer<typeof loginProviderSchema>;
