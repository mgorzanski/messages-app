import React from 'react';
import { Image, View, Text } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class Groups extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/groups.png')}
                style={globalStyles.tabBarIcon}
            />
        ),
    };

    render() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        );
    }
}