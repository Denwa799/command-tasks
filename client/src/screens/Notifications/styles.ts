import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  notifications: {
    color: THEME.TEXT_COLOR,
    backgroundColor: THEME.BACK_COLOR,
    height: '100%',
  },
  list: {
    height: '100%',
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
