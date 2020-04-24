import React from 'react';

import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header title="Marshmallow" >
        <ul>
          <li>Homepage</li>
          <li>Projects</li>
        </ul>
      </Header>
      <Header title="Bobão" >
        <ul>
          <li>Uma noite no museu</li>
          <li>Bad Boys</li>
        </ul>
      </Header>
      <Header title="Onipotente e oniciente" />
      <Header>
        <h2>Oh, My God!!!</h2>
      </Header>
    </>
  );
}