import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {Button, View} from 'react-native';
import {IAppNativeButton} from './types';

export const AppNativeButton: FC<IAppNativeButton> = ({
  title,
  disabled,
  styleContainer,
  onPress,
}) => {
  return (
    <View style={styleContainer}>
      <Button
        title={title}
        color={THEME.MAIN_COLOR}
        disabled={disabled}
        onPress={onPress}
      />
    </View>
  );
};
