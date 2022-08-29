import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  list: {
    borderColor: THEME.BACK_COLOR,
    borderWidth: 1,
    backgroundColor: THEME.BACK_SECOND,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  item: {
    backgroundColor: THEME.BACK_SECOND,
  },
  dangerInput: {
    borderColor: THEME.DANGER_COLOR,
    borderWidth: 1,
  },
  dangerList: {
    borderRadius: SIZES.radius,
  },
  dangerText: {
    color: THEME.DANGER_COLOR,
    fontSize: 12,
    paddingTop: 2,
  },
});
