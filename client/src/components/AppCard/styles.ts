import {SIZES, THEME} from 'constants/theme';
import {Appearance, StyleSheet} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  card: {
    backgroundColor:
      colorScheme === 'dark' ? THEME.BACK_SECOND : THEME.BACK_COLOR,
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 15,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: SIZES.body2,
    color: colorScheme === 'dark' ? THEME.TEXT_COLOR : THEME.SECOND_COLOR,
  },
  cardHandler: {
    width: '75%',
  },
});
