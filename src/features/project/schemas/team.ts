import { z } from 'zod';

export const teamMemberSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  name: z.string(),
  nickname: z.string(),
  course: z.enum(['FULL_STACK', 'AI', 'CLOUD']),
  profileImageUrl: z.string().url(),
  state: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
