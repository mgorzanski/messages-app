import React from 'react';
import { ScrollView, Text } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class Profile extends React.PureComponent {
    static navigationOptions = () => ({
        title: "Profile",
        headerTintColor: globalStyles.$white
    });

    render() {
        return (
            <ScrollView>
                <Text>Test</Text>
            </ScrollView>
        );
    }
}