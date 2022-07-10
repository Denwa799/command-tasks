import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  auth: {
    height: '100%',
    width: '100%',
    backgroundColor: THEME.BACK_COLOR,
    paddingTop: 16,
  },
  block: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '75%',
  },
  title: {
    textAlign: 'center',
    color: THEME.TEXT_COLOR,
    fontWeight: 'bold',
    marginBottom: 9,
    fontSize: SIZES.h2,
  },
  regBtn: {
    width: '30%',
    marginLeft: 'auto',
  },
  text: {
    color: THEME.TEXT_COLOR,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: SIZES.body5,
    marginTop: 10,
  },
});
