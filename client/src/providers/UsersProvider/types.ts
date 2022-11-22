import {IUser} from 'models/IUser';
import {ReactNode} from 'react';

export interface IUsersContext {
  foundUsers: IUser[];
  passwordIsEquals: boolean;
  findUsersIsLoading: boolean;
  updateUserIsLoading: boolean;
  passwordEqualsIsLoading: boolean;
  changePasswordIsLoading: boolean;
  searchUsersByEmail: (email: string) => void;
  updateUser: (id: number, name: string) => void;
  checkPasswordEquals: (password: string) => void;
  cleanPasswordEquals: () => void;
  changePassword: (id: number, password: string) => void;
}

export interface IUsersProvider {
  children: ReactNode;
}
