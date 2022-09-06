import {ReactNode} from 'react';

export type AppModalType = {
  children: ReactNode;
  style?: Object;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  wrapperStyle?: Object;
  contentStyle?: Object;
};

export type ModalChildrenType = {
  children: ReactNode;
};

export type ModalButtonType = {
  title: string;
  styleContainer?: Object;
  onPress: () => void;
  disabled?: boolean;
};
