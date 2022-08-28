import React, {useCallback, useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {THEME} from 'constants/theme';
import {MainScreen} from 'screens/Main';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Notifications} from 'screens/Notifications';
import {styles} from './styles';

const Stack = createNativeStackNavigator();

export const TaskNavigation = () => {
  const navigation = useNavigation();

  const notificationsHandler = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const notificationsButton = useMemo(() => {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={notificationsHandler}
        style={styles.notifications}>
        <Ionicon
          name="notifications-outline"
          size={24}
          color={THEME.TEXT_COLOR}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.BACK_COLOR,
        },
        headerTintColor: THEME.TEXT_COLOR,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen
        name="Teams"
        component={MainScreen}
        options={{
          headerRight: () => notificationsButton,
        }}
      />
      <Stack.Screen name="Team" component={MainScreen} />
      <Stack.Screen name="Project" component={MainScreen} />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Уведомления',
        }}
      />
    </Stack.Navigator>
  );
};
