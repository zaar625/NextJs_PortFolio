import React, { MouseEventHandler } from 'react';

export default function MenuBtn({
  btnHandler,
  children
}: {
  btnHandler: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button aria-label="메뉴 버튼" type="button" className="menu" onClick={btnHandler}>
      {children}
    </button>
  );
}
