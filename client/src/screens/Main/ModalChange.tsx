import {useRoute} from '@react-navigation/native';
import {AppModal} from 'components/AppModal';
import {
  doneStatus,
  inProgressStatus,
  projectRoute,
  teamRoute,
  teamsRoute,
} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import {TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {IModalChange} from './types';
import {TextField} from './TextField';
import {Dropdown} from './Dropdown';
import {CheckBox} from './CheckBox';
import {DatePicker} from './DatePicker';

export const ModalChange: FC<IModalChange> = ({
  isOpen,
  setIsOpen,
  id,
  text,
  teamId,
  responsibleEmail,
  status,
  isUrgently,
  date,
  projectId,
  onUpdateData,
}) => {
  const route = useRoute();
  const {team, updateTeamIsLoading, updateTeam, fetchTeams} = useTeams();
  const {updateProjectIsLoading, fetchProjects, updateProject} = useProjects();
  const {updateTaskIsLoading, fetchTasks, updateTask} = useTasks();

  const [isWrapperDisabled, setIsWrapperDisabled] = useState(false);

  const [textValue, setTextValue] = useState('');
  const [isTextError, setIsTextError] = useState(false);
  const [dangerText, setDangerText] = useState('Пустое поле');

  const [responsiblePress, setResponsiblePress] = useState('');
  const [isResponsibleError, setIsResponsibleError] = useState(false);
  const [dangerResponsibleText, setDangerResponsibleText] =
    useState('Пустое поле');

  const [isUrgentlyValue, setIsUrgentlyValue] = useState(false);

  const [statusValue, setStatusValue] =
    useState<TaskStatusType>(inProgressStatus);
  const [isDone, setIsDone] = useState(false);

  const [dateValue, setDateValue] = useState<Date>(
    useMemo(() => {
      return new Date();
    }, []),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const selectedDate = useMemo(() => {
    return `${dateValue.getDate()}/${
      dateValue.getMonth() + 1
    }/${dateValue.getFullYear()}`;
  }, [dateValue]);

  const itemsUsers = useMemo(() => {
    let filteredUsers;
    let data;
    if (team?.users) {
      filteredUsers = team.users.filter(element =>
        team.activatedUsers.includes(element.id),
      );
      filteredUsers.push(team.creator);
      data = filteredUsers.map(element => {
        return {
          id: element.id,
          title: element.name,
          text: element.email,
        };
      });
    }
    return data;
  }, [team]);

  useLayoutEffect(() => {
    if (isOpen) {
      setTextValue(text);
      responsibleEmail && setResponsiblePress(responsibleEmail);
      status && setStatusValue(status);
      isUrgently !== undefined && setIsUrgentlyValue(isUrgently);
      date && setDateValue(new Date(date));
    }
  }, [isOpen]);

  useEffect(() => {
    statusValue === doneStatus && setIsDone(true);
    statusValue !== doneStatus && setIsDone(false);
  }, [statusValue]);

  const onClose = () => setIsOpen(false);

  const onSave = useCallback(async () => {
    if (!textValue || textValue.length < 3 || textValue.length > 50) {
      if (textValue.length < 3) {
        setDangerText('Меньше 3 символов');
      }
      if (textValue.length > 50) {
        setDangerText('Больше 50 символов');
      }
      if (!textValue) {
        setDangerText('Пустое поле');
      }
      return setIsTextError(true);
    }

    if (route.name === projectRoute) {
      if (!responsiblePress) {
        setDangerResponsibleText('Пустое поле');
        return setIsResponsibleError(true);
      }
    }

    if (route.name === teamsRoute) {
      await updateTeam(id, textValue);
      await fetchTeams();
    }

    if (route.name === teamRoute && teamId) {
      await updateProject(id, textValue);
      await fetchProjects(teamId);
    }

    if (route.name === projectRoute && projectId) {
      await updateTask(
        id,
        textValue,
        responsiblePress,
        isDone ? doneStatus : inProgressStatus,
        isUrgentlyValue,
        dateValue,
      );
      await fetchTasks(projectId);
    }

    onUpdateData();
    setIsOpen(false);
  }, [
    id,
    textValue,
    teamId,
    responsiblePress,
    projectId,
    statusValue,
    isDone,
    isUrgentlyValue,
    dateValue,
  ]);

  return (
    <AppModal
      isOpen={isOpen}
      isWrapperDisabled={isWrapperDisabled}
      setIsOpen={setIsOpen}>
      <TextField
        textValue={textValue}
        placeholder={'Введите текст'}
        dangerText={dangerText}
        isDanger={isTextError}
        setText={setTextValue}
        setIsTextError={setIsTextError}
      />
      {route.name === projectRoute && (
        <>
          <Dropdown
            dangerText={dangerResponsibleText}
            placeholder="Выбрать сотрудника"
            autocompletePress={responsiblePress}
            isDanger={isResponsibleError}
            items={itemsUsers}
            setAutocompletePress={setResponsiblePress}
            setIsWrapperDisabled={setIsWrapperDisabled}
          />
          <CheckBox
            value={isUrgentlyValue}
            text={'Срочно'}
            setStatus={setIsUrgentlyValue}
          />
          <CheckBox value={isDone} text={'Выполнено'} setStatus={setIsDone} />
          <DatePicker
            selectedDate={selectedDate}
            isPickerOpen={isPickerOpen}
            date={dateValue}
            setIsPickerOpen={setIsPickerOpen}
            setDate={setDateValue}
          />
        </>
      )}

      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Сохранить"
          onPress={onSave}
          disabled={
            updateTeamIsLoading || updateProjectIsLoading || updateTaskIsLoading
          }
        />
      </AppModal.Actions>
    </AppModal>
  );
};
