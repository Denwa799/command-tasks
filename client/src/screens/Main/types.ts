export type TeamScreenNavigateType = {
  Team: {
    teamId: string;
  };
};

export interface IModals {
  createIsOpen: boolean;
  setCreateIsOpen: (value: boolean) => void;
}

export interface IModalCreate {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
