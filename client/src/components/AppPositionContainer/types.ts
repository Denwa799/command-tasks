import {ReactNode} from 'react';

export interface IAppHorizontalContainer {
  style?: Object;
  isHorizontal?: boolean;
  isHorizontalCenter?: boolean;
  isCenter?: boolean;
  children: ReactNode;
}
