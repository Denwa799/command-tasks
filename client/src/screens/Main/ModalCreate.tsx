import {useRoute} from '@react-navigation/native';
import {AppAutocomplete} from 'components/AppAutocomplete';
import {AppAutocompleteField} from 'components/AppAutocompleteField';
import {AppCheckBox} from 'components/AppCheckBox';
import {AppDatePicker} from 'components/AppDatePicker';
import {AppField} from 'components/AppField';
import {AppItemsGrid} from 'components/AppItemsGrid';
import {AppModal} from 'components/AppModal';
import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/Btns/AppTextButton';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useAuth} from 'hooks/useAuth';
import {useDebounce} from 'hooks/useDebounce';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {IModalCreate} from './types';

export const ModalCreate: FC<IModalCreate> = ({
  isOpen,
  setIsOpen,
  teamId,
  projectId,
}) => {
  const route = useRoute();

  const {user} = useAuth();
  const {project} = useProjects();

  const [text, setText] = useState('');
  const [isTextError, setIsTextError] = useState(false);
  const [dangerText, setDangerText] = useState('Пустое поле');

  const [autocompleteValue, setAutocompleteValue] = useState('');
  const debouncedAutocompleteValue = useDebounce<string>(
    autocompleteValue,
    500,
  );
  const [autocompletePress, setAutocompletePress] = useState('');
  const [isAutocomplete, setIsAutocomplete] = useState(false);
  const [isAutocompleteError, setIsAutocompleteError] = useState(false);
  const [dangerAutocompleteText, setDangerAutocompleteText] =
    useState('Пустое поле');

  const [isUrgently, setIsUrgently] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(0);
  const [emails, setEmails] = useState<string[]>([]);

  const [date, setDate] = useState(
    useMemo(() => {
      return new Date();
    }, []),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const {createTeam, fetchTeams, createTeamIsLoading} = useTeams();
  const {createProject, fetchProjects, createProjectIsLoading} = useProjects();
  const {fetchTasks, createTask, createTaskIsLoading} = useTasks();
  const {searchUsersByEmail, foundUsers, findUsersIsLoading} = useUsers();

  const activeUsersEmail = useMemo(() => {
    if (route.name === projectRoute && project) {
      const activeUsers = project?.team.users.filter(item =>
        project.team.activatedUsers.includes(item.id),
      );
      return activeUsers.map(item => {
        return item.email;
      });
    }
  }, [route, project]);

  const autocompleteData = useMemo(() => {
    if (route.name === projectRoute && activeUsersEmail) {
      return activeUsersEmail.filter(item => {
        return item.toLowerCase().includes(debouncedAutocompleteValue);
      });
    } else if (route.name === teamsRoute) {
      return foundUsers.map(item => item.email);
    } else {
      return [];
    }
  }, [foundUsers, route, debouncedAutocompleteValue, activeUsersEmail]);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    setText('');
    setIsTextError(false);
    setAutocompleteValue('');
    setAutocompletePress('');
    setIsUrgently(false);
    setIsAutocompleteError(false);
    setEmails([]);
  }, [isOpen]);

  useEffect(() => {
    if (debouncedAutocompleteValue.length > 0 && route.name === teamsRoute) {
      searchUsersByEmail(debouncedAutocompleteValue.toLowerCase());
    }
  }, [debouncedAutocompleteValue]);

  useEffect(() => {
    if (autocompleteData.length > 0 && debouncedAutocompleteValue.length > 0) {
      setIsAutocomplete(true);
    } else {
      setIsAutocomplete(false);
    }

    if (autocompleteValue === autocompletePress) {
      setIsAutocomplete(false);
    }
  }, [
    autocompleteData,
    autocompleteValue,
    autocompletePress,
    debouncedAutocompleteValue,
  ]);

  const textHandler = useCallback(
    (value: string) => {
      setText(value);
      setIsTextError(false);
    },
    [text],
  );

  const autocompleteHandler = useCallback(
    (value: string) => {
      setAutocompleteValue(value);
      setIsAutocompleteError(false);
    },
    [autocompleteValue],
  );

  const onAutocompletePress = useCallback(
    (email: string) => {
      setIsAutocompleteError(false);
      setAutocompletePress(email);
      setAutocompleteValue(email);
    },
    [autocompletePress],
  );

  const onAdd = useCallback(() => {
    if (!autocompleteValue) {
      setDangerAutocompleteText('Пустое поле');
      return setIsAutocompleteError(true);
    }

    if (!autocompletePress) {
      setDangerAutocompleteText('Email не выбран');
      return setIsAutocompleteError(true);
    }

    if (autocompleteValue !== autocompletePress) {
      setDangerAutocompleteText('Выберите email');
      return setIsAutocompleteError(true);
    }

    if (autocompletePress === userEmail) {
      setDangerAutocompleteText(
        'Email не должен быть таким же, как почта владельца аккаунта',
      );
      return setIsAutocompleteError(true);
    }

    const email = emails.find(element => element === autocompletePress);
    if (email) {
      setDangerAutocompleteText('Email уже добавлен');
      return setIsAutocompleteError(true);
    }

    setIsAutocompleteError(false);
    setEmails(items => [...items, autocompletePress]);
    setAutocompleteValue('');
    setAutocompletePress('');
  }, [autocompleteValue, autocompletePress, emails]);

  const deleteEmailHandler = useCallback(
    (index: number) => {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      setEmails(newEmails);
    },
    [emails],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isUrgentlyHandler = useCallback(() => {
    setIsUrgently(value => !value);
  }, [isUrgently]);

  const onDateConfirm = useCallback((newDate: Date) => {
    setIsPickerOpen(false);
    setDate(newDate);
  }, []);

  const onDateCancel = useCallback(() => {
    setIsPickerOpen(false);
  }, []);

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

    if (route.name === teamsRoute) {
      if (emails.length === 0) {
        setDangerAutocompleteText('Добавьте пользователя');
        return setIsAutocompleteError(true);
      }
    }

    if (route.name === projectRoute) {
      if (!autocompletePress) {
        setDangerAutocompleteText('Ответственный не выбран');
        return setIsAutocompleteError(true);
      }
    }

    route.name === teamsRoute && (await createTeam(text, userId, emails));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await createProject(teamId, text));
    route.name === teamRoute && teamId && (await fetchProjects(teamId));

    route.name === projectRoute &&
      projectId &&
      (await createTask(
        projectId,
        text,
        autocompletePress,
        'inProgress',
        isUrgently,
        date,
      ));
    route.name === projectRoute && projectId && (await fetchTasks(projectId));

    setIsOpen(false);
  }, [teamId, projectId, text, autocompletePress, isUrgently, date, emails]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={text}
        placeholder={'Введите текст'}
        onChange={textHandler}
        isDanger={isTextError}
        dangerText={dangerText}
      />
      {route.name === teamsRoute && (
        <>
          <AppAutocomplete
            placeholder="Введите email пользователя"
            value={autocompleteValue}
            data={autocompleteData}
            isDisplay={isAutocomplete}
            isLoading={findUsersIsLoading}
            onChange={autocompleteHandler}
            onPress={onAutocompletePress}
            onAdd={onAdd}
            isDanger={isAutocompleteError}
            dangerText={dangerAutocompleteText}
          />
          <AppItemsGrid items={emails} onDelete={deleteEmailHandler} />
        </>
      )}
      {route.name === projectRoute && (
        <>
          <AppAutocompleteField
            placeholder="Выберите email ответственного"
            value={autocompleteValue}
            data={autocompleteData}
            isDisplay={isAutocomplete}
            isLoading={findUsersIsLoading}
            onChange={autocompleteHandler}
            onPress={onAutocompletePress}
            isDanger={isAutocompleteError}
            dangerText={dangerAutocompleteText}
          />
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={1}
            onPress={isUrgentlyHandler}>
            <AppCheckBox value={isUrgently} onValueChange={isUrgentlyHandler} />
            <AppText>Срочно</AppText>
          </TouchableOpacity>
          <AppText style={styles.date}>{`${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`}</AppText>
          <AppTextButton onPress={() => setIsPickerOpen(true)}>
            Выбрать дату
          </AppTextButton>
          <AppDatePicker
            date={date}
            isOpen={isPickerOpen}
            onConfirm={onDateConfirm}
            onCancel={onDateCancel}
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
