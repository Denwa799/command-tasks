import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {IAppItemsGrid} from './types';
import Anticon from 'react-native-vector-icons/AntDesign';
import {THEME} from 'constants/theme';

export const AppItemsGrid: FC<IAppItemsGrid> = ({items, style}) => {
  return (
    <View style={[styles.grid, style]}>
      {items.map((item, index) => {
        return (
          <View key={`${Math.random()}item`} style={styles.item}>
            <Text style={styles.text} numberOfLines={1}>
              {item}
            </Text>
            <Anticon name="delete" size={18} color={THEME.RED_COLOR} />
          </View>
        );
      })}
    </View>
  );
};
