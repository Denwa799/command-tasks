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
  text: {
    fontSize: 12,
    paddingTop: 2,
  },
  successInput: {
    borderColor: THEME.GREEN_COLOR,
    borderWidth: 1,
  },
  warningInput: {
    borderColor: THEME.YELLOW_COLOR,
    borderWidth: 1,
  },
  dangerInput: {
    borderColor: THEME.DANGER_COLOR,
    borderWidth: 1,
  },
  successText: {
    color: THEME.GREEN_COLOR,
  },
  warningText: {
    color: THEME.YELLOW_COLOR,
  },
  dangerText: {
    color: THEME.DANGER_COLOR,
  },
});
