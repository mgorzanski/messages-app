import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, List, ListItem, Text, Header, Content, Body, Thumbnail, Button } from 'native-base';
import Icon from './../../utils/Icon';

export default class AddContact extends React.Component {
    static navigationOptions = () => ({
        title: "Add contact",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerTintColor: globalStyles.$white
    });

    render() {
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
                            <Thumbnail roundend size={50} source={require('./../../img/icons/user2.png')} />
                            <Body>
                                <Text>Sankhadeep</Text>
                            </Body>
                            <Button transparent success>
                                <Text>Invite</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Thumbnail roundend size={50} source={require('./../../img/icons/user2.png')} />
                            <Body>
                                <Text>Supriya</Text>
                            </Body>
                            <Button transparent success>
                                <Text>Invite</Text>
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Thumbnail roundend size={50} source={require('./../../img/icons/user2.png')} />
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
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    }
});