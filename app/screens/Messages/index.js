import React from 'react';
import { StyleSheet, View, TouchableHighlight, RefreshControl } from 'react-native';
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
            render: false,
            showToast: false,
            sockets: []
        };

        this.socket = io(socketUrl);
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 100);
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
                const sockets = this.state.sockets.slice();
                this.state.threads.forEach((thread) => {
                    if (sockets[thread._id] === undefined) {
                        sockets[thread._id] = this.socket.on(`new-message-threadId-${thread._id}`, (data) => {
                            if (data.userId !== this.props.user.data.userId) {
                                pushNotifications.newMessageNotification(data);
                                this.getThreads();
                            }
                        });
                        this.setState({ sockets });
                    }
                });
            });
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '',
        tabBarIcon: () => (
            <AsyncImage
                source={require('./../../img/icons/messages.png')}
                style={globalStyles.tabBarIcon}
                placeholderColor='#1e1e1e'
            />
        ),
        title: "Messages",
        headerRight: (
            <View style={globalStyles.headerMultipleIcons}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('SearchMessages')
                } style={globalStyles.headerIcon}>
                    <AsyncImage 
                        source={require('./../../img/icons/search.png')}
                        style={globalStyles.icon}
                        placeholderColor={globalStyles.$headerBackgroundColor}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('NewMessage')
                } style={globalStyles.headerIcon}>
                    <AsyncImage 
                        source={require('./../../img/icons/add.png')}
                        style={globalStyles.icon}
                        placeholderColor={globalStyles.$headerBackgroundColor}
                    />
                </TouchableHighlight>
            </View>
        )
    });

    render() {
        const render = this.state.render;

        return (
            <Container style={styles.home}>
                { render ? (
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
                ) : (null) }
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