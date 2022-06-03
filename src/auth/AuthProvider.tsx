import { useContext, createContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { SignInPayload, SignInResponse, TokenPayload } from "./auth.type";

interface AuthContextState {
  isAuthenticated: boolean;
  token?: string;
  tokenPayload?: TokenPayload;
  signIn: (payload: SignInPayload) => Promise<void>;
  logOut: () => void;
}
interface AuthProviderProps {
  children?: React.ReactNode;
}

const defaultValue: AuthContextState = {
  isAuthenticated: false,
  token: undefined,
  tokenPayload: undefined,
  signIn: (payload: SignInPayload) => {
    throw new Error("signIn function is not implemeted");
  },
  logOut: () => {
    throw new Error("logOut function is not implemeted");
  },
};

const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>();
  const [authChecked, setAuthChecked] = useState(false);
  const [tokenPayload, setTokenPayload] = useState<TokenPayload | undefined>();

  const signIn = async (payload: SignInPayload) => {
    const { data } = await authService.signIn<SignInResponse>(payload);
    authService.saveToken(data.token);
    setToken(data.token);
  };
  const logOut = () => {
    authService.removeToken();
  };

  useEffect(() => {
    setAuthChecked(true);
    const token = authService.getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token && !tokenPayload) {
      const tokenPayload = authService.validateToken(token);
      setTokenPayload(tokenPayload);
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        tokenPayload,
        signIn,
        logOut,
      }}
    >
      {authChecked && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook must be inside a AuthProvider");
  }
  return context;
};
