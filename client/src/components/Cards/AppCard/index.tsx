import {BOX_SHADOW, THEME} from 'constants/theme';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import {TaskStatusType} from 'models/ITasks';
import {useAuth} from 'hooks/useAuth';

const colorScheme = Appearance.getColorScheme();

export const AppCard: FC<IAppCard> = ({
  id,
  creatorId,
  text,
  isColors = false,
  isUrgently = false,
  isAdditionalButtons = false,
  date,
  status,
  responsible,
  item,
  onOpen,
  onDialog,
  onChange,
}) => {
  const {user} = useAuth();

  const [itemCreatorId, setItemCreatorId] = useState();
  const [currentStatus, setCurrentStatus] = useState<TaskStatusType>();
  const [isAccess, setIsAccess] = useState(false);

  const cardStyles = useMemo(() => {
    return [
      styles.card,
      BOX_SHADOW,
      isColors && styles.colorsCard,
      currentStatus === overdueStatus && styles.redBorder,
      currentStatus === inProgressStatus && styles.yellowBorder,
      currentStatus === doneStatus && styles.greenBorder,
      currentStatus === overdueStatus && isUrgently && styles.redBack,
      currentStatus === inProgressStatus && isUrgently && styles.yellowBack,
      currentStatus === doneStatus && isUrgently && styles.greenBack,
    ];
  }, [isColors, currentStatus, isUrgently]);

  const textStyles = useMemo(() => {
    return [
      styles.text,
      isColors && styles.colorsText,
      isUrgently && styles.colorUrgently,
      currentStatus === inProgressStatus && isUrgently && styles.blackText,
    ];
  }, [isColors, currentStatus, isUrgently]);

  const responsibleStyles = useMemo(() => {
    return [
      styles.responsible,
      isUrgently && styles.colorUrgently,
      currentStatus === inProgressStatus && isUrgently && styles.blackText,
    ];
  }, [isColors, currentStatus, isUrgently]);

  const iconColor = useMemo(() => {
    if (isColors) {
      if (!isUrgently) {
        return THEME.TEXT_COLOR;
      }
      if (currentStatus === inProgressStatus) {
        return colorScheme === 'dark' ? THEME.BLACK_COLOR : THEME.BLACK_COLOR;
      }
      return colorScheme === 'dark' ? THEME.WHITE_COLOR : THEME.WHITE_COLOR;
    }
    return colorScheme === 'dark' ? THEME.TEXT_COLOR : THEME.SECOND_COLOR;
  }, [colorScheme, isColors, currentStatus, isUrgently]);

  const selectedDate = useMemo(() => {
    if (date) {
      const correctDate = new Date(date);
      return `${correctDate.getDate()}-${
        correctDate.getMonth() + 1
      }-${correctDate.getFullYear()}`;
    }
    return null;
  }, [date]);

  useEffect(() => {
    if (
      date &&
      status !== 'done' &&
      new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    ) {
      return setCurrentStatus('overdue');
    }
    return setCurrentStatus(status);
  }, [date, status]);

  useEffect(() => {
    item.creator && setItemCreatorId(item.creator.id);
  }, [item]);

  useEffect(() => {
    if (itemCreatorId === user?.id) {
      return setIsAccess(true);
    }
    if (creatorId === user?.id && !itemCreatorId) {
      return setIsAccess(true);
    }
    return setIsAccess(false);
  }, [itemCreatorId, creatorId, user]);

  const openHandler = useCallback(() => {
    if (onOpen && item.creator) {
      onOpen(id, item.creator.id);
    } else if (onOpen && creatorId) {
      onOpen(id, creatorId);
    }
  }, [id, creatorId, item, onOpen]);

  const dialogHandler = useCallback(
    (actualStatus: TaskStatusType | '' = '') => {
      onDialog && onDialog(id, actualStatus);
    },
    [onDialog, id],
  );

  const changeHandler = useCallback(() => {
    onChange &&
      onChange(id, text, responsible?.email, currentStatus, isUrgently, date);
  }, [onChange, id, text, responsible, currentStatus, isUrgently, date]);

  return (
    <AppContainer>
      <View style={cardStyles}>
        <TouchableOpacity
          style={[styles.cardHandler, !isAccess && styles.noAccess]}
          activeOpacity={0.9}
          onPress={openHandler}>
          <Text style={textStyles}>{text}</Text>
          {responsible && (
            <>
              <Text style={responsibleStyles}>{responsible.name}</Text>
              <Text style={responsibleStyles}>{selectedDate}</Text>
            </>
          )}
        </TouchableOpacity>
        {isAccess && (
          <View style={[styles.btns, isColors && styles.paddingRight0]}>
            <TouchableHighlight
              onPress={
                onChange
                  ? () =>
                      onChange(
                        id,
                        text,
                        responsible?.email,
                        currentStatus,
                        isUrgently,
                        date,
                      )
                  : changeHandler
              }
              underlayColor="none"
              style={[styles.btn, styles.btnEdit]}>
              <Anticon name="edit" size={24} color={iconColor} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => dialogHandler()}
              underlayColor="none"
              style={styles.btn}>
              <Anticon name="delete" size={24} color={iconColor} />
            </TouchableHighlight>
          </View>
        )}
        {isAdditionalButtons && !isAccess && user?.id === responsible?.id && (
          <TouchableHighlight
            onPress={
              status === doneStatus
                ? () => dialogHandler(inProgressStatus)
                : () => dialogHandler(doneStatus)
            }
            underlayColor="none"
            style={[styles.btn, styles.additionalBtn]}>
            <Anticon
              name={status === doneStatus ? 'close' : 'check'}
              size={24}
              color={iconColor}
            />
          </TouchableHighlight>
        )}
      </View>
    </AppContainer>
  );
};
