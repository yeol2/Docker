'use client';

import { ModalPortal } from '@/components';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useEditComment } from '../../hooks';
import { CreateComment, createCommentSchema } from '../../schemas';
import UpdateCommentModalContent from '../update-comment-modal-content/UpdateCommentModalContent';

type EditCommentModalWrapperProps = {
  projectId: number;
  commentContent: string;
  commentId: number;
  onClose: () => void;
};

export function EditCommentModalWrapper({
  projectId,
  commentContent,
  commentId,
  onClose,
}: EditCommentModalWrapperProps) {
  const router = useRouter();

  const accessToken = useAtomValue(accessTokenAtom);
  const methods = useForm({
    defaultValues: {
      content: commentContent,
    },
    resolver: zodResolver(createCommentSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: editComment, isPending: isEditingComment } =
    useEditComment(projectId);

  const onSubmit = (data: CreateComment) => {
    if (!accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    editComment(
      {
        commentId,
        content: data,
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
            title="댓글 수정"
            onClose={onClose}
            isSubmitting={isSubmitting || isEditingComment}
          />
        </form>
      </ModalPortal>
    </FormProvider>
  );
}
