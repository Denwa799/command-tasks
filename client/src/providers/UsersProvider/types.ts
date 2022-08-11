import {ReactNode} from 'react';

export interface IUsersContext {
  updateUserIsLoading: boolean;
  updateUser: (id: number, name: string) => void;
}

export interface IUsersProvider {
  children: ReactNode;
}
