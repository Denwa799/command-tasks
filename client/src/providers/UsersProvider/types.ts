import {IUser} from 'models/IUser';
import {ReactNode} from 'react';

export interface IUsersContext {
  foundUsers: IUser[];
  passwordIsEquals: boolean;
  passwordIsRecovery: boolean;
  findUsersIsLoading: boolean;
  updateUserIsLoading: boolean;
  passwordEqualsIsLoading: boolean;
  changePasswordIsLoading: boolean;
  checkEmailIsLoading: boolean;
  passwordRecoveryIsLoading: boolean;
  searchUsersByEmail: (email: string) => void;
  updateUser: (id: number, name: string) => void;
  checkPasswordEquals: (password: string) => void;
  cleanPasswordEquals: () => void;
  changePassword: (id: number, password: string) => void;
  checkEmail: (email: string) => void;
  passwordRecovery: (email: string, code: number) => void;
}

export interface IUsersProvider {
  children: ReactNode;
}
