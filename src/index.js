import React from 'react';
import ReactDOM from 'react-dom';

import List from './containers/List';

const App = () => {
  return (
    <div >
      {/* <nav className='navbar sticky-top navbar-light bg-dark'>
        <h1 className='navbar-brand text-light'>MovieList</h1>
      </nav> */}

      <List />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
