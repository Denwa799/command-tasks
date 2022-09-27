import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    right: -3,
    top: -3,
    backgroundColor: THEME.MAIN_COLOR,
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
  },
});
