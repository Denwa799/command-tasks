import {ReactNode} from 'react';

export interface IAppNavigationBtn {
  children: ReactNode;
  onNotification?: boolean;
  style?: Object;
  onPress: () => void;
}
