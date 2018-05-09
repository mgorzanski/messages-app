import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Badge, Container, Content, List, ListItem, Left, Body, Right } from 'native-base';
import * as globalStyles from './../../styles/globalStyles';
import Icon from './../../utils/Icon';
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
        return (
            <Container style={styles.container}>
                { render ? (
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
                ) : (null) }
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