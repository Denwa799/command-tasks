import {ReactNode} from 'react';

export interface IAppIconButton {
  onPress: () => void;
  colors?: [string, string];
  style?: Object;
  children?: ReactNode;
  size?: number;
}
