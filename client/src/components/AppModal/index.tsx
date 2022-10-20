import {useOrientation} from 'hooks/useOrientation';
import React, {useCallback} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ModalActions} from './ModalActions';
import {ModalButton} from './ModalButton';
import {styles} from './styles';
import {AppModalType} from './types';

export const AppModal = ({
  isOpen,
  isWrapperDisabled = false,
  wrapperStyle,
  contentStyle,
  style,
  children,
  setIsOpen,
}: AppModalType) => {
  const orientation = useOrientation();

  const wrapperHandler = useCallback(() => {
    !isWrapperDisabled && setIsOpen(false);
  }, [isWrapperDisabled]);

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
