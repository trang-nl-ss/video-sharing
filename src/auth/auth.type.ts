export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  isNeedReset: boolean;
  token: string;
}

export interface TokenPayload {
  email: string;
}
