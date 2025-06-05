import { ArrowIcon } from '@/components/icons';
import { cn } from '@/utils/style';
import { useSwiper } from 'swiper/react';

type SwipeButtonProps = {
  direction: 'left' | 'right';
};

export function SwipeButton({ direction }: SwipeButtonProps) {
  const swiper = useSwiper();

  const handleClick = () => {
    if (direction === 'left') {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  };
  return (
    <button
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-20 flex justify-center items-center p-1 rounded-full bg-grey opacity-20 hover:opacity-100 transition-all duration-200 cursor-pointer',
        direction === 'left' ? 'left-2 xs:left-4' : 'right-2 xs:right-4',
      )}
      onClick={handleClick}
    >
      <ArrowIcon
        width={32}
        height={32}
        className={direction === 'left' ? '-rotate-90' : 'rotate-90'}
        fill="var(--color-white)"
      />
    </button>
  );
}
