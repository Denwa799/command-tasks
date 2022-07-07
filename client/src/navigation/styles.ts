import {THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bottom: {
    backgroundColor: THEME.BACK_COLOR,
    borderColor: THEME.TEXT_COLOR,
    borderTopColor: THEME.BACK_SECOND,
    borderTopWidth: 1,
  },
});
