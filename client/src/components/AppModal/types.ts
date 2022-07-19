import {ReactNode} from 'react';

export interface IAppModal {
  children: ReactNode;
  style?: Object;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
