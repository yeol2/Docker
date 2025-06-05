import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { z } from 'zod';

export const tagSchema = z
  .string()
  .min(2, '태그는 2~20자 이내로 입력해주세요.')
  .max(20, '태그는 2~20자 이내로 입력해주세요.')
  .regex(/^\S+$/, { message: '태그는 공백을 포함할 수 없습니다.' })
  .regex(/^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/, {
    message: '태그는 특수문자를 포함할 수 없습니다.',
  });

export const imageSchema = z.object({
  file: z
    .instanceof(File, { message: '이미지를 업로드해 주세요.' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      '이미지 용량은 최대 10MB 까지 가능합니다.',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      '지원하지 않는 이미지 형식입니다.',
    ),
});

export const newProjectFormSchema = z.object({
  title: z
    .string()
    .min(1, '프로젝트 이름을 입력해주세요.')
    .min(2, '이름은 2~20자 이내로 입력해주세요.')
    .max(20, '이름은 2~20자 이내로 입력해주세요.')
    .regex(/^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/, {
      message: '이름은 특수문자를 포함할 수 없습니다.',
    }),
  introduction: z
    .string()
    .min(1, '한 줄 소개를 입력해주세요.')
    .max(150, '한 줄 소개는 150자 이내로 입력해주세요.'),
  deploymentUrl: z
    .string()
    .url('올바른 형식의 링크를 입력해주세요.')
    .min(1, '프로젝트 배포 링크를 입력해주세요.')
    .max(200, '링크는 200자 이내로 입력해주세요.'),
  githubUrl: z
    .string()
    .url('올바른 형식의 링크를 입력해주세요.')
    .min(1, '프로젝트 GitHub 링크를 입력해주세요.')
    .max(200, '링크는 200자 이내로 입력해주세요.'),
  images: z
    .array(
      z.object({
        file: z
          .instanceof(File, { message: '이미지를 업로드해 주세요.' })
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: '이미지 용량은 최대 10MB 까지 가능합니다.',
          })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: '지원하지 않는 이미지 형식입니다.',
          }),
      }),
    )
    .min(1, '프로젝트 이미지를 1장 이상 업로드해 주세요.')
    .max(5, '프로젝트 이미지는 최대 5장까지 업로드 가능합니다.'),
  detailedDescription: z
    .string()
    .min(1, { message: '프로젝트 상세 설명을 입력해주세요.' })
    .max(1000, '최대 1000자까지 입력 가능합니다.'),
  tags: z.array(tagSchema).min(1, { message: '태그를 입력해주세요.' }),
});

export type NewProjectForm = z.infer<typeof newProjectFormSchema>;

const editProjectFormImageSchema = z
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
  .refine(
    (data) => data.url || data.file,
    '이미지 URL 또는 파일이 필요합니다.',
  );

export type EditProjectFormImage = z.infer<typeof editProjectFormImageSchema>;

export const editProjectFormSchema = newProjectFormSchema.extend({
  images: z
    .array(editProjectFormImageSchema)
    .min(1, '프로젝트 이미지를 1장 이상 업로드해 주세요.')
    .max(5, '프로젝트 이미지는 최대 5장까지 업로드 가능합니다.'),
});

export type EditProjectForm = z.infer<typeof editProjectFormSchema>;

const projectImageSchema = z.object({
  url: z.string().url(),
  sequence: z.number().int().positive(),
});

export const newProjectSchema = z.object({
  title: z.string(),
  introduction: z.string(),
  detailedDescription: z.string(),
  images: z.array(projectImageSchema),
  deploymentUrl: z.string(),
  githubUrl: z.string(),
  tags: z.array(z.string()),
  teamId: z.number(),
});

export type NewProject = z.infer<typeof newProjectSchema>;
