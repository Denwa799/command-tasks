import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    color: THEME.WHITE_COLOR,
    borderRadius: SIZES.radiusSecond,
    width: 50,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 10,
    right: 25,
  },
  text: {
    color: THEME.WHITE_COLOR,
    textAlign: 'center',
  },
});
