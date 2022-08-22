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
    borderRadius: SIZES.radius,
    backgroundColor: THEME.BACK_SECOND,
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    paddingLeft: 10,
    fontSize: SIZES.body3,
    color: THEME.TEXT_COLOR,
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
