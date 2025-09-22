import React from "react"
import { useState, useEffect } from 'react';

function NotesList({notesList}) {
    const[jsonData,setJsonData] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const handleRefresh = () => {
    window.location.reload();
    };

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
    console.log('Response get http:', json);
    setJsonData(json)
    console.log('notesList:',notesList)
    console.log('jsonData', jsonData)
    
  }
    useEffect(() => { 
    getHttpRequest();
     },[]);   

    const deleteHttpRequest = async (id) => {
        console.log('Request delete id:', id);
        const url = 'http://localhost:7070/notes';
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
        const response = await fetch(url+'/'+ id, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        } catch (error) {
        console.error('Error:', error);
        }
        getHttpRequest();
    }

    return (
        <React.Fragment>
            <h3>Notes</h3>
            <button onClick={getHttpRequest}>Обновить</button>
            <div className="flex-container">
                    {
                        jsonData.map((item, index) => (
                            <div className="flex-item" id={item.id} key={index}>
                                <div className="btn-delete" key={index} id={item.id} onClick={()  => deleteHttpRequest(item.id)}>X</div>
                                {item.content}
                            </div>
                        ))
                    }
                    </div>
               
        </React.Fragment>
    )
}
export default NotesList;