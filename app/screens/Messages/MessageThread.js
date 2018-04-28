import React from 'react';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import SingleMessage from './SingleMessage';
import { NavigationActions } from 'react-navigation';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    thread: {
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
            headerTintColor: globalStyles.$white
    };

    componentWillMount() {
        const setParamsAction = NavigationActions.setParams({
            params: { hideTabBar: true },
            key: 'tab-name'
        });
        this.props.navigation.dispatch(setParamsAction);
    }

    componentWillUnmount() {
        const setParamsAction = NavigationActions.setParams({
            params: { hideTabBar: false },
            key: 'tab-name'
        });
        this.props.navigation.dispatch(setParamsAction);
    }

    render() {
        return (
            <Container style={styles.container}>
                <ScrollView>
                    <Content style={styles.thread}>
                        <SingleMessage text="Testowa wiadomość" author="a" />
                        <SingleMessage text="..." author="me" />
                        <SingleMessage text="abcd" author="a" />
                        <SingleMessage text="Testowa wiadomość" author="me" />
                        <SingleMessage text="Testowa wiadomość" author="me" />
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}