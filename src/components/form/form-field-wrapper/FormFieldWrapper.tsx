'use client';

import { useFormContext } from 'react-hook-form';

type FormFieldWrapperProps = {
  name: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormFieldWrapper({
  name,
  label,
  required,
  children,
}: FormFieldWrapperProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <article className="relative flex flex-col gap-2 pt-3 pb-7 w-full max-w-[540px]">
      {label && (
        <label className="font-medium" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {errorMessage && (
        <p className="absolute bottom-0 text-sm text-red-500">
          {String(errorMessage)}
        </p>
      )}
    </article>
  );
}
