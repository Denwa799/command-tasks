import {ReactNode} from 'react';

export type AppDialogType = {
  children: ReactNode;
  isOpen: boolean;
  style?: Object;
  setIsOpen: (value: boolean) => void;
};

export type DialogChildrenType = {
  children: ReactNode;
};

export type DialogButtonType = {
  title: string;
  disabled?: boolean;
  styleContainer?: Object;
  onPress: () => void;
};
