import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  profile: {
    color: THEME.TEXT_COLOR,
    backgroundColor: THEME.BACK_COLOR,
    height: '100%',
  },
  container: {
    height: '100%',
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
  logout: {
    position: 'absolute',
    bottom: 110,
    left: 15,
  },
});
