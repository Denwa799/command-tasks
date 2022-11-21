import {AppAutocompleteField} from 'components/AppAutocompleteField';
import {AppModal} from 'components/AppModal';
import {useAuth} from 'hooks/useAuth';
import {useDebounce} from 'hooks/useDebounce';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {IModal} from './types';

export const ModalCreate: FC<IModal> = ({
  teamId,
  isOpen,
  usersInTeam,
  setIsOpen,
}) => {
  const {user} = useAuth();
  const {foundUsers, findUsersIsLoading, searchUsersByEmail} = useUsers();
  const {selectedTeamId, addUserInTeamIsLoading, addUserInTeam, fetchTeam} =
    useTeams();
  const {fetchTeamInvitations} = useInvitations();

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);

  const [errorText, setErrorText] = useState('Пользователь уже в команде');
  const [isError, setIsError] = useState(false);

  const [pressEmail, setPressEmail] = useState('');
  const [userId, setUserId] = useState(0);

  const [isDisplay, setIsDisplay] = useState(false);

  const data = useMemo(() => {
    return foundUsers.map(item => item.email);
  }, [foundUsers]);

  useEffect(() => {
    setValue('');
    setIsError(false);
  }, [isOpen]);

  useEffect(() => {
    if (debouncedValue.length > 0) {
      searchUsersByEmail(debouncedValue.toLowerCase());
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (data.length > 0 && debouncedValue.length > 0) {
      setIsDisplay(true);
    } else {
      setIsDisplay(false);
    }

    if (value === pressEmail) {
      setIsDisplay(false);
    }
  }, [data, value, pressEmail, debouncedValue]);

  useEffect(() => {
    const foundUser = foundUsers.find(item => item.email === pressEmail);
    foundUser && setUserId(foundUser.id);
  }, [pressEmail]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onChange = useCallback((itemValue: string) => {
    setValue(itemValue);
    setIsError(false);
  }, []);

  const onPress = useCallback(
    (email: string) => {
      setIsError(false);
      setPressEmail(email);
      setValue(email);
    },
    [pressEmail],
  );

  const onCreate = useCallback(async () => {
    if (!pressEmail) {
      setErrorText('Email не выбран');
      return setIsError(true);
    }
    if (user?.id === userId) {
      setErrorText(
        'Email не должен быть таким же, как почта владельца аккаунта',
      );
      return setIsError(true);
    }
    if (usersInTeam.find(item => item.id === userId)) {
      setErrorText('Пользователь уже в команде');
      return setIsError(true);
    }
    await addUserInTeam(userId, teamId);
    setIsOpen(false);
    fetchTeam(selectedTeamId);
    fetchTeamInvitations(selectedTeamId);
  }, [user, userId, teamId, selectedTeamId, usersInTeam]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppAutocompleteField
        placeholder={'Введите email'}
        value={value}
        onChange={onChange}
        data={data}
        onPress={onPress}
        isDisplay={isDisplay}
        isLoading={findUsersIsLoading}
        isDanger={isError}
        dangerText={errorText}
      />
      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Добавить"
          onPress={onCreate}
          disabled={addUserInTeamIsLoading}
        />
      </AppModal.Actions>
    </AppModal>
  );
};
