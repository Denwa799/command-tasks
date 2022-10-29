import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  main: {
    color: THEME.TEXT_COLOR,
    backgroundColor: THEME.BACK_COLOR,
    height: '100%',
  },
  content: {
    flex: 1,
  },
  list: {
    height: '95%',
    flexGrow: 0,
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
});
