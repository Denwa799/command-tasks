import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {THEME} from 'constants/theme';
import {MainScreen} from 'screens/Main';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NotificationsScreen} from 'screens/Notifications';
import {styles} from './styles';
import {UsersScreen} from 'screens/Users';
import {AppNavigationBtn} from 'components/Btns/AppNavigationBtn';
import {useInvitations} from 'hooks/useInvitations';

const Stack = createStackNavigator();

export const TaskNavigation = () => {
  const navigation = useNavigation();
  const {invitations, checkedInvitationsId} = useInvitations();

  const [isNewNotification, setIsNewNotification] = useState(false);

  const config = {
    stiffness: 700,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  useEffect(() => {
    const newInvitation = invitations?.find(
      invitation => invitation.isRead === false,
    );
    if (newInvitation && !checkedInvitationsId.includes(newInvitation.id)) {
      setIsNewNotification(true);
    } else {
      setIsNewNotification(false);
    }
  }, [invitations, checkedInvitationsId]);

  const notificationsHandler = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const usersHandler = useCallback(() => {
    navigation.navigate('Users');
  }, [navigation]);

  const notificationsButton = useMemo(() => {
    return (
      <AppNavigationBtn
        style={styles.iconRight}
        onNotification={isNewNotification}
        onPress={notificationsHandler}>
        <Ionicon
          name="notifications-outline"
          size={24}
          color={THEME.TEXT_COLOR}
        />
      </AppNavigationBtn>
    );
  }, [isNewNotification]);

  const usersButton = useMemo(() => {
    return (
      <AppNavigationBtn style={styles.iconRight} onPress={usersHandler}>
        <Anticon name="adduser" size={24} color={THEME.TEXT_COLOR} />
      </AppNavigationBtn>
    );
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.BACK_COLOR,
        },
        headerTintColor: THEME.TEXT_COLOR,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'spring',
            config,
          },
          close: {
            animation: 'spring',
            config,
          },
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerMode: 'float',
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
          gestureDirection: 'vertical',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{
          title: 'Пользователи в команде',
          gestureDirection: 'vertical',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};
