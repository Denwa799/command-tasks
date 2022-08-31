import {AppUserCard} from 'components/Cards/AppUserCard';
import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';

export const UsersScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);

  const data = [
    {
      id: 1,
      email: 'test@test.ru',
      name: 'Ваня',
    },
    {
      id: 2,
      email: 'test2@test.ru',
      name: 'Женя',
    },
    {
      id: 3,
      email: 'test3@test.ru',
      name: 'Никита',
    },
  ];

  const onRefresh = useCallback(() => {
    console.log('refresh');
  }, []);

  const dialogOpen = useCallback((id: number) => {
    setUserId(id);
    console.log(id);
  }, []);

  return (
    <View style={styles.users}>
      <FlatList
        data={data}
        style={styles.list}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        renderItem={({item}) => (
          <AppUserCard
            id={item.id}
            name={item.name}
            email={item.email}
            onPress={dialogOpen}
            btnText={'Удалить'}
          />
        )}
      />
    </View>
  );
};
