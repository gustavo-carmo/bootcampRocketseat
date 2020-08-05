import React, { ButtonHTMLAttributes } from 'react';

import { Component } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Component {...rest}>{children}</Component>
);

export default Button;
