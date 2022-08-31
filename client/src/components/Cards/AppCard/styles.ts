import {SIZES, THEME} from 'constants/theme';
import {Appearance, StyleSheet} from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  card: {
    backgroundColor:
      colorScheme === 'dark' ? THEME.BACK_SECOND : THEME.BACK_COLOR,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 15,
    fontSize: SIZES.body2,
    color: colorScheme === 'dark' ? THEME.TEXT_COLOR : THEME.SECOND_COLOR,
  },
  cardHandler: {
    width: '75%',
  },
  btns: {
    flexDirection: 'row',
    height: '100%',
    paddingRight: 15,
  },
  btn: {
    justifyContent: 'center',
  },
  btnEdit: {
    marginRight: 15,
  },
  colorsCard: {
    marginBottom: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 15,
  },
  colorsText: {
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 0,
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
  noAccess: {
    width: '100%',
  },
  paddingRight0: {
    paddingRight: 0,
  },
});
