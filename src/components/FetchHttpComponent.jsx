import React, { useState, useEffect } from 'react';

function FetchHttpComponent(note) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async (note) => {
        let dataToSend = {
            id: 0,
            content: note,
        }
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),

        }
      try {
        const response = await fetch(import.meta.env.BACKEND_API, requestOptions); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);
    return(
        <div>
            <h2>Fetched Data</h2>
             {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
        </div>
    );
}
export default FetchHttpComponent;