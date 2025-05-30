import { z } from 'zod';

export const teamSchema = z.object({
  id: z.number(),
  term: z.number(),
  number: z.number(),
  projectId: z.number(),
  rank: z.number(),
  givedPumatiCount: z.number(),
  receivedPumatiCount: z.number(),
  badgeImageUrl: z.string(),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type Team = z.infer<typeof teamSchema>;
