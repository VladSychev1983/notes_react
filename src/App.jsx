import './App.css'
import Form from './components/Form'
import React, { useState } from 'react';
import NotesList from './components/NotesList';



function App() {
  // eslint-disable-next-line no-unused-vars
  const [userData, setData] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [notesList, setList] = useState([]);
  const [counter, setCounter] = useState(0);

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!');
    console.log(event.target);
    const note = event.target.textContent;
    //делаем запрос в апи добавить заметку.
    setData(note);
    console.log("note", note);
    if(note) {
      createHttpRequest(note);
    }
    setCounter((prev) => prev + 1);
      }

  const createHttpRequest = async (note) => {
    const url = 'http://localhost:7070/notes';
    let dataToSend = {
            id: 0,
            content: note,
        }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResponseMessage(`created successfully: ${data}`);
      console.log('Success:', data);
    } catch (error) {
      // setResponseMessage(`Error message: ${error.message}`);
      console.error('Error:', error);
    }
    //получаем список заметок.
    getHttpRequest();
    console.log('createHttpRequest Called!');
  }

      const getHttpRequest = async () => {
      const url = 'http://localhost:7070/notes';
      const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
      await fetch(url, requestOptions)
      .then((res => res.json()))
      .then(json => { 
        if(callback) { 
          callback(json);}})
    }

  const callback = (json) => {
    setList([]);
    setList(json);
  }

  return (
    <React.Fragment>
      <div>
        {/* components here. */}
        <NotesList key={counter} notesList={notesList} />
        <Form onSubmit={handlerOnSubmit}/>
    {responseMessage && <p>{responseMessage}</p>}
      </div>
    </React.Fragment>
    )
}

export default App
