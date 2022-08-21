import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  text: {
    fontSize: SIZES.body4,
    color: THEME.TEXT_COLOR,
    width: '80%',
  },
});
