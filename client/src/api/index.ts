import axios from 'axios';
import {IAuthResponse} from 'models/IAuth';

export const LoginService = (api: string, email: string, password: string) => {
  return axios.post<IAuthResponse>(api, {
    email: email,
    password: password,
  });
};

export const RegistrationService = (
  api: string,
  email: string,
  password: string,
  name: string,
) => {
  return axios.post<IAuthResponse>(api, {
    email: email,
    name: name,
    password: password,
  });
};

export const RefreshService = (api: string, tokenRefresh: string = '') => {
  return axios.post(
    `${api}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${tokenRefresh}`,
      },
    },
  );
};

export const GetService = (
  api: string,
  tokenBearer: string = '',
  params = {},
) => {
  return axios.get(`${api}`, {
    headers: {
      Authorization: `Bearer ${tokenBearer}`,
    },
    params,
  });
};
