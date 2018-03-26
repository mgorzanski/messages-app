import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Home from './screens/Home';

class App extends React.Component {
  render() {
    return (
      <View>
        <Home />
      </View>
    );
  }
}

export default TabNavigator(
  {
      Home: { screen: Home }
  },
  {
      tabBarPosition: 'bottom'
  }
);