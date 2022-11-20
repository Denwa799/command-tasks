import {BOX_SHADOW} from 'constants/theme';
import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppCard} from './types';

export const AppCard: FC<IAppCard> = ({children, style}) => {
  return <View style={[style, styles.card, BOX_SHADOW]}>{children}</View>;
};
