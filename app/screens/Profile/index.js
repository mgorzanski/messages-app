import React from 'react';
import { ScrollView, Text } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import AfterInteractions from './../../components/AfterInteractions';

export default class Profile extends React.PureComponent {
    static navigationOptions = () => ({
        title: "Profile",
        headerTintColor: globalStyles.$white
    });

    render() {
        return (
            <AfterInteractions>
            <ScrollView>
                <Text>Test</Text>
            </ScrollView>
            </AfterInteractions>
        );
    }
}