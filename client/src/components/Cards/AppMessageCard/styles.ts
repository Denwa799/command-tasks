import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 10,
    backgroundColor: THEME.BACK_SECOND,
    minHeight: 60,
    justifyContent: 'center',
  },
  text: {
    color: THEME.TEXT_COLOR,
    fontSize: SIZES.body3,
    textAlign: 'justify',
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    marginTop: 5,
  },
});
