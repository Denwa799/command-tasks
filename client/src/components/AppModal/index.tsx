import {useOrientation} from 'hooks/useOrientation';
import React, {useCallback} from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';
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

  const deviceHeight = Dimensions.get('window').height;

  const scrollViewStyle = [
    styles.modal,
    deviceHeight <= 685 && styles.deviceHeight685,
    deviceHeight <= 592 && styles.deviceHeight592,
    deviceHeight <= 540 && styles.deviceHeight540,
    deviceHeight <= 480 && styles.deviceHeight480,
    orientation === 'LANDSCAPE' && styles.scroll,
    style,
  ];

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
            style={scrollViewStyle}
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
