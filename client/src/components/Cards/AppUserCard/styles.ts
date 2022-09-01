import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.BACK_SECOND,
    marginVertical: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  email: {
    fontSize: 20,
  },
  name: {
    fontSize: 17,
  },
  sendBtn: {
    paddingRight: 10,
  },
});
