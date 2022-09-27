import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {IAppNavigationBtn} from './types';

export const AppNavigationBtn: FC<IAppNavigationBtn> = ({
  children,
  onPress,
  style,
  onNotification = false,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.3} onPress={onPress} style={style}>
      {children}
      {onNotification && <View style={styles.notification} />}
    </TouchableOpacity>
  );
};
