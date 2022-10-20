import {AppDropdown} from 'components/AppDropdown';
import React, {FC, useEffect, useState} from 'react';
import {styles} from './styles';
import {IDropdown} from './types';

export const Dropdown: FC<IDropdown> = ({
  dangerText,
  placeholder,
  autocompletePress,
  isDanger,
  items,
  setAutocompletePress,
  setIsWrapperDisabled,
}) => {
  const [selectIsOpen, setSelectIsOpen] = useState(false);

  useEffect(() => {
    selectIsOpen ? setIsWrapperDisabled(true) : setIsWrapperDisabled(false);
  }, [selectIsOpen]);

  const selectUserHandler = () => setSelectIsOpen(true);

  const onDropdownItemClick = (id: number, name: string, email: string) => {
    setAutocompletePress(email);
    setSelectIsOpen(false);
    setIsWrapperDisabled(false);
  };

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
