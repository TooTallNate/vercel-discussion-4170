import React from 'react';
import Header from './Header';
import Collection from './Collection';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Collection />
      </div>
    );
  }
}

export default App;
