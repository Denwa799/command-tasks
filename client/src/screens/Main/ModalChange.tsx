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
import {IModalChange} from './types';

export const ModalChange: FC<IModalChange> = ({
  isOpen,
  setIsOpen,
  id,
  text,
  teamId,
}) => {
  const route = useRoute();

  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [dangerNameText, setDangerNameText] = useState('Пустое поле');

  const {updateTeam, fetchTeams, fetchTeam, updateIsLoading} = useTeams();
  const {updateProject} = useProjects();

  useEffect(() => {
    setName(text);
    setIsNameError(false);
  }, [isOpen]);

  const nameHandler = useCallback(
    (value: string) => {
      setName(value);
      setIsNameError(false);
    },
    [id, name],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSave = useCallback(async () => {
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

    route.name === teamsRoute && (await updateTeam(id, name));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await updateProject(id, name));
    route.name === teamRoute && teamId && (await fetchTeam(teamId));

    setIsOpen(false);
  }, [id, name, teamId]);

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
          title="Сохранить"
          styleContainer={styles.modalBtn}
          onPress={onSave}
          disabled={updateIsLoading}
        />
      </View>
    </AppModal>
  );
};
