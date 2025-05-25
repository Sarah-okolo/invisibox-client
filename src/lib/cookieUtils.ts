import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'fallback-secret-key-2024';

export const setCookie = (name: string, value: string, days: number = 7, encrypt: boolean = true) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  const cookieValue = encrypt ? CryptoJS.AES.encrypt(value, SECRET_KEY).toString() : value;
  
  document.cookie = `${name}=${cookieValue};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

export const getCookie = (name: string, encrypted: boolean = true): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      if (encrypted) {
        try {
          const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
          return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
          console.error('Error decrypting cookie:', error);
          return null;
        }
      }
      return value;
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
