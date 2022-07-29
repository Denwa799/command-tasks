import {BOX_SHADOW, THEME} from 'constants/theme';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC, useCallback, useMemo} from 'react';
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
import {doneStatus, inProgressStatus, overdueStatus} from 'constants/variables';

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
  isColors = false,
  isUrgently = false,
  date,
}) => {
  const cardStyles = useMemo(() => {
    return [
      styles.card,
      BOX_SHADOW,
      isColors && styles.colorsCard,
      status === overdueStatus && styles.redBorder,
      status === inProgressStatus && styles.yellowBorder,
      status === doneStatus && styles.greenBorder,
      status === overdueStatus && isUrgently && styles.redBack,
      status === inProgressStatus && isUrgently && styles.yellowBack,
      status === doneStatus && isUrgently && styles.greenBack,
    ];
  }, [isColors, status, isUrgently]);

  const textStyles = useMemo(() => {
    return [
      styles.text,
      isColors && styles.colorsText,
      isUrgently && styles.colorUrgently,
      status === inProgressStatus && isUrgently && styles.blackText,
    ];
  }, [isColors, status, isUrgently]);

  const responsibleStyles = useMemo(() => {
    return [
      styles.responsible,
      isUrgently && styles.colorUrgently,
      status === inProgressStatus && isUrgently && styles.blackText,
    ];
  }, [isColors, status, isUrgently]);

  const iconColor = useMemo(() => {
    if (isColors) {
      if (!isUrgently) {
        return THEME.TEXT_COLOR;
      }
      if (status === inProgressStatus) {
        return colorScheme === 'dark' ? THEME.BLACK_COLOR : THEME.BLACK_COLOR;
      }
      return colorScheme === 'dark' ? THEME.WHITE_COLOR : THEME.WHITE_COLOR;
    }
    return colorScheme === 'dark' ? THEME.TEXT_COLOR : THEME.SECOND_COLOR;
  }, [colorScheme, isColors, status, isUrgently]);

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
      <View style={cardStyles}>
        <TouchableOpacity
          style={styles.cardHandler}
          activeOpacity={0.9}
          onPress={onOpen ? () => onOpen(item) : openHandler}>
          <Text style={textStyles}>{text}</Text>
          {responsible && <Text style={responsibleStyles}>{responsible}</Text>}
        </TouchableOpacity>
        <TouchableHighlight
          onPress={
            onChange
              ? () => onChange(id, text, responsible, status, isUrgently, date)
              : changeHandler
          }
          underlayColor="none">
          <Anticon name="edit" size={24} color={iconColor} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onDelete ? () => onDelete(id) : deleteHandler}
          underlayColor="none">
          <Anticon name="delete" size={24} color={iconColor} />
        </TouchableHighlight>
      </View>
    </AppContainer>
  );
};
