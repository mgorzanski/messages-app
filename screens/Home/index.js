import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MessagesList from './MessagesList';
import Profile from './../Profile';
import * as globalStyles from './../../styles/globalStyles';

export default class Home extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/home.png')}
                style={globalStyles.tabBarIcon}
            />
        ),
    };

    render() {
        return (<StackNav />);
    }
}

const StackNav = StackNavigator({
    MessagesList: { screen: MessagesList },
    Profile: { screen: Profile }
}, {
    cardStyle: {
        opacity: 1
    }
});