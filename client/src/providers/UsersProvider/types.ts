import {IUser} from 'models/IUser';
import {ReactNode} from 'react';

export interface IUsersContext {
  foundUsers: IUser[];
  findUsersIsLoading: boolean;
  updateUserIsLoading: boolean;
  searchUsersByEmail: (email: string) => void;
  updateUser: (id: number, name: string) => void;
}

export interface IUsersProvider {
  children: ReactNode;
}
