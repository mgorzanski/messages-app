import React from 'react';
import { Image, View } from 'react-native';
import { Badge, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
import * as globalStyles from './../../styles/globalStyles';
import getSlideFromRightTransitionConfig from 'react-navigation-slide-from-right-transition';
import GroupsList from './GroupsList';

export default class Groups extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('./../../img/icons/groups.png')}
                    style={globalStyles.tabBarIcon}
                />
                <Badge style={globalStyles.tabBarBadge}>
                    <Text>1</Text>
                </Badge>
            </View>
        ),
    };

    render() {
        return (<GroupsRouter />);
    }
}

const GroupsRouter = StackNavigator({
    GroupsList: { screen: GroupsList }
}, {
    cardStyle: {
        opacity: 1
    },
    transitionConfig: getSlideFromRightTransitionConfig
});