import {ReactNode} from 'react';

export interface IAppIconButton {
  children?: ReactNode;
  size?: number;
  colors?: [string, string];
  style?: Object;
  textStyle?: Object;
  onPress: () => void;
}
