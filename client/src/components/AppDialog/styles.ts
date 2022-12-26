import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.body2,
    color: THEME.TEXT_COLOR,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
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
