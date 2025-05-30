import { z } from 'zod';

const authorSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  nickname: z.string(),
  term: z.number().nullable(),
  course: z.enum(['FULL_STACK', 'AI', 'CLOUD']).nullable(),
  profileImageUrl: z.string().url(),
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(300, '내용은 1~300자 이내로 입력해주세요.'),
});

export type CreateComment = z.infer<typeof createCommentSchema>;

export const commentItemSchema = z.object({
  id: z.number(),
  projectId: z.number(),
  fromAi: z.boolean(),
  content: z.string(),
  author: authorSchema,
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
});

export type CommentItem = z.infer<typeof commentItemSchema>;
