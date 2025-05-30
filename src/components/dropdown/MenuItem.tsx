import { DropdownOption, DropdownValue } from './types';

type MenuItemProps = {
  option: DropdownOption;
  onSelect: (value: DropdownValue) => void;
};

export function MenuItem({ option, onSelect }: MenuItemProps) {
  const handleSelect = () => {
    onSelect(option.value);
  };

  return (
    <li
      key={option.value}
      className="px-4 py-3 cursor-pointer hover:bg-light-grey transition-colors duration-150 ease-in-out"
      onClick={handleSelect}
    >
      {option.label}
    </li>
  );
}
