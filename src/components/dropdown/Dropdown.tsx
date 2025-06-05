'use client';

import { ArrowIcon } from '@/components/icons';
import { useRef, useState } from 'react';
import { MenuList } from './MenuList';
import { DropdownOption, DropdownValue } from './types';

type DropdownProps = {
  options: DropdownOption[];
  placeholder: string;
  selected?: DropdownValue;
  onSelect: (value: DropdownValue) => void;
  disabled?: boolean;
};

export function Dropdown({
  options = [],
  placeholder,
  selected,
  onSelect,
  disabled,
}: DropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSelect = (optionValue: DropdownValue) => {
    handleMenuToggle();
    onSelect(optionValue);
  };
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleMenuToggle}
        className="flex items-center justify-between w-full px-4 py-3 text-left border rounded-md border-grey focus:border-transparent focus:ring-2 focus:ring-blue focus:ring-offset-0 outline-none cursor-pointer disabled:bg-blue-white"
        disabled={disabled}
      >
        <p className={selectedLabel ? '' : 'text-grey'}>
          {selectedLabel || placeholder}
        </p>
        <ArrowIcon
          width={24}
          height={24}
          fill="var(--color-grey)"
          className={`${isOpen ? 'rotate-0' : 'rotate-x-180'} transition-transform duration-200 ease-in-out`}
        />
      </button>
      {isOpen && (
        <MenuList
          options={options}
          onSelect={handleSelect}
          onOutsideClick={() => setIsOpen(false)}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}
