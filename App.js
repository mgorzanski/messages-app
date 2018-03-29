import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Home from './screens/Home/index';
import Contacts from './screens/Contacts';
import Settings from './screens/Settings';

export default TabNavigator(
  {
      Home: { screen: Home },
      Contacts: { screen: Contacts },
      Settings: { screen: Settings },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        height: 65,
        backgroundColor: '#1e1e1e'
      },
      tabStyle: {
        height:60,
        margin:0,
        padding:0,
      },
      indicatorStyle: {
        display: 'none'
      },
      iconStyle: {
        width: 65,
        height: 65,
        marginTop: 5
      },
      inactiveBackgroundColor: '#1e1e1e',
      activeBackgroundColor: '#2d2d2d',
    },
    tabBarPosition: 'bottom'
  }
);