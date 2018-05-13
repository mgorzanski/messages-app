import React from 'react';
import { Container, Content, Form, Item, Textarea, Button, Text, Toast } from 'native-base';
import { StyleSheet } from 'react-native';
import SingleMessage from './SingleMessage';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';
import { socketUrl } from './../../config/socket';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import MessagesApi from './../../api/MessagesApi';

class MessageThread extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
            title: navigation.state.params.name,
            headerRight: (<Icon family="MaterialIcons" name="more-vert" style={globalStyles.stackNavIcon} />),
            headerTintColor: globalStyles.$white
    });

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            data: { threadId: this.props.navigation.state.params.threadId, userId: this.props.user.data.userId, message: '' },
            showToast: false,
            messages: [],
            users: [],
            messagesLoaded: false
        }

        this.socket = io(socketUrl);
    }

    componentWillMount() {
        this.getMessages();
    }

    getMessages() {
        MessagesApi.getMessagesFromThread(this.props.user.data.token, this.props.navigation.state.params.threadId)
        .then((result) => this.setState({ messages: result.messages, users: result.users }))
        .catch(() => Toast.show({
            text: 'Cannot load messages from this thread',
            buttonText: 'Close'
        }))
        .then(() => {
            let users = this.state.users.slice();
            users = users.filter((item) => item !== null && item !== undefined);
            this.setState({ users });
        })
        .then(() => this.setState({ messages: this.state.messages.map((message) => {
            const author = this.state.users.find(user => user._id === message.userId);
            return <SingleMessage key={message._id} text={message.message} {...author} />;
        })}))
        .then(() => this.setState({ messagesLoaded: true }));
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 500);
    }

    render() {
        const render = this.state.render;
        const messages = this.state.messages;
        const messagesLoaded = this.state.messagesLoaded;

        return (
            <Container style={styles.container}>
                { render ? (
                    <React.Fragment>
                    <Content
                        style={styles.thread}
                        ref={c => this.component = c}>
                            { messagesLoaded ? messages : null }
                    </Content>
                    <Form style={styles.form}>
                        <Item rounded style={styles.item}>
                            <Textarea rowSpan={1} placeholder="Text" rounded style={styles.textarea} onChangeText={(message) => {
                                const data = this.state.data;
                                data.message = message;
                                this.setState({ data });
                            }} ref={component => this._textInput = component} />
                        </Item>
                        <Button rounded style={styles.sendButton} onPress={() => {
                            const data = this.state.data;
                            const messages = this.state.messages.slice();
                            const author = this.state.users.find(user => user._id === this.props.user.data.userId);
                            const singleMessage = <SingleMessage text={data.message} {...author} />;
                            messages.push(singleMessage);
                            
                            this.socket.emit('send-message', data);
                            data.message = '';

                            this.setState({ data, messages });
                            setTimeout(() => {
                                this._textInput.setNativeProps({text: ''})
                                this.component._root.scrollToEnd();
                            }, 1);
                        }}><Text>Send</Text></Button>
                    </Form>
                </React.Fragment>
                ) : null }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    thread: {
        flex: 1,
        padding: 10,
    },
    form: {
        paddingLeft:6,
        paddingRight:6,
        backgroundColor: globalStyles.$formBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        borderColor: globalStyles.$transparent,
        backgroundColor: globalStyles.$darkGray,
        flex: 1,
        margin:5,
    },
    textarea: {
        height:45,
        width: '100%'
    },
    sendButton: {
        alignSelf: 'center',
        backgroundColor: globalStyles.$sendButtonBackgroundColor
    }
});

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(MessageThread);