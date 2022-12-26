import {SIZES, THEME} from 'constants/theme';
import {Appearance, StyleSheet} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.BLACK_60_COLOR,
    width: '100%',
    height: '120%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0.5,
  },
  modal: {
    zIndex: 1,
    top: '30%',
    left: '5%',
    position: 'absolute',
    backgroundColor:
      colorScheme === 'dark' ? THEME.BLACK_COLOR : THEME.WHITE_COLOR,
    width: '90%',
    borderRadius: SIZES.radius,
    maxHeight: 400,
  },
  deviceHeight685: {
    top: '28%',
    maxHeight: 380,
  },
  deviceHeight592: {
    top: '15%',
  },
  deviceHeight540: {
    maxHeight: 340,
  },
  deviceHeight480: {
    maxHeight: 250,
  },
  content: {
    padding: 20,
  },
  scroll: {
    top: '15%',
    maxHeight: 180,
    paddingTop: 0,
    paddingBottom: 0,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  button: {
    width: '45%',
  },
});
