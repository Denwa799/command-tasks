import React, {FC} from 'react';
import {IAppIconButton} from './types';
import {TouchableHighlight, Text} from 'react-native';
import {styles} from './styles';
import {THEME} from 'constants/theme';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const AppIconButton: FC<IAppIconButton> = ({
  onPress,
  colors = [THEME.MAIN_COLOR, THEME.THIRD_COLOR],
  style,
  children,
  size = 34,
  textStyle,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors[1]}
      style={[{backgroundColor: colors[0]}, styles.button, style]}>
      <Text style={[styles.text, textStyle]}>
        {children ? children : <Ionicon name="add" size={size} />}
      </Text>
    </TouchableHighlight>
  );
};
