import {Appearance} from 'react-native';

const LIGHT_THEME = {
  MAIN_COLOR: '#E85D20',
  SECOND_COLOR: '#15545F',
  THIRD_COLOR: '#F7AF5D',
  TEXT_COLOR: '#000',
  SECOND_TEXT_COLOR: '#636363',
  BACK_COLOR: '#FFF',
  BACK_SECOND: '#F1F1F1',
  BACK_90_COLOR: 'rgba(255,255,255,0.9)',
  DANGER_COLOR: '#D81B60',
  RED_COLOR: '#e20d0d',
  YELLOW_COLOR: '#ffdc10',
  GREEN_COLOR: '#3ead13',
  WHITE_COLOR: '#fff',
  BLACK_COLOR: '#000',
  BLACK_60_COLOR: 'rgba(17,17,19,0.6)',
};

const DARK_THEME = {
  MAIN_COLOR: '#E85D20',
  SECOND_COLOR: '#15545F',
  THIRD_COLOR: '#F7AF5D',
  TEXT_COLOR: '#f1f1f1',
  SECOND_TEXT_COLOR: '#D0D0D0',
  BACK_COLOR: '#111113',
  BACK_SECOND: '#19191C',
  BACK_90_COLOR: 'rgba(17,17,19,0.9)',
  DANGER_COLOR: '#FF2828',
  RED_COLOR: '#e20d0d',
  YELLOW_COLOR: '#ffdc10',
  GREEN_COLOR: '#3ead13',
  WHITE_COLOR: '#f1f1f1',
  BLACK_COLOR: '#000',
  BLACK_60_COLOR: 'rgba(17,17,19,0.6)',
};

const colorScheme = Appearance.getColorScheme();
export const THEME = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 9,
  radiusSecond: 15,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
};

export const BOX_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 5,
};
