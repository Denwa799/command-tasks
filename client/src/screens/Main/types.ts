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
  id: number;
  teamId?: number;
  projectId?: number;
  text: string;
  responsibleEmail?: string;
  dialogTitle?: string;
  statusAction: TaskStatusType | '';
  createIsOpen: boolean;
  dialogIsOpen: boolean;
  changeIsOpen: boolean;
  isUrgently?: boolean;
  date?: Date;
  status?: TaskStatusType;
  onUpdateData: () => void;
  setChangeIsOpen: (value: boolean) => void;
  setDialogIsOpen: (value: boolean) => void;
  setCreateIsOpen: (value: boolean) => void;
}

interface IModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onUpdateData: () => void;
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

export interface IModalDialog extends IModal {
  id: number;
  teamId?: number;
  projectId?: number;
  title?: string;
  statusAction: TaskStatusType | '';
}
