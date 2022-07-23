import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/AppIconButton';
import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {TeamScreenNavigateType} from './types';

export const MainScreen = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<TeamScreenNavigateType>>();
  const {teams, teamsIsLoading, fetchTeams} = useTeams();

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [id, setId] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: 'Команды',
    });

    fetchTeams();
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      fetchTeams();
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onAdd = useCallback(() => {
    setCreateIsOpen(true);
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setId(itemId);
    setDeleteIsOpen(true);
  }, []);

  return (
    <View style={styles.main}>
      {teamsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <View style={styles.content}>
          <AppList
            data={teams}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            style={styles.list}
            onDelete={onDelete}
          />
          <AppIconButton onPress={onAdd} />
          <Modals
            createIsOpen={createIsOpen}
            setCreateIsOpen={setCreateIsOpen}
            id={id}
            deleteIsOpen={deleteIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
          />
        </View>
      )}
    </View>
  );
};
