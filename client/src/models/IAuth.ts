export interface IAuthResponse {
  email: string;
  name: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
