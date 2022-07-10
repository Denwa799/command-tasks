import React, {FC} from 'react';
import {IAppButton} from './types';
import {TouchableHighlight, Text} from 'react-native';
import {styles} from './styles';
import {THEME} from 'constants/theme';

export const AppButton: FC<IAppButton> = ({
  onPress,
  title,
  colors = [THEME.MAIN_COLOR, THEME.THIRD_COLOR],
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors[1]}
      style={[{backgroundColor: colors[0]}, styles.button]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};
