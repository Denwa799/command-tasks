import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import React, {FC, useCallback} from 'react';
import {Text, View} from 'react-native';
import {IModalDelete} from './types';
import {styles} from './styles';
import {useTeams} from 'hooks/useTeams';
import {useRoute} from '@react-navigation/native';
import {useProjects} from 'hooks/useProjects';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useTasks} from 'hooks/useTasks';

const ModalDelete: FC<IModalDelete> = ({
  isOpen,
  setIsOpen,
  id,
  teamId,
  projectId,
}) => {
  const route = useRoute();

  const {fetchTeams, fetchTeam, deleteTeam, deleteTeamIsLoading} = useTeams();
  const {deleteProject, fetchProject, deleteProjectIsLoading} = useProjects();
  const {deleteTask, deleteTaskIsLoading} = useTasks();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    route.name === teamsRoute && (await deleteTeam(id));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await deleteProject(id));
    route.name === teamRoute && teamId && (await fetchTeam(teamId));

    route.name === projectRoute && projectId && (await deleteTask(id));
    route.name === projectRoute && projectId && (await fetchProject(projectId));

    setIsOpen(false);
  }, [id, teamId, projectId]);

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
          disabled={
            deleteTeamIsLoading || deleteProjectIsLoading || deleteTaskIsLoading
          }
        />
      </View>
    </AppModal>
  );
};

export default ModalDelete;
