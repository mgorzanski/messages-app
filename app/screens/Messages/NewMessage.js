import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Toast, Input, List, ListItem, Left, Right, Text, Header, Content } from 'native-base';
import Icon from './../../utils/Icon';
import ContactsApi from './../../api/ContactsApi';
import MessagesApi from './../../api/MessagesApi';
import { connect } from 'react-redux';
import Contacts from '../Contacts';

class NewMessage extends React.Component {
    static navigationOptions = {
        title: "New message",
        headerTintColor: globalStyles.$white
    };

    constructor(props) {
        super(props);
        this.state = {
            contactsList: [],
            contactsLoaded: false,
            showToast: false
        };
    }

    componentDidMount() {
        this.getContacts();
    }

    getContacts() {
        ContactsApi.getContacts(this.props.user.data.token, this.props.user.data.userId)
        .then((contacts) => {
            this.setState({ contactsList: contacts, contactsLoaded: true });
        });
    }

    createNewMessage(contactId) {
        ContactsApi.getThreadIdByContactId(this.props.user.data.token, this.props.user.data.userId, contactId)
            .then((thread) => {
                this.props.navigation.navigate('MessageThread', {name: thread.name, threadId: thread._id, userId: contactId});
            })
            .catch(() => {
                MessagesApi.createThread(this.props.user.data.token, this.props.user.data.userId, contactId)
                    .then((thread) => {
                        this.props.navigation.navigate('MessageThread', {name: thread.name, threadId: thread._id, userId: contactId});
                    })
                    .catch(() => {
                        Toast.show({
                            text: 'An error occurred',
                            buttonText: 'Close'
                        });
                    });
            });
    }

    render() {
        const { contactsList, contactsLoaded } = this.state;
        const contacts = contactsList.map((contact) => 
            <ListItem key={contact._id} onPress={() => this.createNewMessage(contact._id)}>
                <Left>
                    <Text>{contact.fullName}</Text>
                </Left>
                <Right>
                    <Icon family="MaterialIcons" name="arrow-forward" />
                </Right>
            </ListItem>
        );

        return (
            <Container>
                <Header searchBar rounded style={styles.header} androidStatusBarColor={globalStyles.$headerBackgroundColor}>
                    <Item>
                        <Icon family="MaterialIcons" name="search" />
                        <Input placeholder="Search contacts" />
                    </Item>
                </Header>
                <Content>
                    { contactsLoaded ? (
                        <List>
                            { contacts }
                        </List>
                    ) : null }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    }
});

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(NewMessage);