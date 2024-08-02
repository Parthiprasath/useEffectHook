import React, { useState, useEffect } from 'react';
import './DataFetcher.css';

function DataFetcher() {
  // Declare state variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);

  // useEffect hook to fetch data when fetchDataTrigger changes
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    if (fetchDataTrigger) {
      fetchData();
      setFetchDataTrigger(false); // Reset the trigger after fetching data
    }
  }, [fetchDataTrigger]);

  // Function to trigger data fetching
  const handleFetchData = () => {
    setFetchDataTrigger(true);
  };

  return (
    <div className="data-fetcher">
      <h1>Posts</h1>
      <button onClick={handleFetchData}>Fetch Posts</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.slice(0, 5).map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DataFetcher;
