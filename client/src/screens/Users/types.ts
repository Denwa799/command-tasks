import {IUser} from 'models/IUser';

export type DialogType = {
  isOpen: boolean;
  disabled: boolean;
  setIsOpen: (value: boolean) => void;
  onDelete: () => void;
};

export interface IModal {
  teamId: number;
  isOpen: boolean;
  usersInTeam: IUser[];
  setIsOpen: (value: boolean) => void;
}
