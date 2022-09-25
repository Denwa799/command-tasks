import {useOrientation} from 'hooks/useOrientation';
import React, {useCallback} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ModalActions} from './ModalActions';
import {ModalButton} from './ModalButton';
import {styles} from './styles';
import {AppModalType} from './types';

export const AppModal = ({
  children,
  style,
  isOpen,
  setIsOpen,
  wrapperStyle,
  contentStyle,
}: AppModalType) => {
  const orientation = useOrientation();

  const wrapperHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <TouchableOpacity
            onPress={wrapperHandler}
            style={[styles.wrapper, wrapperStyle]}
            activeOpacity={1}
          />
          <ScrollView
            style={[
              styles.modal,
              orientation === 'LANDSCAPE' && styles.scroll,
              style,
            ]}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}>
            <View style={[styles.content, contentStyle]}>{children}</View>
          </ScrollView>
        </>
      )}
    </>
  );
};

AppModal.Actions = ModalActions;
AppModal.Button = ModalButton;
