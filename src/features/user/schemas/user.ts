import { signupFormSchema } from '@/features/auth/schemas';
import { editImageFormSchema } from '@/schemas';
import { z } from 'zod';

export const authDataSchema = z.object({
  id: z.number(),
  teamId: z.number().nullable(),
  term: z.number().nullable(),
  teamNumber: z.number().nullable(),
  email: z.string().email(),
  name: z.string(),
  nickname: z.string(),
  course: z.enum(['FULL_STACK', 'AI', 'CLOUD']).nullable(),
  profileImageUrl: z.string().url(),
  role: z.enum(['USER', 'ADMIN', 'TRAINEE']),
  state: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
  isSocial: z.boolean(),
  emailOptInAt: z.string().datetime().nullable(),
  emailOptOutAt: z.string().datetime().nullable(),
});

export type AuthData = z.infer<typeof authDataSchema>;

export const userProfileEditFormSchema = signupFormSchema
  .omit({ code: true })
  .extend({
    profileImageUrl: editImageFormSchema,
  });

export type UserProfileEditForm = z.infer<typeof userProfileEditFormSchema>;

export const userProfileEditDataSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  term: z.number().nullable(),
  teamNumber: z.number().nullable(),
  course: z.string().nullable(),
  profileImageUrl: z.string().url().nullable(),
  mailConsent: z.boolean(),
});

export type UserProfileEditData = z.infer<typeof userProfileEditDataSchema>;
