import React, {FC, useCallback} from 'react';
import {IModalDialog} from './types';
import {useTeams} from 'hooks/useTeams';
import {useRoute} from '@react-navigation/native';
import {useProjects} from 'hooks/useProjects';
import {
  doneStatus,
  inProgressStatus,
  projectRoute,
  teamRoute,
  teamsRoute,
} from 'constants/variables';
import {useTasks} from 'hooks/useTasks';
import {AppDialog} from 'components/AppDialog';

export const ModalDialog: FC<IModalDialog> = ({
  isOpen,
  id,
  teamId,
  projectId,
  title = 'Удалить',
  statusAction,
  onUpdateData,
  setIsOpen,
}) => {
  const route = useRoute();

  const {deleteTeamIsLoading, fetchTeams, deleteTeam} = useTeams();
  const {deleteProjectIsLoading, deleteProject, fetchProjects} = useProjects();
  const {deleteTaskIsLoading, fetchTasks, deleteTask, changeTaskStatus} =
    useTasks();

  const onClose = () => setIsOpen(false);

  const onDelete = useCallback(async () => {
    if (route.name === teamsRoute) {
      await deleteTeam(id);
      await fetchTeams();
    }

    if (route.name === teamRoute && teamId) {
      await deleteProject(id);
      await fetchProjects(teamId);
    }

    if (route.name === projectRoute && projectId) {
      await deleteTask(id);
      await fetchTasks(projectId);
    }

    onUpdateData();
    setIsOpen(false);
  }, [id, teamId, projectId]);

  const onChangeStatus = useCallback(async () => {
    if (statusAction === doneStatus || statusAction === inProgressStatus) {
      await changeTaskStatus(id, statusAction);
    }
    if (projectId) {
      await fetchTasks(projectId);
      onUpdateData();
      setIsOpen(false);
    }
  }, [id, projectId, statusAction]);

  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppDialog.Title>{title}</AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title="Выполнить"
          onPress={statusAction ? onChangeStatus : onDelete}
          disabled={
            deleteTeamIsLoading || deleteProjectIsLoading || deleteTaskIsLoading
          }
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};
