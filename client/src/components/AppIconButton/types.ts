import {ReactNode} from 'react';

export interface IAppIconButton {
  onPress: () => void;
  colors?: [string, string];
  style?: Object;
  textStyle?: Object;
  children?: ReactNode;
  size?: number;
}
