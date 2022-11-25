import {ReactNode} from 'react';

export type AppModalType = {
  isOpen: boolean;
  isWrapperDisabled?: boolean;
  wrapperStyle?: Object;
  contentStyle?: Object;
  style?: Object;
  children: ReactNode;
  setIsOpen: (value: boolean) => void;
};

export type ModalChildrenType = {
  children: ReactNode;
};

export type ModalButtonType = {
  title: string;
  disabled?: boolean;
  styleContainer?: Object;
  onPress: () => void;
};
