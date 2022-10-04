import {ViewToken} from 'react-native';

export type DialogType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onAccept: () => void;
  disabled: boolean;
  isDelete?: boolean;
};

export type OnViewableItemsChangedType = (info: {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}) => void;
