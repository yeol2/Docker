'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldWrapper } from '../form';
import { Dropdown } from './Dropdown';
import { DropdownOption } from './types';

type ControlledDropdownProps = {
  label?: string;
  name: string;
  options: DropdownOption[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

export function ControlledDropdown({
  label,
  name,
  options,
  placeholder,
  required,
  disabled,
}: ControlledDropdownProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <Dropdown
            options={options}
            placeholder={placeholder}
            selected={field.value}
            onSelect={(value) => field.onChange(value)}
            disabled={disabled}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
