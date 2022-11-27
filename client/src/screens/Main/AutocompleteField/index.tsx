import {useRoute} from '@react-navigation/native';
import {AppAutocomplete} from 'components/AppAutocomplete';
import {AppItemsGrid} from 'components/AppItemsGrid';
import {teamsRoute} from 'constants/variables';
import {useDebounce} from 'hooks/useDebounce';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {IAutocompleteField} from './types';

export const AutocompleteField: FC<IAutocompleteField> = ({
  userEmail,
  pressText,
  dangerText,
  emails,
  data,
  isOpen,
  error,
  onPress,
  onDangerText,
  setEmails,
  onError,
}) => {
  const route = useRoute();

  const {searchUsersByEmail, findUsersIsLoading} = useUsers();

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 500);

  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    setValue('');
    onError(false);
    setEmails([]);
  }, [isOpen]);

  useEffect(() => {
    if (debouncedValue.length > 0 && route.name === teamsRoute) {
      searchUsersByEmail(debouncedValue.toLowerCase());
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (data.length > 0 && debouncedValue.length > 0) {
      setIsDisplay(true);
    } else {
      setIsDisplay(false);
    }

    if (value === pressText) {
      setIsDisplay(false);
    }
  }, [data, value, pressText, debouncedValue]);

  const onAutocomplete = () => (itemValue: string) => {
    setValue(itemValue);
    onError(false);
  };

  const onAutocompletePress = () => (email: string) => {
    onError(false);
    onPress(email);
    setValue(email);
  };

  const onDelete = useCallback(
    (index: number) => {
      const newEmails = [...emails];
      newEmails.splice(index, 1);
      setEmails(newEmails);
    },
    [emails],
  );

  const onAdd = useCallback(() => {
    if (!value) {
      onDangerText('Пустое поле');
      return onError(true);
    }

    if (!pressText) {
      onDangerText('Email не выбран');
      return onError(true);
    }

    if (value !== pressText) {
      onDangerText('Выберите email');
      return onError(true);
    }

    if (pressText === userEmail) {
      onDangerText(
        'Email не должен быть таким же, как почта владельца аккаунта',
      );
      return onError(true);
    }

    const email = emails.find(element => element === pressText);
    if (email) {
      onDangerText('Email уже добавлен');
      return onError(true);
    }

    onError(false);
    setEmails(items => [...items, pressText]);
    setValue('');
    onPress('');
  }, [value, pressText, emails]);

  return (
    <>
      <AppAutocomplete
        placeholder="Введите email пользователя"
        value={value}
        dangerText={dangerText}
        data={data}
        isDisplay={isDisplay}
        isLoading={findUsersIsLoading}
        isDanger={error}
        onChange={onAutocomplete}
        onPress={onAutocompletePress}
        onAdd={onAdd}
      />
      <AppItemsGrid items={emails} onDelete={onDelete} />
    </>
  );
};
