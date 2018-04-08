import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ContactsList from './ContactsList';
import AddContact from './AddContact';
import * as globalStyles from './../../styles/globalStyles';

export default class Contacts extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/contacts.png')}
                style={globalStyles.tabBarIcon}
            />
        ),
    };

    render() {
        return (<StackNav />);
    }
}

const StackNav = StackNavigator({
    ContactsList: { screen: ContactsList },
    AddContact: { screen: AddContact }
}, {
    cardStyle: {
        opacity: 1
    }
});