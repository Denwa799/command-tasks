import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  autocompleteContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  autocomplete: {
    flex: 1,
  },
  addBtnContainer: {
    height: '100%',
    width: 48,
  },
  addBtn: {
    borderRadius: 10,
    width: 38,
    height: 38,
    position: 'relative',
    top: 10,
    bottom: 'auto',
    left: 'auto',
    right: 0,
  },
  addBtnText: {
    color: THEME.TEXT_COLOR,
  },
});
