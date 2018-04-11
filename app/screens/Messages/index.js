import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MessagesList from './MessagesList';
import Profile from './../Profile';
import MessageThread from './MessageThread';
import * as globalStyles from './../../styles/globalStyles';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

export default class Messages extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/messages.png')}
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
    Profile: { screen: Profile },
    MessageThread: { screen: MessageThread }
}, {
    cardStyle: {
        opacity: 1
    },
    transitionConfig: getSlideFromRightTransition
});