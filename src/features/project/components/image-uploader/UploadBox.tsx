import { UploadImageIcon } from '@/components/icons';
import { cn } from '@/utils/style';

type UploadBoxProps = {
  onClick: () => void;
  disabled: boolean;
};

export function UploadBox({ onClick, disabled }: UploadBoxProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full h-32 mt-4 bg-light-grey transition-colors duration-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-soft-grey',
        disabled
          ? 'cursor-not-allowed'
          : 'hover:border-blue hover:bg-light-blue',
      )}
    >
      <UploadImageIcon width={28} height={28} fill="var(--color-soft-grey)" />
      <span className="text-blue text-sm xs:text-base">이미지 업로드</span>
    </div>
  );
}
