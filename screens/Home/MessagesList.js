import React from 'react';
import { ScrollView, StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import Message from './Message';
import UserPanel from './UserPanel';
import * as globalStyles from './../../styles/globalStyles';

export default class MessagesList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "MESSAGES",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerLeft: (
            <View style={globalStyles.iconSpacingLeft}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
                }>
                    <Image 
                        source={require('./../../img/icons/search.png')}
                        style={globalStyles.icon}
                    />
                </TouchableHighlight>
            </View>
        ),
        headerRight: (
            <View style={globalStyles.iconSpacingRight}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
                }>
                    <Image 
                        source={require('./../../img/icons/add.png')}
                        style={globalStyles.icon}
                    />
                </TouchableHighlight>
            </View>)
    });

    render() {
        return (
            <View style={styles.home}>
                <UserPanel />
                <ScrollView>
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                    <Message userName="Lorem Ipsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    }
});