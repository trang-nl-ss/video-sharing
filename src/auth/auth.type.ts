export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignInResponse {
  isNeedReset: boolean;
  token: string;
}

export interface TokenPayload {
  
}
