import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    
    const response = await api.post('/projects', {
      "title": `Novo Projeto ${Date.now()}`,
      "owner": "Gustavo"
    });

    setProjects([...projects, response.data]);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* <View style={styles.container}>
        {projects.map(project => (
          <Text key={project.id} style={styles.title} >{project.title}</Text>
        ))}
      </View> */}

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text key={project.id} style={styles.title} >{project.title}</Text>
          )}
        />

        <TouchableOpacity activeOpacity={0.6} onPress={handleAddProject} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    color: '#FFF',
    fontSize: 30
  },
  button: {
    backgroundColor: '#fcfcfc',
    height: 50,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  buttonText: {
    fontSize: 20
  }

});