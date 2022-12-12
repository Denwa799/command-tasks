export interface IAuthData {
  email: string;
  password: string;
  secondPassword: string;
  name: string;
}

export interface IModal {
  userEmail?: string;
  isOpen: boolean;
  isReg: boolean;
  setIsOpen: (value: boolean) => void;
  setIsReg: (value: boolean) => void;
}

export interface IRecoveryData {
  email: string;
  code: string;
}
