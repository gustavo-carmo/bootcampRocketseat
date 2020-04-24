import React from 'react';

// export default function Header(props) // Recebendo dessa forma, eu vou ter um objeto com todas as propriedades que ele recebem.
// por default todo componente do react tem uma propriedade children, que recebe todo html dentro do componente
export default function Header({ title = 'teste', children = <ul><li>teste</li></ul> }) { // = 'teste' estou passando um valor default
  return (
    <header>
      <h1>{title}</h1>

      {children}
    </header>
  );
}