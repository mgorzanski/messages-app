import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Content, List } from 'native-base';
import Message from './Message';
import UserPanel from './UserPanel';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';

export default class Messages extends React.Component {
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
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (
            <View style={globalStyles.headerMultipleIcons}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('SearchMessages')
                } style={globalStyles.headerIcon}>
                    <Image 
                        source={require('./../../img/icons/search.png')}
                        style={globalStyles.icon}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
                } style={globalStyles.headerIcon}>
                    <Image 
                        source={require('./../../img/icons/add.png')}
                        style={globalStyles.icon}
                    />
                </TouchableHighlight>
            </View>)
    });

    render() {
        return (
            <Container style={styles.home}>
                <Content>
                    <TouchableHighlight onPress={() => 
                        this.props.navigation.navigate('Profile')
                    }>
                        <UserPanel />
                    </TouchableHighlight>
                    <List>
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message navigation={this.props.navigation} userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
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