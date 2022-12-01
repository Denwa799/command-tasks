import {ReactNode} from 'react';

export interface IAppHorizontalContainer {
  isHorizontal?: boolean;
  isHorizontalCenter?: boolean;
  isCenter?: boolean;
  isBottom?: boolean;
  style?: Object;
  children: ReactNode;
}
