import { editImageFormSchema } from '@/schemas';
import { z } from 'zod';

export const signupFormSchema = z.object({
  profileImageUrl: editImageFormSchema,
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 2~10자 이내로 입력해주세요.')
    .max(10, '이름은 2~10자 이내로 입력해주세요.')
    .regex(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.'),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .min(2, '닉네임은 2~50자 이내로 입력해주세요.')
    .max(50, '닉네임은 2~50자 이내로 입력해주세요.')
    .regex(/^[a-z]+$/, '닉네임은 영어 소문자만 입력 가능합니다.'),
  code: z
    .string()
    .length(4, '인증 코드는 4자리 숫자여야 합니다.')
    .regex(/^\d{4}$/, '인증 코드는 숫자만 입력 가능합니다.'),
  term: z.number({
    required_error: '기수를 선택해주세요.',
  }),
  teamNumber: z.number({
    required_error: '팀(조)을 선택해주세요.',
  }),
  course: z.string({
    required_error: '과정명을 선택해주세요.',
  }),
});

export type SignupForm = z.infer<typeof signupFormSchema>;

export const nonTraineeSignupFormSchema = signupFormSchema.pick({
  profileImageUrl: true,
  name: true,
  nickname: true,
});

export type NonTraineeSignupForm = z.infer<typeof nonTraineeSignupFormSchema>;

export const teamListSchema = z.array(
  z.object({
    term: z.number(),
    teamNumbers: z.array(z.number()),
  }),
);

export type TeamList = z.infer<typeof teamListSchema>;

export const signupDataSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  term: z.number(),
  teamNumber: z.number(),
  course: z.string(),
  signupToken: z.string(),
  role: z.enum(['TRAINEE', 'USER']),
  mailConsent: z.boolean(),
  profileImageUrl: z.string().url().nullable(),
});

export type SignupData = z.infer<typeof signupDataSchema>;

export const nonTraineeSignupDataSchema = signupDataSchema.extend({
  term: z.number().nullable(),
  teamNumber: z.number().nullable(),
  course: z.string().nullable(),
  signupToken: z.string().nullable(),
  profileImageUrl: z.string().url().nullable(),
});

export type NonTraineeSignupData = z.infer<typeof nonTraineeSignupDataSchema>;
