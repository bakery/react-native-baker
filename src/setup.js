import App from './containers/App';
import React from 'React';
import { Provider } from 'react-redux';
import configureStore from './store';
import Parse from 'parse/react-native';
import { serverURL, applicationId } from '../env';

const store = configureStore();

function setup() {
  Parse.initialize(applicationId);
  Parse.serverURL = `${serverURL}/parse`;

  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
