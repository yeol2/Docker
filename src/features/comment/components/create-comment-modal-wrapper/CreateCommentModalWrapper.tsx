'use client';

import { ModalPortal } from '@/components';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateComment } from '../../hooks';
import { CreateComment, createCommentSchema } from '../../schemas';
import UpdateCommentModalContent from '../update-comment-modal-content/UpdateCommentModalContent';

type CreateCommentModalWrapperProps = {
  projectId: number;
  onClose: () => void;
};

export function CreateCommentModalWrapper({
  projectId,
  onClose,
}: CreateCommentModalWrapperProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);
  const methods = useForm({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(createCommentSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment(projectId);

  const onSubmit = (data: CreateComment) => {
    if (!accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    createComment(
      {
        commentData: data,
        token: accessToken,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <FormProvider {...methods}>
      <ModalPortal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UpdateCommentModalContent
            title="댓글 작성"
            onClose={onClose}
            isSubmitting={isSubmitting || isCreatingComment}
          />
        </form>
      </ModalPortal>
    </FormProvider>
  );
}
