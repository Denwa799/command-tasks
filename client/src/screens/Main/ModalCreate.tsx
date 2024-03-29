import {useRoute} from '@react-navigation/native';
import {AppModal} from 'components/AppModal';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {AutocompleteField} from './AutocompleteField';
import {Dropdown} from './Dropdown';
import {TextField} from './TextField';
import {IModalCreate} from './types';
import {CheckBox} from './CheckBox';
import {DatePicker} from './DatePicker';
import {useAuth} from 'hooks/useAuth';

export const ModalCreate: FC<IModalCreate> = ({
  teamId,
  projectId,
  isOpen,
  setIsOpen,
  onUpdateData,
}) => {
  const route = useRoute();
  const {user} = useAuth();
  const {foundUsers} = useUsers();
  const {team, createTeamIsLoading, createTeam, fetchTeams} = useTeams();
  const {createProjectIsLoading, createProject, fetchProjects} = useProjects();
  const {createTaskIsLoading, fetchTasks, createTask} = useTasks();

  const [text, setText] = useState('');
  const [isTextError, setIsTextError] = useState(false);
  const [dangerText, setDangerText] = useState('Пустое поле');

  const [isWrapperDisabled, setIsWrapperDisabled] = useState(false);

  const [autocompletePress, setAutocompletePress] = useState('');
  const [isAutocompleteError, setIsAutocompleteError] = useState(false);
  const [dangerAutocompleteText, setDangerAutocompleteText] =
    useState('Пустое поле');

  const [emails, setEmails] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(0);

  const [isUrgently, setIsUrgently] = useState(false);

  const [date, setDate] = useState(
    useMemo(() => {
      return new Date();
    }, []),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const selectedDate = useMemo(() => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }, [date]);

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
      if (user) {
        data.push({
          id: user.id,
          title: user.name ? user.name : 'ФИО отсутствует',
          text: user!.email,
        });
      }
    }
    return data;
  }, [team, user]);

  const autocompleteData = useMemo(() => {
    if (route.name === teamsRoute) {
      return foundUsers.map(item => item.email);
    } else {
      return [];
    }
  }, [foundUsers, route]);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.id);
    }
  }, [user]);

  const onClose = () => setIsOpen(false);

  const onCreate = useCallback(async () => {
    if (!text || text.length < 3 || text.length > 50) {
      if (text.length < 3) {
        setDangerText('Меньше 3 символов');
      }
      if (text.length > 50) {
        setDangerText('Больше 50 символов');
      }
      if (!text) {
        setDangerText('Пустое поле');
      }
      return setIsTextError(true);
    }

    if (route.name === projectRoute) {
      if (!autocompletePress) {
        setDangerAutocompleteText('Ответственный не выбран');
        return setIsAutocompleteError(true);
      }
    }

    if (route.name === teamsRoute) {
      await createTeam(text, userId, emails);
      await fetchTeams();
    }

    if (route.name === teamRoute && teamId) {
      await createProject(teamId, text);
      await fetchProjects(teamId);
    }

    if (route.name === projectRoute && projectId) {
      await createTask(
        projectId,
        text,
        autocompletePress,
        'inProgress',
        isUrgently,
        date,
      );
      await fetchTasks(projectId);
    }

    setIsOpen(false);
    onUpdateData();
  }, [
    teamId,
    projectId,
    text,
    autocompletePress,
    isUrgently,
    date,
    emails,
    userId,
  ]);

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isWrapperDisabled={isWrapperDisabled}>
      <TextField
        textValue={text}
        placeholder={'Введите текст'}
        dangerText={dangerText}
        isDanger={isTextError}
        setText={setText}
        setIsTextError={setIsTextError}
      />
      {route.name === teamsRoute && (
        <AutocompleteField
          userEmail={userEmail}
          pressText={autocompletePress}
          dangerText={dangerAutocompleteText}
          emails={emails}
          data={autocompleteData}
          isOpen={isOpen}
          error={isAutocompleteError}
          setUserEmail={setUserEmail}
          onPress={setAutocompletePress}
          onDangerText={setDangerAutocompleteText}
          setEmails={setEmails}
          onError={setIsAutocompleteError}
        />
      )}
      {route.name === projectRoute && (
        <>
          <Dropdown
            dangerText={dangerAutocompleteText}
            placeholder="Выбрать сотрудника"
            autocompletePress={autocompletePress}
            isDanger={isAutocompleteError}
            items={itemsUsers}
            setAutocompletePress={setAutocompletePress}
            setIsWrapperDisabled={setIsWrapperDisabled}
          />
          <CheckBox
            value={isUrgently}
            text={'Срочно'}
            setStatus={setIsUrgently}
          />
          <DatePicker
            selectedDate={selectedDate}
            isPickerOpen={isPickerOpen}
            date={date}
            setIsPickerOpen={setIsPickerOpen}
            setDate={setDate}
          />
        </>
      )}
      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Создать"
          onPress={onCreate}
          disabled={
            createTeamIsLoading || createProjectIsLoading || createTaskIsLoading
          }
        />
      </AppModal.Actions>
    </AppModal>
  );
};
