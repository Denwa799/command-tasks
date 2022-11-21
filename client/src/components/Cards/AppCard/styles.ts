import {SIZES, THEME} from 'constants/theme';
import {Appearance, StyleSheet} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  card: {
    backgroundColor:
      colorScheme === 'dark' ? THEME.BACK_SECOND : THEME.BACK_COLOR,
    borderRadius: SIZES.radius,
  },
});
