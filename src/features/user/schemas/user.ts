import { z } from 'zod';

export const myDataSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  nickname: z.string(),
  course: z.string(),
  profileImageUrl: z.string().url(),
  role: z.enum(['USER', 'ADMIN']),
  state: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
  social: z.boolean(),
});

export type MyData = z.infer<typeof myDataSchema>;
