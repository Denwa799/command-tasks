import {TaskStatusType} from 'models/ITasks';

export type TeamScreenNavigateType = {
  Team: {
    teamId: number;
    creatorId: number;
  };
  Project: {
    projectId: number;
    creatorId: number;
    teamId: number;
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

interface IModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface IModalCreate extends IModal {
  teamId?: number;
  projectId?: number;
}

export interface IModalChange extends IModal {
  id: number;
  text: string;
  teamId?: number;
  responsibleEmail?: string;
  status?: TaskStatusType;
  isUrgently?: boolean;
  date?: Date;
  projectId?: number;
}

export interface IModalDelete extends IModal {
  id: number;
  teamId?: number;
  projectId?: number;
}
