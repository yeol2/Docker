'use client';

import { Button, Textarea, TextInput } from '@/components';
import { PROJECT_PATH, STORAGE_KEY } from '@/constants';
import { useMultiFilesToS3 } from '@/hooks';
import { authAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateProject } from '../../hooks';
import { NewProjectForm, newProjectFormSchema } from '../../schemas';
import { ImageUploader } from '../image-uploader';
import { TagInput } from '../tag';

export function CreateForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useAtomValue(authAtom);

  const methods = useForm<NewProjectForm>({
    defaultValues: {
      images: [],
      title: '',
      introduction: '',
      deploymentUrl: '',
      githubUrl: '',
      detailedDescription: '',
      tags: [],
    },
    resolver: zodResolver(newProjectFormSchema),
  });
  const { reset } = methods;

  const { mutateAsync: uploadMultiFilesToS3 } = useMultiFilesToS3();
  const { mutate: createProject } = useCreateProject();

  const onSubmit = async (data: NewProjectForm) => {
    if (!auth?.teamId) {
      alert('팀 정보가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    const { urls } = await uploadMultiFilesToS3(
      data.images.map((image) => image.file),
    );
    const images = urls.map(({ publicUrl }, index) => ({
      url: publicUrl,
      sequence: index + 1,
    }));

    createProject(
      {
        ...data,
        images,
        teamId: auth.teamId,
      },
      {
        onSuccess: ({ id }) => {
          router.replace(PROJECT_PATH.DETAIL(id.toString()));
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      reset(JSON.parse(saved));
    }
  }, [reset]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      delete value.images;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [methods]);
  return (
    <FormProvider {...methods}>
      <form
        className="mt-9 mb-25 w-full max-w-[25rem]"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ImageUploader
          name="images"
          label="프로젝트 이미지"
          required
          maxImages={5}
          disabled={isSubmitting}
        />
        <TextInput
          name="title"
          label="프로젝트 이름"
          required
          placeholder="프로젝트 이름을 입력해주세요."
          disabled={isSubmitting}
        />
        <TextInput
          name="introduction"
          label="한 줄 소개"
          required
          placeholder="간단한 설명을 입력해주세요."
          disabled={isSubmitting}
        />
        <TextInput
          name="deploymentUrl"
          label="배포 링크"
          required
          placeholder="배포된 프로젝트의 URL을 입력해주세요. (https://~)"
          disabled={isSubmitting}
        />
        <TextInput
          name="githubUrl"
          label="GitHub 링크"
          required
          placeholder="GitHub 링크를 입력해주세요. (https://~)"
          disabled={isSubmitting}
          description="예시: https://github.com/orgs/100-hours-a-week/teams/8"
        />
        <Textarea
          name="detailedDescription"
          label="상세 설명"
          required
          placeholder="목적, 기능, 개발 과정 등을 상세하게 작성해주세요! (마크다운은 지원하지 않습니다)"
          rows={6}
          disabled={isSubmitting}
        />
        <TagInput
          name="tags"
          label="태그"
          required
          maxTags={5}
          disabled={isSubmitting}
        />
        <Button type="submit" className="mt-3" isLoading={isSubmitting}>
          생성하기
        </Button>
      </form>
    </FormProvider>
  );
}
