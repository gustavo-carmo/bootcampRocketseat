import React, { ButtonHTMLAttributes } from 'react';

import { Component } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Component {...rest}>
    {loading ? 'Carregando...' : children}
  </Component>
);

export default Button;
