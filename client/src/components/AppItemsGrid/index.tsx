import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {IAppItemsGrid} from './types';
import Anticon from 'react-native-vector-icons/AntDesign';
import {THEME} from 'constants/theme';

export const AppItemsGrid: FC<IAppItemsGrid> = ({items, style, onDelete}) => {
  const preparedData = items.map(item => {
    return {
      id: `${Math.random()}${item}`,
      text: item,
    };
  });

  return (
    <View style={[styles.grid, style]}>
      {preparedData.map((item, index) => {
        return (
          <View key={item.id} style={styles.item}>
            <Text style={styles.text} numberOfLines={1}>
              {item.text}
            </Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => onDelete(index)}>
              <Anticon name="delete" size={18} color={THEME.RED_COLOR} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
