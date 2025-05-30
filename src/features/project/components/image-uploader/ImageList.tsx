import { ImageItem } from './ImageItem';

type ImageListProps = {
  previews: string[];
  removeImage: (index: number) => void;
  maxImages: number;
};

export function ImageList({
  previews,
  removeImage,
  maxImages,
}: ImageListProps) {
  return (
    <ul className="flex gap-2 overflow-x-auto">
      {Array.from({ length: maxImages }).map((_, index) => (
        <ImageItem
          key={index}
          index={index}
          previews={previews}
          removeImage={removeImage}
        />
      ))}
    </ul>
  );
}
