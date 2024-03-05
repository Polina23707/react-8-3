import { createContext } from "react";

export const AuthContext = createContext({
  token: '',
  profile: {
    avatar:'',
    id: '',
    login: '',
    name: '',
  }
})