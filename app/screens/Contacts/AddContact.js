import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, List, ListItem, Text, Header, Content, Body, Button } from 'native-base';
import Icon from './../../utils/Icon';
import AsyncImage from './../../components/AsyncImage';

export default class AddContact extends React.Component {
    static navigationOptions = () => ({
        title: "Add contact",
        headerTintColor: globalStyles.$white
    });

    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 50);
    }

    render() {
        const render = this.state.render;
        if (render) {
            return (
                <Container>
                    <Header searchBar rounded style={styles.header} androidStatusBarColor={globalStyles.$headerBackgroundColor}>
                        <Item>
                            <Icon family="MaterialIcons" name="search" />
                            <Input placeholder="Search users" />
                        </Item>
                    </Header>
                    <Content>
                        <List>
                            <ListItem>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$white} />
                                <Body>
                                    <Text>Sankhadeep</Text>
                                </Body>
                                <Button transparent success>
                                    <Text>Invite</Text>
                                </Button>
                            </ListItem>
                            <ListItem>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$white} />
                                <Body>
                                    <Text>Supriya</Text>
                                </Body>
                                <Button transparent success>
                                    <Text>Invite</Text>
                                </Button>
                            </ListItem>
                            <ListItem>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$white} />
                                <Body>
                                    <Text>Shivraj</Text>
                                </Body>
                                <Button transparent success>
                                    <Text>Invite</Text>
                                </Button>
                            </ListItem>
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