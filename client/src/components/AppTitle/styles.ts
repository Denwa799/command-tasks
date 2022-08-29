import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    color: THEME.TEXT_COLOR,
  },
  level1: {
    fontSize: SIZES.h1,
  },
  level2: {
    fontSize: SIZES.h2,
  },
  level3: {
    fontSize: SIZES.h3,
  },
  level4: {
    fontSize: SIZES.h4,
  },
});
