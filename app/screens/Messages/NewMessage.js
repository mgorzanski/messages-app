import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, List, ListItem, Left, Right, Text, Header, Content } from 'native-base';
import Icon from './../../utils/Icon';

export default class NewMessage extends React.Component {
    static navigationOptions = {
        title: "New message",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerTintColor: globalStyles.$white
    };

    render() {
        return (
            <Container>
                <Header searchBar rounded style={styles.header} androidStatusBarColor={globalStyles.$headerBackgroundColor}>
                    <Item>
                        <Icon family="MaterialIcons" name="search" />
                        <Input placeholder="Search contacts" />
                    </Item>
                </Header>
                <Content style={styles.content}>
                    <List>
                        <ListItem>
                            <Left>
                                <Text>Simon Mignolet</Text>
                            </Left>
                            <Right>
                                <Icon family="MaterialIcons" name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Nathaniel Clyne</Text>
                            </Left>
                            <Right>
                                <Icon family="MaterialIcons" name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text>Dejan Lovren</Text>
                            </Left>
                            <Right>
                                <Icon family="MaterialIcons" name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        //margin:10
    },
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    }
});

NewMessage.propTypes = {
    navigation: PropTypes.object.isRequired
};