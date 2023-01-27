import { getCookie, setCookie, deleteCookie } from "./cookie";
import api from "./api";

export function setAccessToken(token: string): void {
  setCookie('accessToken', token);
}

export function getAccessToken() {
  return getCookie('accessToken');
}

export function removeAccessToken() {
  deleteCookie('accessToken');
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token);
}

export function getRefreshToken():string | undefined {
  return localStorage.getItem('refreshToken') || undefined;
}

export function removeRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export function refreshToken() {
  const rToken = getRefreshToken();
  if (rToken === undefined) return false;
  return api.refreshToken(rToken)
    .then(res => {
      if (res?.success) {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        return true;
      } else {
        return false;
      }
    })
    .catch(e => {
      console.log(e);
      return false;
    })
}
