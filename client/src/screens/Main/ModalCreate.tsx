import {useRoute} from '@react-navigation/native';
import {AppAutocomplete} from 'components/AppAutocomplete';
import {AppCheckBox} from 'components/AppCheckBox';
import {AppDatePicker} from 'components/AppDatePicker';
import {AppField} from 'components/AppField';
import {AppItemsGrid} from 'components/AppItemsGrid';
import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/AppTextButton';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useDebounce} from 'hooks/useDebounce';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {getUserEmail} from 'utils/getSession';
import {styles} from './styles';
import {IModalCreate} from './types';

export const ModalCreate: FC<IModalCreate> = ({
  isOpen,
  setIsOpen,
  teamId,
  projectId,
}) => {
  const route = useRoute();

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

  const [responsible, setResponsible] = useState('');
  const [isResponsibleError, setIsResponsibleError] = useState(false);
  const [dangerResponsibleText, setDangerResponsibleText] =
    useState('Пустое поле');

  const [isUrgently, setIsUrgently] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const [date, setDate] = useState(
    useMemo(() => {
      return new Date();
    }, []),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const {createTeam, fetchTeams, createTeamIsLoading, fetchTeam} = useTeams();
  const {createProject, fetchProject, createProjectIsLoading} = useProjects();
  const {createTask, createTaskIsLoading} = useTasks();
  const {searchUsersByEmail, foundUsers, findUsersIsLoading} = useUsers();

  const autocompleteData = useMemo(() => {
    return foundUsers.map(user => user.email);
  }, [foundUsers]);

  useEffect(() => {
    const getEmail = async () => {
      setUserEmail(await getUserEmail());
    };
    getEmail();
  }, []);

  useEffect(() => {
    setText('');
    setIsTextError(false);
    setAutocompleteValue('');
    setAutocompletePress('');
    setResponsible('');
    setIsResponsibleError(false);
    setIsUrgently(false);
    setIsAutocompleteError(false);
  }, [isOpen]);

  useEffect(() => {
    if (debouncedAutocompleteValue.length > 0) {
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

  const responsibleHandler = useCallback(
    (value: string) => {
      setResponsible(value);
      setIsResponsibleError(false);
    },
    [responsible],
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

    if (route.name === projectRoute) {
      if (!responsible || responsible.length < 3 || responsible.length > 50) {
        if (responsible.length < 3) {
          setDangerResponsibleText('Меньше 3 символов');
        }
        if (responsible.length > 50) {
          setDangerResponsibleText('Больше 50 символов');
        }
        if (!responsible) {
          setDangerResponsibleText('Пустое поле');
        }
        return setIsResponsibleError(true);
      }
    }

    route.name === teamsRoute && (await createTeam(text));
    route.name === teamsRoute && (await fetchTeams());

    route.name === teamRoute && teamId && (await createProject(teamId, text));
    route.name === teamRoute && teamId && (await fetchTeam(teamId));

    route.name === projectRoute &&
      projectId &&
      (await createTask(
        projectId,
        text,
        responsible,
        'inProgress',
        isUrgently,
        date,
      ));
    route.name === projectRoute && projectId && (await fetchProject(projectId));

    setIsOpen(false);
  }, [teamId, projectId, text, responsible, isUrgently, date]);

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
          <AppField
            value={responsible}
            placeholder={'Введите ответственного'}
            onChange={responsibleHandler}
            isDanger={isResponsibleError}
            dangerText={dangerResponsibleText}
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
          <AppTextButton
            text="Выбрать дату"
            onPress={() => setIsPickerOpen(true)}
          />
          <AppDatePicker
            date={date}
            isOpen={isPickerOpen}
            onConfirm={onDateConfirm}
            onCancel={onDateCancel}
          />
        </>
      )}
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
          disabled={
            createTeamIsLoading || createProjectIsLoading || createTaskIsLoading
          }
        />
      </View>
    </AppModal>
  );
};
