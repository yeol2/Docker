import { cn } from '@/utils/style';
import { HTMLAttributes } from 'react';

interface FallbackBoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SkeletonBox({ className = '', ...props }: FallbackBoxProps) {
  return (
    <div
      className={cn('bg-soft-grey rounded-lg w-full', className)}
      {...props}
    />
  );
}
