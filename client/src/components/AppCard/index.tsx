import {BOX_SHADOW, THEME} from 'constants/theme';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC, useCallback} from 'react';
import {
  Appearance,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {IAppCard} from './types';
import Anticon from 'react-native-vector-icons/AntDesign';

const colorScheme = Appearance.getColorScheme();

export const AppCard: FC<IAppCard> = ({
  id,
  text,
  status,
  responsible,
  item,
  onOpen,
  onDelete,
  onChange,
}) => {
  const openHandler = useCallback(() => {
    console.log('Открыть');
  }, []);

  const deleteHandler = useCallback(() => {
    console.log('Удалить');
  }, []);

  const changeHandler = useCallback(() => {
    console.log('Редактировать');
  }, []);

  return (
    <AppContainer>
      <View style={[styles.card, BOX_SHADOW]}>
        <TouchableOpacity
          style={styles.cardHandler}
          activeOpacity={0.9}
          onPress={onOpen ? () => onOpen(item) : openHandler}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={onDelete ? () => onDelete(id) : deleteHandler}
          underlayColor="none">
          <Anticon
            name="delete"
            size={24}
            color={
              colorScheme === 'dark' ? THEME.TEXT_COLOR : THEME.SECOND_COLOR
            }
          />
        </TouchableHighlight>
      </View>
    </AppContainer>
  );
};
