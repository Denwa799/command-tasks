import {TaskStatusType} from 'models/ITasks';

export type TeamScreenNavigateType = {
  Team: {
    teamId: number;
    creatorId: number;
  };
  Project: {
    projectId: number;
    creatorId: number;
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
  teamId?: number;
  projectId?: number;
  responsibleEmail?: string;
  status?: TaskStatusType;
  isUrgently?: boolean;
  date?: Date;
}

export interface IModalCreate {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  teamId?: number;
  projectId?: number;
}

export interface IModalChange {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: number;
  text: string;
  teamId?: number;
  responsibleEmail?: string;
  status?: TaskStatusType;
  isUrgently?: boolean;
  date?: Date;
  projectId?: number;
}

export interface IModalDelete {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: number;
  teamId?: number;
  projectId?: number;
}
