import React, { Fragment, useState } from 'react';

import useDataApi from 'use-data-api';

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'http://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] },
  );

  console.log(data)

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `http://hn.algolia.com/api/v1/search?query=${query}`,
          );

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
              <p>&ensp;by: {item.author}&ensp;Points: {item.points}</p>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
