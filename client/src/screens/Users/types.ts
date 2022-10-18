import {IUser} from 'models/IUser';

export type DialogType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onDelete: () => void;
  disabled: boolean;
};

export interface IModal {
  teamId: number;
  isOpen: boolean;
  usersInTeam: IUser[];
  setIsOpen: (value: boolean) => void;
}
