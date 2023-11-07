import React from 'react';
import './base-button.scss';

type Props = {
  children?: React.ReactNode;
  className?: React.ReactNode;
  onClick?: (e: any) => void;
};
const Button = (props: Props) => {
  return (
    <button type="button" className={`btn-outline btn ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default React.memo(Button);
