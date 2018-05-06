import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, RefreshControl } from 'react-native';
import { Container, Content, List } from 'native-base';
import Message from './Message';
import UserPanel from './UserPanel';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import MessagesApi from './../../api/MessagesApi';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            threads: [],
            refreshing: false,
            threadsList: []
        };
    }

    componentWillMount() {
        this.getThreads();
    }

    getThreads() {
        MessagesApi.getThreads().then((result) => this.setState({ threads: result })).then(() => this.setState({ threadsList: this.state.threads.map((thread) => <Message key={thread._id} navigation={this.props.navigation} name={thread.name} message="Testowa wiadomość..." date="13:39" />)}));
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/messages.png')}
                style={globalStyles.tabBarIcon}
            />
        ),
        tabBarVisible: navigation.state.params != undefined ? !navigation.state.params.hideTabBar : true,
        title: "Messages",
        headerRight: (
            <View style={globalStyles.headerMultipleIcons}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('SearchMessages')
                } style={globalStyles.headerIcon}>
                    <Image 
                        source={require('./../../img/icons/search.png')}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('NewMessage')
                } style={globalStyles.headerIcon}>
                    <Image 
                        source={require('./../../img/icons/add.png')}
                    />
                </TouchableHighlight>
            </View>)
    });

    render() {
        return (
            <Container style={styles.home}>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getThreads()} />
                }>
                    <TouchableHighlight onPress={() => 
                        this.props.navigation.navigate('Profile')
                    }>
                        <UserPanel />
                    </TouchableHighlight>
                    <List>
                        {this.state.threadsList}
                    </List>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    home: {
        backgroundColor: globalStyles.$appBackgroundColor
    }
});

Messages.propTypes = {
    navigation: PropTypes.object.isRequired
};