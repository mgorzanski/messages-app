import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, List, ListItem, Left, Right, Text, Header, Content } from 'native-base';
import Icon from './../../utils/Icon';

export default class NewMessage extends React.Component {
    static navigationOptions = {
        title: "New message",
        headerTintColor: globalStyles.$white
    };

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
                            <Input placeholder="Search contacts" />
                        </Item>
                    </Header>
                    <Content>
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
        return (null);
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    }
});