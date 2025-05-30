import { CancelIcon } from '@/components/icons';
import Image from 'next/image';

type ImageItemProps = {
  index: number;
  previews: string[];
  removeImage: (index: number) => void;
};

export function ImageItem({ index, previews, removeImage }: ImageItemProps) {
  return (
    <li className="w-1/5 min-w-20 aspect-square border border-soft-grey rounded-lg overflow-hidden relative">
      {index < previews.length ? (
        <>
          <Image
            src={previews[index]}
            alt={`프로젝트 이미지 ${index + 1}`}
            width={100}
            height={100}
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 w-5 h-5 bg-grey rounded-full flex items-center justify-center cursor-pointer"
          >
            <CancelIcon
              width={9}
              height={9}
              fill="var(--color-white)"
              stroke="var(--color-white)"
              strokeWidth="1"
            />
          </button>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-light-grey" />
      )}
    </li>
  );
}
