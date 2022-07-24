import {useRoute} from '@react-navigation/native';
import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import {teamRoute, teamsRoute} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTeams} from 'hooks/useTeams';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IModalCreate} from './types';

export const ModalCreate: FC<IModalCreate> = ({isOpen, setIsOpen, teamId}) => {
  const route = useRoute();

  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [dangerNameText, setDangerNameText] = useState('Пустое поле');

  const {createTeam, fetchTeams, createIsLoading, fetchTeam} = useTeams();
  const {createProject} = useProjects();

  useEffect(() => {
    setName('');
    setIsNameError(false);
  }, [isOpen]);

  const nameHandler = useCallback(
    (value: string) => {
      setName(value);
      setIsNameError(false);
    },
    [name],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onCreate = useCallback(async () => {
    if (!name || name.length < 3 || name.length > 50) {
      if (name.length < 3) {
        setDangerNameText('Меньше 3 символов');
      }
      if (name.length > 50) {
        setDangerNameText('Больше 50 символов');
      }
      if (!name) {
        setDangerNameText('Пустое поле');
      }
      return setIsNameError(true);
    }

    route.name === teamsRoute && (await createTeam(name));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await createProject(teamId, name));
    route.name === teamRoute && teamId && (await fetchTeam(teamId));

    setIsOpen(false);
  }, [teamId, name]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={name}
        placeholder={'Введите название'}
        onChange={nameHandler}
        isDanger={isNameError}
        dangerText={dangerNameText}
      />
      <View style={styles.modalBtns}>
        <AppNativeButton
          title="Закрыть"
          styleContainer={styles.modalBtn}
          onPress={onClose}
        />
        <AppNativeButton
          title="Добавить"
          styleContainer={styles.modalBtn}
          onPress={onCreate}
          disabled={createIsLoading}
        />
      </View>
    </AppModal>
  );
};
