'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldWrapper } from '../form';
import { Textarea, TextareaProps } from './Textarea';

type ControlledTextareaProps = TextareaProps & {
  name: string;
  label?: string;
  required?: boolean;
};

export function ControlledTextarea({
  name,
  label,
  required,
  ...rest
}: ControlledTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <Textarea
            name={name}
            value={field.value}
            onChange={field.onChange}
            {...rest}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
