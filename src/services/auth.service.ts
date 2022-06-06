import Cookies from "js-cookie";
import { HttpClient, HttpResponse } from "../lib/http";
import { parseJwt } from "../lib/jwt";
import { SignInPayload, TokenPayload } from "../auth/auth.type";

const domain = process.env.REACT_APP_DOMAIN_DEV

const baseUrl = `${domain}/api`

const authHttpClient = new HttpClient({
  baseUrl,
});
const TOKEN_KEY = "token";

export const authService = {
  async signIn<T>(payload: SignInPayload): Promise<HttpResponse<T>> {
    return authHttpClient.post<SignInPayload>("/login", payload);
  },
  saveToken(token: string) {
    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.exp) {
      Cookies.set(TOKEN_KEY, token, {
        expires: new Date(decodedToken.exp * 1000),
      });
    } else {
      throw new Error("malformed token");
    }
  },
  getToken(): string | undefined {
    console.log(Cookies)
    return Cookies.get(TOKEN_KEY);
  },
  validateToken(token: string): TokenPayload | undefined {
    const decodedToken = parseJwt(token);
    if (!decodedToken) {
      return undefined;
    }
    return decodedToken;
  },
  removeToken() {
    Cookies.remove(TOKEN_KEY);
  }
};
