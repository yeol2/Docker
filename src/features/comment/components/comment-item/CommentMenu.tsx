import { ConfirmModal, ModalPortal } from '@/components';
import { DotMenuIcon, WarningIcon } from '@/components/icons';
import { AUTH_PATH } from '@/constants';
import { accessTokenAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { useParams, useRouter } from 'next/navigation';
import { RefObject, useState } from 'react';
import { useDeleteComment } from '../../hooks';
import { EditCommentModalWrapper } from '../edit-comment-modal-wrapper';

type CommentMenuProps = {
  ref: RefObject<HTMLDivElement | null>;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  commentId: number;
  commentContent: string;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export function CommentMenu({
  ref,
  menuButtonRef,
  commentId,
  commentContent,
  isMenuOpen,
  onToggleMenu,
}: CommentMenuProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const accessToken = useAtomValue(accessTokenAtom);

  const { mutate: deleteComment, isPending: isDeletingComment } =
    useDeleteComment(Number(params.id));

  const handleDeleteComment = () => {
    if (!accessToken) {
      router.push(AUTH_PATH.LOGIN);
      return;
    }

    deleteComment({ commentId, token: accessToken });
  };
  return (
    <>
      <button
        ref={menuButtonRef}
        className="cursor-pointer"
        onClick={onToggleMenu}
      >
        <DotMenuIcon width={20} height={18} />
      </button>
      {isMenuOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-full flex flex-col bg-white rounded-md shadow-md border border-light-grey"
        >
          <button
            className="px-6 py-2 border-b border-light-grey cursor-pointer hover:bg-light-grey transition-colors duration-150"
            onClick={() => setIsEditModalOpen(true)}
          >
            수정
          </button>
          <button
            className="px-6 py-2 cursor-pointer hover:bg-light-grey transition-colors duration-150"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제
          </button>
        </div>
      )}
      {isEditModalOpen && (
        <EditCommentModalWrapper
          projectId={Number(params.id)}
          commentContent={commentContent}
          commentId={commentId}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ModalPortal>
          <ConfirmModal
            buttonText="삭제"
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteComment}
            isLoading={isDeletingComment}
            destructive
          >
            <WarningIcon width={40} height={40} />
            <div className="flex flex-col items-center gap-2 mb-6">
              <h2 className="text-lg font-semibold">
                정말 댓글을 삭제하시겠습니까?
              </h2>
              <p>삭제한 댓글은 복구할 수 없습니다.</p>
            </div>
          </ConfirmModal>
        </ModalPortal>
      )}
    </>
  );
}
