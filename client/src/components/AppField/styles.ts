import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    borderRadius: SIZES.radius,
    backgroundColor: THEME.BACK_SECOND,
    color: THEME.TEXT_COLOR,
    marginTop: 9,
    padding: 6,
    paddingLeft: 9,
    width: '100%',
  },
  dangerInput: {
    borderColor: THEME.DANGER_COLOR,
    borderWidth: 1,
  },
  dangerText: {
    color: THEME.DANGER_COLOR,
    fontSize: 12,
    paddingTop: 2,
  },
});
