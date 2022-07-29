import {useRoute} from '@react-navigation/native';
import {AppCheckBox} from 'components/AppCheckBox';
import {AppDatePicker} from 'components/AppDatePicker';
import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/AppTextButton';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTasks} from 'hooks/useTasks';
import {useTeams} from 'hooks/useTeams';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
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

  const [responsible, setResponsible] = useState('');
  const [isResponsibleError, setIsResponsibleError] = useState(false);
  const [dangerResponsibleText, setDangerResponsibleText] =
    useState('Пустое поле');

  const [isUrgently, setIsUrgently] = useState(false);

  const [date, setDate] = useState(
    useMemo(() => {
      return new Date();
    }, []),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const {createTeam, fetchTeams, createIsLoading, fetchTeam} = useTeams();
  const {createProject, fetchProject} = useProjects();
  const {createTask} = useTasks();

  useEffect(() => {
    setText('');
    setIsTextError(false);
    setResponsible('');
    setIsResponsibleError(false);
    setIsUrgently(false);
  }, [isOpen]);

  const textHandler = useCallback(
    (value: string) => {
      setText(value);
      setIsTextError(false);
    },
    [text],
  );

  const responsibleHandler = useCallback(
    (value: string) => {
      setResponsible(value);
      setIsResponsibleError(false);
    },
    [responsible],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isUrgentlyHandler = useCallback(() => {
    setIsUrgently(value => !value);
  }, [isUrgently]);

  const onDateConfirm = useCallback((date: Date) => {
    setIsPickerOpen(false);
    setDate(date);
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
        if (text.length < 3) {
          setDangerResponsibleText('Меньше 3 символов');
        }
        if (text.length > 50) {
          setDangerResponsibleText('Больше 50 символов');
        }
        if (!text) {
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
            style={styles.isUrgently}
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
          disabled={createIsLoading}
        />
      </View>
    </AppModal>
  );
};
