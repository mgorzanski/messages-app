import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class Profile extends React.Component {
    static navigationOptions = () => ({
        title: "PROFILE",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (<View></View>),
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