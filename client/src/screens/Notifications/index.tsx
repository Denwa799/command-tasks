import {AppList} from 'components/AppList';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const NotificationsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = [
    {
      id: 1,
      message: 'Приглашение в команду Test1 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 2,
      message: 'Приглашение в команду Test2 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 3,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 4,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 5,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 6,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 7,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 8,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 9,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 10,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: true,
    },
    {
      id: 11,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 12,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 13,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 14,
      message: 'Приглашение в команду Test3 от test@test.ru',
      isAccepted: false,
    },
    {
      id: 15,
      message: 'Приглашение в команду Test15 от test@test.ru',
      isAccepted: false,
    },
  ];

  const onRefresh = useCallback(() => {
    console.log('Обновление');
  }, []);

  return (
    <View style={styles.notifications}>
      <AppList
        data={data}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        type="appMessageCard"
      />
    </View>
  );
};
