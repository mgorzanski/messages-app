import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, List, ListItem, Text, Header, Content, Body, Button, Toast } from 'native-base';
import Icon from './../../utils/Icon';
import AsyncImage from './../../components/AsyncImage';
import { connect } from 'react-redux';
import ContactsApi from './../../api/ContactsApi';

class AddContact extends React.Component {
    static navigationOptions = () => ({
        title: "Add contact",
        headerTintColor: globalStyles.$white
    });

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            contacts: [],
            searchPerformed: false,
            showToast: false
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 50);
    }

    searchUsers(searchQuery) {
        ContactsApi.searchUsers(this.props.user.data.token, this.props.user.data.userId, searchQuery)
        .then((results) => this.setState({ contacts: results, searchPerformed: true }))
        .catch(() => Toast.show({
            text: 'Cannot get any results',
            buttonText: 'Close'
        }));
    }

    render() {
        const render = this.state.render;
        let contacts = this.state.contacts;
        const searchPerformed = this.state.searchPerformed;

        contacts = contacts.map((contact) => 
            <ListItem key={contact._id}>
                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$white} />
                <Body>
                    <Text>{contact.fullName}</Text>
                    <Text note>{contact.username}</Text>
                </Body>
                <Button transparent success>
                    <Text>Invite</Text>
                </Button>
            </ListItem>
        );

        if (render) {
            return (
                <Container>
                    <Header searchBar rounded style={styles.header} androidStatusBarColor={globalStyles.$headerBackgroundColor}>
                        <Item>
                            <Icon family="MaterialIcons" name="search" />
                            <Input placeholder="Search users" onSubmitEditing={(event) => {
                                this.searchUsers(event.nativeEvent.text);
                            }} />
                        </Item>
                    </Header>
                    <Content>
                        <List>
                            { searchPerformed ? contacts : null }
                        </List>
                    </Content>
                </Container>
            );
        }
        return (null);
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    },
    thumbnail: {
        width: 56,
        height: 56
    }
});

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(AddContact);