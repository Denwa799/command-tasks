import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  profile: {
    color: THEME.TEXT_COLOR,
    backgroundColor: THEME.BACK_COLOR,
    height: '100%',
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 10,
    backgroundColor: THEME.BACK_SECOND,
  },
  userName: {
    color: THEME.TEXT_COLOR,
    fontSize: SIZES.h1,
  },
  userEmail: {
    color: THEME.TEXT_COLOR,
    fontSize: SIZES.h2,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  logout: {
    width: '95%',
  },
});
