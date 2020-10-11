import React, { useEffect, useState} from "react";
import Api from 'services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  useEffect(()=> {
    Api.get('repositories')
    .then(response => setRepositories(response.data))
  }, []);

  async function handleAddRepository() {
    var data;
    if( title.length > 1 ){
     data = {title, url};
      
    }
    else{
      data= {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"]};
    }
    const responseApi = await  Api.post('repositories', data)
    setRepositories([...repositories, responseApi.data])
  }

  async function handleRemoveRepository(id) {
    const responseApi = await Api.delete(`repositories/${id}`);  
    setRepositories(repositories.filter(repository =>  repository.id !== id))
  
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )}
        
      </ul>
      <input 
        type='text' 
        onChange={event => setTitle(event.target.value)}
        placeholder="Title repository"
          />
      <input 
        type='text'
        onChange={event => setUrl(event.target.value)}
          placeholder='Url repository'
        />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
