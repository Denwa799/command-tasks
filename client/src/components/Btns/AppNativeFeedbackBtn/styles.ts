import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  text: {
    fontSize: SIZES.body3,
    color: THEME.TEXT_COLOR,
  },
  borderRadius: {
    borderRadius: SIZES.radius,
    paddingVertical: 10,
  },
  container: {
    paddingVertical: 10,
  },
  center: {
    textAlign: 'center',
  },
  mainColor: {
    color: THEME.MAIN_COLOR,
  },
  disabled: {
    color: THEME.SECOND_TEXT_COLOR,
  },
});
