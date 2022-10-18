export type DialogType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onDelete: () => void;
  disabled: boolean;
};
