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
  colorsCard: {
    marginBottom: 4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  colorsText: {
    fontSize: SIZES.body3,
    color: THEME.TEXT_COLOR,
  },
  responsible: {
    fontSize: SIZES.body4,
    color: THEME.TEXT_COLOR,
  },
  colorUrgently: {
    color: colorScheme === 'dark' ? THEME.WHITE_COLOR : THEME.WHITE_COLOR,
  },
  redBack: {
    backgroundColor: THEME.RED_COLOR,
  },
  redBorder: {
    borderColor: THEME.RED_COLOR,
    borderWidth: 2,
  },
  yellowBack: {
    backgroundColor: THEME.YELLOW_COLOR,
  },
  yellowBorder: {
    borderColor: THEME.YELLOW_COLOR,
    borderWidth: 2,
  },
  greenBack: {
    backgroundColor: THEME.GREEN_COLOR,
  },
  greenBorder: {
    borderColor: THEME.GREEN_COLOR,
    borderWidth: 2,
  },
  blackText: {
    color: THEME.BLACK_COLOR,
  },
});
