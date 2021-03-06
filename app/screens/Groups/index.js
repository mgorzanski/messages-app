import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge, Container, Content, List, ListItem, Left, Body, Right } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import AsyncImage from './../../components/AsyncImage';

export default class Groups extends React.PureComponent {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <View>
                <AsyncImage
                    source={require('./../../img/icons/groups.png')}
                    style={globalStyles.tabBarIcon}
                    placeholderColor='#1e1e1e'
                />
                <Badge style={globalStyles.tabBarBadge}>
                    <Text>1</Text>
                </Badge>
            </View>
        ),
        title: "Groups"
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$appBackgroundColor} />
                            </Left>
                            <Body>
                                <Text style={styles.title}>Kumar Pratik, Kumar Sanket, Megha</Text>
                                <Text note style={styles.message}>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note style={styles.timestamp}>3:43</Text>
                            </Right>
                        </ListItem>

                        <ListItem avatar>
                            <Left>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$appBackgroundColor} />
                            </Left>
                            <Body>
                                <Text style={styles.title}>Kumar Pratik, Kumar Sanket, Megha</Text>
                                <Text note style={styles.message}>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note style={styles.timestamp}>3:43</Text>
                            </Right>
                        </ListItem>

                        <ListItem avatar>
                            <Left>
                                <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.thumbnail} placeholderColor={globalStyles.$appBackgroundColor} />
                            </Left>
                            <Body>
                                <Text style={styles.title}>Kumar Pratik, Kumar Sanket, Megha</Text>
                                <Text note style={styles.message}>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note style={styles.timestamp}>3:43</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.$appBackgroundColor,
    },
    title: {
        color: globalStyles.$white
    },
    message: {
        color: globalStyles.$darkGray,
        fontSize: 13
    },
    timestamp: {
        color: globalStyles.$darkGray,
        fontSize: 13
    },
    thumbnail: {
        width: 56,
        height: 56
    }
});