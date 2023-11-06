import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { auth } from '@/lib/firebaseConfig';
import useLoginState from '@/hooks/useLoginState';

export default function HeaderNav() {
  const { isUser } = useLoginState();
  return (
    <ul className="header__nav-right">
      <LoginNav />
      {isUser && <NavItem navName="mypage" />}
      <NavItem navName="cart" />
    </ul>
  );
}

function NavItem({ navName }: { navName: string }) {
  return (
    <li>
      <Link href={`/${navName}`}>{navName}</Link>
    </li>
  );
}

function LoginNav() {
  const { isUser, firebaseUser, snsSession } = useLoginState();
  const logout = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      if (firebaseUser) {
        auth.signOut();
      }

      if (snsSession) {
        signOut();
      }

      alert('로그아웃되었습니다.');
      window.location.replace('/');
    }
  };
  return (
    <li data-testid="login-state">
      {isUser ? <button onClick={logout}>logout</button> : <Link href={'/login'}>login</Link>}
    </li>
  );
}
