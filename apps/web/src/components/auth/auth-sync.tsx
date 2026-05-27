'use client';

import {
  useAuth,
} from '@clerk/nextjs';

import {
  useEffect,
} from 'react';

export function AuthSync() {
  const { getToken } =
    useAuth();

  useEffect(() => {
    async function sync() {
      const token =
        await getToken({
          template:
            'nestjs',
        });

      console.log(
        'CLERK TOKEN:',
        token,
      );

      if (token) {
        localStorage.setItem(
          'token',
          token,
        );
      }
    }

    sync();
  }, [getToken]);

  return null;
}