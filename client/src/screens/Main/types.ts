import {IProject} from 'models/ITasks';

export type TeamScreenNavigateType = {
  Team: {
    teamId: number;
    projects: IProject[];
  };
};

export interface IMainScreen {
  route: any;
}

export interface IModals {
  createIsOpen: boolean;
  setCreateIsOpen: (value: boolean) => void;
  deleteIsOpen: boolean;
  setDeleteIsOpen: (value: boolean) => void;
  changeIsOpen: boolean;
  setChangeIsOpen: (value: boolean) => void;
  id: number;
  text: string;
}

export interface IModalCreate {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface IModalChange {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: number;
  text: string;
}

export interface IModalDelete {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: number;
}
