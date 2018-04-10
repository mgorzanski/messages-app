import React from 'react';
import { Image, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ContactsList from './ContactsList';
import AddContact from './AddContact';
import * as globalStyles from './../../styles/globalStyles';
import { Badge, Text } from 'native-base';

export default class Contacts extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('./../../img/icons/contacts.png')}
                    style={globalStyles.tabBarIcon}
                />
                <Badge style={globalStyles.tabBarBadge}>
                    <Text>2</Text>
                </Badge>
            </View>
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