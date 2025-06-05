'use client';

import { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  name,
  maxLength = 1000,
  rows = 6,
  ...props
}: TextareaProps) {
  return (
    <textarea
      id={name}
      maxLength={maxLength}
      rows={rows}
      className="w-full px-4 py-3 placeholder:text-grey rounded-md outline-none border focus:border-transparent border-grey focus:ring-2 focus:ring-blue focus:ring-offset-0 disabled:bg-blue-white"
      {...props}
    />
  );
}
