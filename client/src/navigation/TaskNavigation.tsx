import React, {useCallback, useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {THEME} from 'constants/theme';
import {MainScreen} from 'screens/Main';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NotificationsScreen} from 'screens/Notifications';
import {styles} from './styles';
import {UsersScreen} from 'screens/Users';

const Stack = createNativeStackNavigator();

export const TaskNavigation = () => {
  const navigation = useNavigation();

  const notificationsHandler = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const usersHandler = useCallback(() => {
    navigation.navigate('Users');
  }, [navigation]);

  const notificationsButton = useMemo(() => {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={notificationsHandler}
        style={styles.iconRight}>
        <Ionicon
          name="notifications-outline"
          size={24}
          color={THEME.TEXT_COLOR}
        />
      </TouchableOpacity>
    );
  }, []);

  const usersButton = useMemo(() => {
    return (
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={usersHandler}
        style={styles.iconRight}>
        <Anticon name="adduser" size={24} color={THEME.TEXT_COLOR} />
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
      <Stack.Screen
        name="Team"
        component={MainScreen}
        options={{
          headerRight: () => usersButton,
        }}
      />
      <Stack.Screen name="Project" component={MainScreen} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Уведомления',
        }}
      />
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{
          title: 'Пользователи в команде',
        }}
      />
    </Stack.Navigator>
  );
};
