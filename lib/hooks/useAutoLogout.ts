// hooks/useAutoLogout.ts
import { useEffect } from 'react';
//@ts-ignore
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useAutoLogout() {
  const router = useRouter();

  useEffect(() => {
    const expStr = localStorage.getItem('expire_at');
    if (!expStr) {
      doLogout();
      return;
    }

    const expiryDate = new Date(expStr.replace(' ', 'T'));  

    const msLeft = expiryDate.getTime() - Date.now();  

    if (msLeft <= 0) {
      // Already expired
      doLogout();
    } else {
      const id = window.setTimeout(doLogout, msLeft);  

      return () => window.clearTimeout(id);  
    }
  }, []);

  const doLogout = () => {
    Cookies.remove('auth_token', { path: '/' });

    localStorage.removeItem('expire_at');
    localStorage.removeItem('user');

    router.replace('/auth/login');
  };
}