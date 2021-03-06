import React from 'react';
import * as globalStyles from './../../styles/globalStyles';
import { StyleSheet } from 'react-native';
import { Container, Item, Input, Button, Text, Header, Content } from 'native-base';
import Icon from './../../utils/Icon';

export default class SearchMessages extends React.Component {
    static navigationOptions = {
        header:  null
    };

    render() {
        return (
            <Container>
                <Header searchBar rounded style={styles.header} androidStatusBarColor={globalStyles.$headerBackgroundColor}>
                    <Item>
                        <Icon family="MaterialIcons" name="search" />
                        <Input placeholder="Search messages" />
                    </Item>
                </Header>
                <Content style={styles.content}>
                    <Button full dark onPress={() => this.props.navigation.goBack()}>
                        <Text>Back</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        margin:10
    },
    header: {
        backgroundColor: globalStyles.$headerBackgroundColor,
        height: 64
    }
});