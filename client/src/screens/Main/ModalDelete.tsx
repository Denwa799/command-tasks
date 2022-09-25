import React, {FC, useCallback} from 'react';
import {IModalDelete} from './types';
import {useTeams} from 'hooks/useTeams';
import {useRoute} from '@react-navigation/native';
import {useProjects} from 'hooks/useProjects';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useTasks} from 'hooks/useTasks';
import {AppDialog} from 'components/AppDialog';

const ModalDelete: FC<IModalDelete> = ({
  isOpen,
  setIsOpen,
  id,
  teamId,
  projectId,
}) => {
  const route = useRoute();

  const {fetchTeams, deleteTeam, deleteTeamIsLoading} = useTeams();
  const {deleteProject, fetchProjects, deleteProjectIsLoading} = useProjects();
  const {fetchTasks, deleteTask, deleteTaskIsLoading} = useTasks();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    route.name === teamsRoute && (await deleteTeam(id));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await deleteProject(id));
    route.name === teamRoute && teamId && (await fetchProjects(teamId));

    route.name === projectRoute && projectId && (await deleteTask(id));
    route.name === projectRoute && projectId && (await fetchTasks(projectId));

    setIsOpen(false);
  }, [id, teamId, projectId]);

  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppDialog.Title>Удалить?</AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title="Удалить"
          onPress={onDelete}
          disabled={
            deleteTeamIsLoading || deleteProjectIsLoading || deleteTaskIsLoading
          }
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};

export default ModalDelete;
