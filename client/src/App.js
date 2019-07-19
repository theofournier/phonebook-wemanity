import React from 'react';
import logo from './images/logo.png';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </Provider>
  );
};

export default App;
