import storageService from "@src/shared/services/storage.service";
import { ReactNode, createContext, useEffect } from "react";
import { User } from "../../domain/entities/user.entity";
import { useLazyGetMeQuery } from "../controllers/auth.controller";

type AuthContextType = {
  user: User | null;
  logout: () => void;
  getMe: () => void;
};

const initialAuthContext: AuthContextType = {
  user: null,
  logout: () => false,
  getMe: () => false,
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [getMe, getMeResult] = useLazyGetMeQuery();

  useEffect(() => {
    getMe();
  }, []);

  const logout = async () => {
    storageService.removeToken();
    await getMe();
  };

  return (
    <AuthContext.Provider
      value={{
        user: getMeResult.data ?? null,
        logout,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
