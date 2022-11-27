import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {IAppNavigationBtn} from './types';

export const AppNavigationBtn: FC<IAppNavigationBtn> = ({
  children,
  onNotification = false,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.3} style={style} onPress={onPress}>
      {children}
      {onNotification && <View style={styles.notification} />}
    </TouchableOpacity>
  );
};
