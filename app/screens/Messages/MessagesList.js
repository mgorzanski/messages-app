import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Content, List } from 'native-base';
import Message from './Message';
import UserPanel from './UserPanel';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';

export default class MessagesList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Messages",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (
            <View style={globalStyles.headerMultipleIcons}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
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
                        <TouchableHighlight onPress={() =>
                            this.props.navigation.navigate('MessageThread')    
                        }>
                            <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        </TouchableHighlight>
                        <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
                        <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="13:39" />
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

MessagesList.propTypes = {
    navigation: PropTypes.object.isRequired
};