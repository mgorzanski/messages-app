import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Toast, Input, List, ListItem, Left, Right, Text, Header, Content, Footer } from 'native-base';
import Icon from './../../utils/Icon';
import ContactsApi from './../../api/ContactsApi';
import MessagesApi from './../../api/MessagesApi';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import ActionButton from 'react-native-circular-action-menu';

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: globalStyles.$white,
    },
    actionButton: {
        flex: 1
    },
    footer: {
        backgroundColor: globalStyles.$white
    }
});

class NewGroup extends React.Component {
    static navigationOptions = {
        title: "New group",
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
        const checkedUsers = new Array();
        const contacts = contactsList.map((contact) => 
            <ListItem key={contact._id} onPress={() => this.createNewMessage(contact._id)}>
                <Left>
                    <Text>{contact.fullName}</Text>
                </Left>
                <Right>
                    <CheckBox
                        checkBoxColor={globalStyles.$black}
                        checkedCheckBoxColor={globalStyles.$black}
                        onClick={() => checkedUsers.push(contact._id)}
                    />
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
                <Footer style={styles.footer}>
                    <ActionButton buttonColor={globalStyles.$appBackgroundColor} style={styles.actionButton}>
                        <ActionButton.Item buttonColor={globalStyles.$black} title="Create group" onPress={() => {
                            
                        }}>
                            <Icon family="MaterialIcons" name="add" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(NewGroup);