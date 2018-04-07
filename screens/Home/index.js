import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MessagesList from './MessagesList';
import Profile from './../Profile';

export default class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/home.png')}
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
    MessagesList: { screen: MessagesList },
    Profile: { screen: Profile }
}, {
    cardStyle: {
        opacity: 1
    }
});