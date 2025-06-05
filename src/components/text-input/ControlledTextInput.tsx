'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldWrapper } from '../form';
import { TextInput, TextInputProps } from './TextInput';

type ControlledTextInputProps = TextInputProps & {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
};

export function ControlledTextInput({
  name,
  label,
  required,
  placeholder,
  maxLength,
  disabled,
  description,
}: ControlledTextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <TextInput
            name={name}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            maxLength={maxLength}
            disabled={disabled}
            description={description}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
