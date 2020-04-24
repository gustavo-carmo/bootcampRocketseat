import React from 'react';
// O render é uma função dentro do react-dom que serve para colocar o HTML recebido, dentro do elemento encontrado. 
import { render } from 'react-dom';

import App from './App';

render(<App />, document.getElementById('app'));