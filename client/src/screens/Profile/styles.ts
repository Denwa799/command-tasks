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
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: THEME.BACK_SECOND,
  },
  userName: {
    color: THEME.TEXT_COLOR,
    fontSize: SIZES.h1,
  },
  logout: {
    position: 'absolute',
    bottom: 110,
    left: 15,
  },
  modalBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    width: '45%',
    marginTop: 20,
  },
});
