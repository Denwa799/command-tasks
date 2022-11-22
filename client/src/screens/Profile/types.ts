export interface IModalEdit {
  name: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface IModalChangePassword {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
