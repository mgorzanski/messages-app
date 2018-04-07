import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ContactsList from './ContactsList';
import AddContact from './AddContact';

export default class Contacts extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/contacts.png')}
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
    ContactsList: { screen: ContactsList },
    AddContact: { screen: AddContact }
}, {
    cardStyle: {
        opacity: 1
    }
});