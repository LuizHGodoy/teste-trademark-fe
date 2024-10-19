import { getCurrentUser, signIn, signUp } from "@/services/api/sign-in";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (userData: any) => Promise<void>;
  create: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = async (userData: any) => {
    const loginData = await signIn(userData);
    const token = await loginData.access_token;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    const currentUser = await getCurrentUser(loginData.user_uuid);
    localStorage.setItem("user", JSON.stringify(currentUser));
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const create = async (userData: any) => {
    const createData = await signUp(userData);

    const token = await createData.access_token;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    const currentUser = await getCurrentUser(createData.user_uuid);
    localStorage.setItem("user", JSON.stringify(currentUser));
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, create, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
