import {SIZES, THEME} from 'constants/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    backgroundColor: THEME.BACK_SECOND,
    color: THEME.TEXT_COLOR,
    padding: 10,
    paddingLeft: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '120%',
    height: '120%',
  },
  modal: {
    left: 20,
    top: 20,
    width: '100%',
    maxHeight: 200,
    paddingRight: 0,
  },
  modalContent: {
    padding: 0,
  },
  modalItemContainer: {
    padding: 10,
  },
  dangerBorder: {
    borderColor: THEME.DANGER_COLOR,
    borderWidth: 1,
  },
  dangerText: {
    color: THEME.DANGER_COLOR,
    fontSize: 12,
    paddingTop: 2,
  },
  message: {
    padding: 10,
    textAlign: 'center',
  },
});
