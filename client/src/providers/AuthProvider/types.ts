import {IUser} from 'models/IUser';
import {ReactNode} from 'react';

export interface IAuthContext {
  user: IUser | null;
  isEmailActivated: boolean;
  isLoading: boolean;
  emailActivationIsLoading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  emailActivation: (email: string, code: number) => void;
}

export interface IAuthProvider {
  children: ReactNode;
}
