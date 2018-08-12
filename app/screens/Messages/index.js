import React from 'react';
import { StyleSheet, TouchableHighlight, RefreshControl } from 'react-native';
import { Container, Content, List, Toast } from 'native-base';
import Message from './Message';
import UserPanel from './UserPanel';
import * as globalStyles from './../../styles/globalStyles';
import MessagesApi from './../../api/MessagesApi';
import AsyncImage from './../../components/AsyncImage';
import { connect } from 'react-redux';
import * as pushNotifications from './../../pushNotifications';
import { socketUrl } from './../../config/socket';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

const styles = StyleSheet.create({
    home: {
        backgroundColor: globalStyles.$appBackgroundColor
    }
});

class Messages extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            threads: [],
            refreshing: false,
            threadsList: [],
            showToast: false,
            sockets: []
        };

        this.socket = io(socketUrl);
        this.allSockets = [];
    }

    getThreads() {
        MessagesApi.getThreads(this.props.user.data.token, this.props.user.data.userId)
            .then((result) => this.setState({ threads: result }))
            .catch(() => Toast.show({
                text: 'Cannot get any threads',
                buttonText: 'Close'
            }))
            .then(() => this.setState({ threadsList: this.state.threads.map((thread) => <Message key={thread._id} navigation={this.props.navigation} name={thread.name} message={thread.lastMessageText} date={thread.lastMessageDate} threadId={thread._id} userId={thread.userId} />)}))
            .then(() => {
                this.state.threads.forEach((thread) => {
                    if (this.allSockets[thread._id] === undefined) {
                        this.allSockets[thread._id] = this.socket.on(`new-message-threadId-${thread._id}`, (data) => {
                            if (data.userId !== this.props.user.data.userId) {
                                pushNotifications.newMessageNotification(data);
                                this.getThreads();
                            }
                        });
                    }
                });
            });
    }

    static navigationOptions = () => ({
        tabBarLabel: '',
        tabBarIcon: () => (
            <AsyncImage
                source={require('./../../img/icons/messages.png')}
                style={globalStyles.tabBarIcon}
                placeholderColor='#1e1e1e'
            />
        ),
        title: "Messages"
    });
    
    async getFcmToken() {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log(fcmToken);
        } else {
            // user doesn't have a device token yet   
        }
    }

    componentDidMount() {
        this.getFcmToken();
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => console.log(fcmToken));
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    componentWillMount() {
        this.getThreads();
        firebase.auth().signInAnonymously()
            .then(() => {
                firebase.messaging().hasPermission()
                    .then(enabled => {
                        if (enabled) {
                            this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
                                console.log(notification);
                            });
                            this.notificationListener = firebase.notifications().onNotification(() => {
                                //console.log(notification);

                                const notification = new firebase.notifications.Notification()
                                    .setNotificationId('notificationId')
                                    .setTitle('My notification title')
                                    .setBody('My notification body')
                                    .setData({
                                        key1: 'value1',
                                        key2: 'value2',
                                    });

                                    firebase.notifications().displayNotification(notification);
                            });
                        }
                    });
            });
    }

    render() {
        return (
            <Container style={styles.home}>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getThreads()} />
                }>
                    <TouchableHighlight onPress={() => 
                        this.props.navigation.navigate('Profile')
                    }>
                        <UserPanel />
                    </TouchableHighlight>
                    <List>
                        {this.state.threadsList}
                    </List>
                </Content>
            </Container>
        );
    }
}

Messages.propTypes = {
    user: PropTypes.object,
    navigation: PropTypes.object
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Messages);