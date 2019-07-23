import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/navbar/Navbar';
import { CssBaseline } from '@material-ui/core';
import Home from './components/home/Home';
import NewContact from './components/newContact/NewContact';
import UpdateContact from './components/updateContact/UpdateContact';
import Alert from './components/common/Alert';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/newcontact' component={NewContact} />
            <Route exact path='/updatecontact/:_id' component={UpdateContact} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
