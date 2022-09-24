import {useRoute} from '@react-navigation/native';
import {AppCheckBox} from 'components/AppCheckBox';
import {AppDatePicker} from 'components/AppDatePicker';
import {AppDropdown} from 'components/AppDropdown';
import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/Btns/AppTextButton';
import {
  doneStatus,
  inProgressStatus,
  overdueStatus,
  projectRoute,
  teamRoute,
  teamsRoute,
} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import {TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {IModalChange} from './types';

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
}) => {
  const route = useRoute();
  const {team} = useTeams();

  const [textValue, setTextValue] = useState('');
  const [isTextError, setIsTextError] = useState(false);
  const [dangerText, setDangerText] = useState('Пустое поле');

  const [responsiblePress, setResponsiblePress] = useState('');
  const [isResponsibleError, setIsResponsibleError] = useState(false);
  const [dangerResponsibleText, setDangerResponsibleText] =
    useState('Пустое поле');
  const [selectResponsibleIsOpen, setSelectResponsibleIsOpen] = useState(false);

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

  const {updateTeam, fetchTeams, updateTeamIsLoading} = useTeams();
  const {fetchProjects, updateProject, updateProjectIsLoading} = useProjects();
  const {fetchTasks, updateTask, updateTaskIsLoading} = useTasks();

  const itemsUsers = useMemo(() => {
    let filteredUsers;
    let data;
    if (team?.users) {
      filteredUsers = team.users.filter(element =>
        team.activatedUsers.includes(element.id),
      );
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

  useEffect(() => {
    if (isOpen) {
      setTextValue(text);
      responsibleEmail && setResponsiblePress(responsibleEmail);
      status && setStatusValue(status);
      isUrgently !== undefined && setIsUrgentlyValue(isUrgently);
      date && setDateValue(new Date(date));
    }
    if (!isOpen) {
      setTextValue('');
      setIsTextError(false);
      setResponsiblePress('');
      setIsResponsibleError(false);
      setStatusValue(inProgressStatus);
      setIsUrgentlyValue(false);
      setDateValue(new Date());
      setSelectResponsibleIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    statusValue === doneStatus && setIsDone(true);
    statusValue !== doneStatus && setIsDone(false);
  }, [statusValue]);

  const textHandler = useCallback(
    (value: string) => {
      setTextValue(value);
      setIsTextError(false);
    },
    [id, textValue],
  );

  const selectResponsibleHandler = useCallback(() => {
    setSelectResponsibleIsOpen(true);
  }, []);

  const onDropdownItemClick = useCallback(
    (id: number, name: string, email: string) => {
      setResponsiblePress(email);
      setSelectResponsibleIsOpen(false);
    },
    [],
  );

  const isUrgentlyHandler = useCallback(() => {
    setIsUrgentlyValue(value => !value);
  }, [isUrgentlyValue]);

  const statusHandler = useCallback(() => {
    if (statusValue === inProgressStatus || statusValue === overdueStatus) {
      return setStatusValue(doneStatus);
    }
    return setStatusValue(inProgressStatus);
  }, [statusValue]);

  const onDateConfirm = useCallback((newDate: Date) => {
    setIsPickerOpen(false);
    setDateValue(newDate);
  }, []);

  const onDateCancel = useCallback(() => {
    setIsPickerOpen(false);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

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

    route.name === teamsRoute && (await updateTeam(id, textValue));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await updateProject(id, textValue));
    route.name === teamRoute && teamId && (await fetchProjects(teamId));

    route.name === projectRoute &&
      projectId &&
      (await updateTask(
        id,
        textValue,
        responsiblePress,
        statusValue,
        isUrgentlyValue,
        dateValue,
      ));
    route.name === projectRoute && projectId && (await fetchTasks(projectId));

    setIsOpen(false);
  }, [
    id,
    textValue,
    teamId,
    responsiblePress,
    projectId,
    statusValue,
    isUrgentlyValue,
    dateValue,
  ]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={textValue}
        placeholder={'Введите текст'}
        onChange={textHandler}
        isDanger={isTextError}
        dangerText={dangerText}
      />
      {route.name === projectRoute && (
        <>
          <AppDropdown
            placeholder={
              responsiblePress ? responsiblePress : 'Выбрать сотрудника'
            }
            onPress={selectResponsibleHandler}
            style={styles.appDropdown}
            isOpen={selectResponsibleIsOpen}
            setIsOpen={setSelectResponsibleIsOpen}
            items={itemsUsers ? itemsUsers : []}
            onItemClick={onDropdownItemClick}
            isDanger={isResponsibleError}
            dangerText={dangerResponsibleText}
          />
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={1}
            onPress={isUrgentlyHandler}>
            <AppCheckBox
              value={isUrgentlyValue}
              onValueChange={isUrgentlyHandler}
            />
            <AppText>Срочно</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={1}
            onPress={statusHandler}>
            <AppCheckBox value={isDone} onValueChange={statusHandler} />
            <AppText>Выполнено</AppText>
          </TouchableOpacity>
          <AppText style={styles.date}>{`${dateValue.getDate()}/${
            dateValue.getMonth() + 1
          }/${dateValue.getFullYear()}`}</AppText>
          <AppTextButton onPress={() => setIsPickerOpen(true)}>
            Выбрать дату
          </AppTextButton>
          <AppDatePicker
            date={dateValue}
            isOpen={isPickerOpen}
            onConfirm={onDateConfirm}
            onCancel={onDateCancel}
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
