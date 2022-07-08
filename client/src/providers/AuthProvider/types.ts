import React from 'react';

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  //register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  //logout: () => Promise<void>;
}

export interface IAuthProvider {
  children: React.ReactNode;
}

export interface IUser {
  token: string;
}
