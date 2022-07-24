export type TeamScreenNavigateType = {
  Team: {
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
}

export interface IModalCreate {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  teamId?: number;
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
