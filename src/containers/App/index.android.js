/*
 *
 * App
 *
 */

import React, { Component, View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

import { createSelector } from 'reselect';
import appSelector from '../../selectors/appSelector';


class App extends Component {
  render() {
    return (
      <View>
        <Text>App</Text>
      </View>
    );
  }
}

const mapStateToProps = createSelector(
  appSelector
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
