import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

export default function useLoginState() {
  const { data: snsSession } = useSession();
  const [firebaseUser, setFirebaseUser] = useState<null | string>(null);

  useEffect(() => {
    // 파이어베이스 로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setFirebaseUser(uid);
        // ...
      } else {
        setFirebaseUser(null);
        // User is signed out
        // ...
      }
    });
    return unsubscribe;
  }, []);

  const isUser = firebaseUser || snsSession?.user?.name;

  return { isUser, firebaseUser, snsSession };
}
