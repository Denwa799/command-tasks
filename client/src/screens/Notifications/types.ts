export type DialogType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onAccept: () => void;
  disabled: boolean;
};
