'use client';

import { FormFieldWrapper } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { TagInput } from './TagInput';

type ControlledTagInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  maxTags?: number;
  disabled?: boolean;
};

export function ControlledTagInput({
  name,
  label,
  required,
  maxTags = 5,
  disabled,
}: ControlledTagInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <TagInput
            value={field.value || []}
            onChange={field.onChange}
            maxTags={maxTags}
            disabled={disabled}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
