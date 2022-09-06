import {AppModal} from 'components/AppModal';
import React, {FC} from 'react';
import {
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {IAppDropdown} from './types';
import Anticon from 'react-native-vector-icons/AntDesign';
import {THEME} from 'constants/theme';
import {AppText} from 'components/AppText';
import {AppTitle} from 'components/AppTitle';

export const AppDropdown: FC<IAppDropdown> = ({
  placeholder = 'Выбрать',
  onPress,
  style,
  isOpen,
  setIsOpen,
  items,
  onItemClick,
  color = THEME.MAIN_COLOR,
  isDanger,
  dangerText = 'Не выбрано',
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[styles.container, isDanger && styles.dangerBorder, style]}>
          <Text>{placeholder}</Text>
          <Text>
            <Anticon name="caretdown" size={14} color={THEME.TEXT_COLOR} />
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {isDanger && <Text style={styles.dangerText}>{dangerText}</Text>}
      <AppModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        wrapperStyle={styles.modalWrapper}
        style={styles.modal}
        contentStyle={styles.modalContent}>
        {items.length > 0 ? (
          items.map(item => {
            return (
              <View key={item.id}>
                <TouchableNativeFeedback
                  onPress={() =>
                    onItemClick(item.id, item.title, item.text ? item.text : '')
                  }
                  background={TouchableNativeFeedback.Ripple(color, false)}>
                  <View style={styles.modalItemContainer}>
                    <AppTitle level="3">{item.title}</AppTitle>
                    {item.text && <AppText>{item.text}</AppText>}
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          })
        ) : (
          <AppTitle style={styles.message} level={'2'}>
            Список пуст
          </AppTitle>
        )}
      </AppModal>
    </>
  );
};
