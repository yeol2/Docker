import { ConfirmModal, ModalPortal } from '@/components';
import { WarningIcon } from '@/components/icons';
import { useDeleteProject } from '../../hooks';

type DeleteProjectModalContentProps = {
  projectId: number;
  onClose: () => void;
};

export function DeleteProjectModalContent({
  projectId,
  onClose,
}: DeleteProjectModalContentProps) {
  const { mutate: deleteProject } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProject(projectId);
  };
  return (
    <ModalPortal>
      <ConfirmModal
        buttonText="삭제"
        onClose={onClose}
        onConfirm={handleDeleteProject}
        destructive
      >
        <WarningIcon width={40} height={40} />
        <div className="flex flex-col items-center gap-2 mb-6">
          <h2 className="text-lg font-semibold">
            정말 프로젝트를 삭제하시겠습니까?
          </h2>
          <p>삭제한 프로젝트는 복구할 수 없습니다.</p>
        </div>
      </ConfirmModal>
    </ModalPortal>
  );
}
