import {ReactNode} from 'react';

export interface IAppNavigationBtn {
  children: ReactNode;
  onPress: () => void;
  style?: Object;
  onNotification?: boolean;
}
