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

    componentWillMount() {
        this.getThreads();
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

const styles = StyleSheet.create({
    home: {
        backgroundColor: globalStyles.$appBackgroundColor
    }
});

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Messages);