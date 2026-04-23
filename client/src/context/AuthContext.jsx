import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, [token]);

  const saveAuth = (tokenValue, userValue) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userValue));
    setToken(tokenValue);
    setUser(userValue);
  };

  const register = async (name, email, password) => {
    const response = await API.post("/auth/register", {
      name,
      email,
      password
    });

    const { token: tokenValue, user: userValue } = response.data;
    saveAuth(tokenValue, userValue);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await API.post("/auth/login", {
      email,
      password
    });

    const { token: tokenValue, user: userValue } = response.data;
    saveAuth(tokenValue, userValue);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}