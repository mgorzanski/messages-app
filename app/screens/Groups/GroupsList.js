import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Badge, Text, Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import Icon from './../../utils/Icon';

export default class GroupsList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "GROUPS",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerLeft: (<View></View>),
        headerRight: (
            <View style={globalStyles.iconSpacingRight}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddGroup')
                }>
                    <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                </TouchableHighlight>
            </View>)
    });

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem avatar style={styles.item}>
                            <Left style={styles.avatar}>
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Badge style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        +2
                                    </Text>
                                </Badge>
                            </Left>
                            <Body>
                                <Text style={styles.title}>Kumar Pratik, Kumar Sanket, Megha</Text>
                                <Text note style={styles.message}>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note style={styles.timestamp}>3:43</Text>
                            </Right>
                        </ListItem>

                        <ListItem avatar style={styles.item}>
                            <Left style={styles.avatar}>
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Badge style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        +2
                                    </Text>
                                </Badge>
                            </Left>
                            <Body>
                                <Text style={styles.title}>Kumar Pratik, Kumar Sanket, Megha</Text>
                                <Text note style={styles.message}>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note style={styles.timestamp}>3:43</Text>
                            </Right>
                        </ListItem>
                        
                        <ListItem avatar style={styles.item}>
                            <Left style={styles.avatar}>
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Thumbnail style={styles.thumbnail} source={require('./../../img/icons/user2.png')} />
                                <Badge style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        +2
                                    </Text>
                                </Badge>
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
    badge: {
        backgroundColor: globalStyles.$gray
    },
    badgeText: {
        color: globalStyles.$black,
        fontSize: 11
    },
    thumbnail: {
        width: 29,
        height: 29
    },
    avatar: {
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
    item: {
        borderBottomWidth: 0.25,
        borderStyle: 'solid',
        borderBottomColor: globalStyles.$darkGray,
    }
});

GroupsList.propTypes = {
    navigation: PropTypes.object.isRequired
}