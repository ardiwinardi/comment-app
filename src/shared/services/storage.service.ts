import { storageKeys } from "../constants/storage.constant";

const storageService = {
  saveToken(token: string) {
    localStorage.setItem(storageKeys.ACCESS_TOKEN, token);
  },

  getToken(): string | null {
    const token = localStorage.getItem(storageKeys.ACCESS_TOKEN);
    return token;
  },

  removeToken() {
    localStorage.removeItem(storageKeys.ACCESS_TOKEN);
  },
};

export default storageService;
