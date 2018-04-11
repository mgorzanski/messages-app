import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SettingsList from './SettingsList';
import Profile from './../Profile';
import * as globalStyles from './../../styles/globalStyles';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

export default class Menu extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/menu.png')}
                style={globalStyles.tabBarIcon}
            />
        ),
    };

    render() {
        return (<StackNav />);
    }
}

const StackNav = StackNavigator({
    SettingsList: { screen: SettingsList },
    Profile: { screen: Profile }
}, {
    cardStyle: {
        opacity: 1
    },
    transitionConfig: getSlideFromRightTransition
});