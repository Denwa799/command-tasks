import {AppButton} from 'components/AppButton';
import {useAuth} from 'hooks/useAuth';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export const ProfileScreen = () => {
  const {logout} = useAuth();

  return (
    <View style={styles.profile}>
      <Text>Profile</Text>
      <AppButton onPress={logout} title="Выйти" />
    </View>
  );
};
