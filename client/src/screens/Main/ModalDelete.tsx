import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import React, {FC, useCallback} from 'react';
import {Text, View} from 'react-native';
import {IModalDelete} from './types';
import {styles} from './styles';
import {useTeams} from 'hooks/useTeams';
import {useRoute} from '@react-navigation/native';
import {useProjects} from 'hooks/useProjects';
import {teamRoute, teamsRoute} from 'constants/variables';

const ModalDelete: FC<IModalDelete> = ({isOpen, setIsOpen, id, teamId}) => {
  const route = useRoute();

  const {fetchTeams, fetchTeam, deleteTeam, deleteIsLoading} = useTeams();
  const {deleteProject} = useProjects();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    route.name === teamsRoute && (await deleteTeam(id));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await deleteProject(id));
    route.name === teamRoute && teamId && (await fetchTeam(teamId));

    setIsOpen(false);
  }, [id, teamId]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Text style={styles.modalText}>Удалить?</Text>
      <View style={styles.modalBtns}>
        <AppNativeButton
          title="Закрыть"
          styleContainer={styles.modalBtn}
          onPress={onClose}
        />
        <AppNativeButton
          title="Удалить"
          styleContainer={styles.modalBtn}
          onPress={onDelete}
          disabled={deleteIsLoading}
        />
      </View>
    </AppModal>
  );
};

export default ModalDelete;
