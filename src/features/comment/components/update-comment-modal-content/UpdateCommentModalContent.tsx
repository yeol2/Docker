import { ConfirmModal, Textarea } from '@/components';

type UpdateCommentModalContentProps = {
  title: string;
  onClose: () => void;
  isSubmitting: boolean;
};

export default function UpdateCommentModalContent({
  title,
  onClose,
  isSubmitting,
}: UpdateCommentModalContentProps) {
  return (
    <ConfirmModal buttonText="완료" onClose={onClose} isLoading={isSubmitting}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <Textarea
        name="content"
        placeholder="어떤 경험을 하셨나요? 솔직한 후기를 들려주세요!"
        rows={6}
        disabled={isSubmitting}
      />
    </ConfirmModal>
  );
}
