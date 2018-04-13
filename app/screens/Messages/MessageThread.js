import React from 'react';
import { Container, Content, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';

const styles = StyleSheet.create({
    contacts: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1,
        margin: 10
    }
});

export default class MessageThread extends React.Component {
    static navigationOptions = {
            title: "Lorem Ipsum",
            headerStyle: globalStyles.headerStyle,
            headerTitleStyle: globalStyles.headerTitleStyle,
            headerRight: (<Icon family="MaterialIcons" name="more-vert" style={globalStyles.stackNavIcon} />),
            headerTintColor: globalStyles.$white,
            tabBarVisible: false
    };

    render() {
        return (
            <Container>
                <Content>
                    <Text>Test</Text>
                </Content>
            </Container>
        );
    }
}