
import React from "react"
function NotesList({notesList}) {

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
    console.log(json);
  }
  getHttpRequest();

    console.log (notesList);

    return (
        <React.Fragment>
            <h3>Notes</h3>
            <button onClick={getHttpRequest}>Обновить</button>
            <div className="flex-container">
                    {
                        [...notesList].map((item, index) => (
                            <div className="flex-item" id={item.id} key={index}>
                                {item.content}
                            </div>
                        ))
                    }
                    </div>
               
        </React.Fragment>
    )
}
export default NotesList;