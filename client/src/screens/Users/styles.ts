import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  users: {
    color: THEME.TEXT_COLOR,
    backgroundColor: THEME.BACK_COLOR,
    height: '100%',
  },
  list: {
    flexGrow: 0,
  },
  heightPercent95: {
    height: '95%',
  },
  heightPercent92: {
    height: '92%',
  },
  messageCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 350,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  logout: {
    width: '95%',
  },
});
