import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: THEME.MAIN_COLOR,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: SIZES.body3,
  },
  center: {
    textAlign: 'center',
  },
  disabled: {
    color: THEME.SECOND_TEXT_COLOR,
  },
});
