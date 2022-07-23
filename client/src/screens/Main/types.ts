export type TeamScreenNavigateType = {
  Team: {
    teamId: string;
  };
};

export interface IModals {
  createIsOpen: boolean;
  setCreateIsOpen: (value: boolean) => void;
  deleteIsOpen: boolean;
  setDeleteIsOpen: (value: boolean) => void;
  id: number;
}

export interface IModalCreate {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface IModalDelete {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: number;
}
