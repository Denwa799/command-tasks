import {useOrientation} from 'hooks/useOrientation';
import React, {FC, useCallback} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {IAppModal} from './types';

export const AppModal: FC<IAppModal> = ({
  children,
  style,
  isOpen,
  setIsOpen,
}) => {
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
            style={styles.wrapper}
            activeOpacity={1}
          />
          <ScrollView
            style={[
              styles.modal,
              orientation === 'LANDSCAPE' && styles.scroll,
              style,
            ]}>
            {children}
          </ScrollView>
        </>
      )}
    </>
  );
};
