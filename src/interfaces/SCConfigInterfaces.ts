import { Token } from 'simple-oauth2';

export interface ISCConfig {
  id: string;
  secret: string;
  redirectUri: string;
}

export interface ISCBaseHttpOptions {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  withCredentials: boolean;
  credentials: string;
}

export interface ISCOptions {
  urls: {
    me: string;
    authorize: string;
  };
  tokenExpiration: number;
  credentials: {
    auth: {
      tokenPath: string;
      tokenHost: string;
    };
    options: {
      authorizationMethod?: 'header' | 'body';
    };
    client: {
      id: string;
      secret: string;
    };
  };
  accessTokenLastSet: number;
  redirect_uri: string;
  accessToken: string;
  baseHttpOptions: ISCBaseHttpOptions;
  refreshToken: Token;
}

export interface ISCRequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
}
