import { cn } from '@/utils/style';
import { type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { SpinnerIcon } from '../icons';
import { buttonVariants, iconVariants } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    disabled?: boolean;
    isLoading?: boolean;
    icon?: ReactNode;
  };

export function Button({
  variant,
  size,
  className,
  disabled,
  isLoading,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, isLoading, disabled }),
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <SpinnerIcon
          width={24}
          height={24}
          fill="var(--color-dark-grey)"
          className="animate-spin"
        />
      )}
      {!isLoading && icon && (
        <div className={cn(iconVariants({ size }))}>{icon}</div>
      )}
      {!isLoading && children}
    </button>
  );
}
