import React from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Badge, Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import Icon from './../../utils/Icon';

export default class Groups extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <View>
                <Image
                    source={require('./../../img/icons/groups.png')}
                    style={globalStyles.tabBarIcon}
                />
                <Badge style={globalStyles.tabBarBadge}>
                    <Text>1</Text>
                </Badge>
            </View>
        ),

        title: "Groups",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (
            <View style={globalStyles.iconSpacingRight}>
                <TouchableHighlight onPress={() =>
                    this.props.navigation.navigate('AddGroup')
                }>
                    <Icon family="MaterialIcons" name="group-add" style={globalStyles.vectorIcon} />
                </TouchableHighlight>
            </View>)
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('./../../img/icons/user2.png')} />
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
                                <Thumbnail source={require('./../../img/icons/user2.png')} />
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
                                <Thumbnail source={require('./../../img/icons/user2.png')} />
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
    }
});

Groups.propTypes = {
    navigation: PropTypes.object.isRequired
}