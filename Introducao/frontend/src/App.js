import React, { useState, useEffect } from 'react';

import api from './services/api';
import Header from './components/Header';
import './App.css';

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    api.get('/projects').then(response => {
      setProjects(response.data);
    });

  }, []);

  async function handleAddANewProject() {
    setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Gustavo da Silva do Carmo"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id} >{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddANewProject}>Adiciona um novo projeto</button>
    </>
  );
}