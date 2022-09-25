import {AppDropdown} from 'components/AppDropdown';
import React, {FC, useCallback, useState} from 'react';
import {styles} from './styles';
import {IDropdown} from './types';

export const Dropdown: FC<IDropdown> = ({
  dangerText,
  placeholder,
  autocompletePress,
  isDanger,
  items,
  setAutocompletePress,
}) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  const selectUserHandler = useCallback(() => {
    setSelectIsOpen(true);
  }, []);

  const onDropdownItemClick = useCallback(
    (id: number, name: string, email: string) => {
      setAutocompletePress(email);
      setSelectIsOpen(false);
    },
    [],
  );

  return (
    <AppDropdown
      placeholder={autocompletePress ? autocompletePress : placeholder}
      onPress={selectUserHandler}
      style={styles.appDropdown}
      isOpen={selectIsOpen}
      setIsOpen={setSelectIsOpen}
      items={items ? items : []}
      onItemClick={onDropdownItemClick}
      isDanger={isDanger}
      dangerText={dangerText}
    />
  );
};
