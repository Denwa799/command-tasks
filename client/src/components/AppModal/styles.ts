import {SIZES, THEME} from 'constants/theme';
import {Appearance, StyleSheet} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.BLACK_60_COLOR,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0.5,
  },
  modal: {
    zIndex: 1,
    top: '30%',
    left: '10%',
    position: 'absolute',
    backgroundColor:
      colorScheme === 'dark' ? THEME.BLACK_COLOR : THEME.WHITE_COLOR,
    width: '80%',
    padding: 20,
    borderRadius: SIZES.radius,
  },
  scroll: {
    top: '15%',
    maxHeight: 180,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
