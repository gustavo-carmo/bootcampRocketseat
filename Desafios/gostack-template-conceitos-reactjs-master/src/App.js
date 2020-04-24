import React, { useEffect, useState } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories ] = useState([]);

  useEffect(() => {

    api.get('/repositories').then(response => {
      
      setRepositories(response.data);
    });

  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      "title": `Novo Repo ${Date.now()}`,
      "url": "http://github.com/gustavo-carmo/newRepo",
      "techs": ["NodeJS", "ReactJS", "Que viagem é essa bicho?"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
