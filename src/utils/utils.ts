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

export function getRefreshToken():string {
  return localStorage.getItem('refreshToken') || 'token not found';
}

export function removeRefreshToken() {
  localStorage.removeItem('refreshToken');
}

export function refreshToken() {
  if (!getRefreshToken()) return false;
  return api.refreshToken(getRefreshToken())
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
