import {ReactNode} from 'react';

export type AppDialogType = {
  children: ReactNode;
  style?: Object;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export type DialogChildrenType = {
  children: ReactNode;
};

export type DialogButtonType = {
  title: string;
  styleContainer?: Object;
  onPress: () => void;
  disabled?: boolean;
};
