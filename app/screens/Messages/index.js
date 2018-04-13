import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MessagesList from './MessagesList';
import Profile from './../Profile';
import MessageThread from './MessageThread';
import * as globalStyles from './../../styles/globalStyles';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

const Messages = StackNavigator({
    MessagesList: { screen: MessagesList },
    Profile: { screen: Profile },
    MessageThread: { screen: MessageThread }
}, {
    cardStyle: {
        opacity: 1
    },
    transitionConfig: getSlideFromRightTransition
});

const tabBarIcon = () => (<Image source={require('./../../img/icons/messages.png')} style={globalStyles.tabBarIcon} />);
Messages.navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: tabBarIcon
}

export default Messages;