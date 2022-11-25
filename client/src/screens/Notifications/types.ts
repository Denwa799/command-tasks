import {ViewToken} from 'react-native';

export type DialogType = {
  isOpen: boolean;
  disabled: boolean;
  isDelete?: boolean;
  setIsOpen: (value: boolean) => void;
  onAccept: () => void;
};

export type OnViewableItemsChangedType = (info: {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}) => void;
