import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SettingsList from './SettingsList';
import Profile from './../Profile';

export default class Settings extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/settings.png')}
                style={styles.tabBarIcon}
            />
        ),
    };

    render() {
        return (<StackNav />);
    }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 45,
        height: 45
    }
});

const StackNav = StackNavigator({
    SettingsList: { screen: SettingsList },
    Profile: { screen: Profile }
});