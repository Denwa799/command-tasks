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
