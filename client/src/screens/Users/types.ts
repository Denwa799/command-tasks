import {IUser} from 'models/IUser';

export type UsersScreenNavigateType = {
  Teams: {};
};

export type DialogType = {
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  dialogQuitIsOpen: boolean;
  disabled: boolean;
  setIsOpen: (value: boolean) => void;
  setQuiteIsOpen: (value: boolean) => void;
  onDelete: () => void;
  onQuit: () => void;
};

export interface IModal {
  teamId: number;
  isOpen: boolean;
  usersInTeam: IUser[];
  setIsOpen: (value: boolean) => void;
}
