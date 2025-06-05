import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-lg text-white font-medium transition-colors duration-200 cursor-pointer hover:brightness-[0.97]',
  {
    variants: {
      variant: {
        primary: 'bg-blue',
        destructive: 'bg-red',
        outline:
          'border border-soft-grey bg-transparent hover:bg-light-grey text-black',
        kakao: 'bg-kakao text-black',
      },
      size: {
        sm: 'w-28 h-10 px-3',
        md: 'w-40 h-11 px-4 py-2',
        lg: 'w-full xs:w-[353px] h-[50px] px-6 py-3',
        full: 'w-full max-w-[540px] h-[50px] px-6 py-3',
      },
      isLoading: {
        true: 'cursor-not-allowed hover:brightness-100',
      },
      disabled: {
        true: 'bg-light-grey text-grey cursor-not-allowed hover:brightness-100',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'full',
      disabled: false,
    },
  },
);

export const iconVariants = cva('absolute top-1/2 -translate-y-1/2', {
  variants: {
    size: {
      sm: 'left-3',
      md: 'left-4',
      lg: 'left-6',
      full: 'left-6',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});
