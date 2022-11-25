import {AppField} from 'components/AppField';
import React, {FC, useCallback} from 'react';
import {ITextField} from './types';

export const TextField: FC<ITextField> = ({
  textValue,
  placeholder,
  dangerText,
  isDanger,
  setText,
  setIsTextError,
}) => {
  const onChange = useCallback(
    (value: string) => {
      setText(value);
      setIsTextError(false);
    },
    [textValue],
  );

  return (
    <AppField
      value={textValue}
      placeholder={placeholder}
      dangerText={dangerText}
      isDanger={isDanger}
      onChange={onChange}
    />
  );
};
