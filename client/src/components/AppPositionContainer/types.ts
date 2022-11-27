import {ReactNode} from 'react';

export interface IAppHorizontalContainer {
  isHorizontal?: boolean;
  isHorizontalCenter?: boolean;
  isCenter?: boolean;
  style?: Object;
  children: ReactNode;
}
