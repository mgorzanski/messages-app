import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Font } from 'expo';
import * as globalStyles from './../../styles/globalStyles';

const styles = StyleSheet.create({
    contacts: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1,
        margin: 10
    },
    label: {
        color: globalStyles.$white,
        fontSize: 14
    },
    input: {
       color: globalStyles.$white 
    }
});

export default class AddContact extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            'RobotoMono-Regular': require('./../../fonts/RobotoMono-Regular.ttf')
        });
    }

    static navigationOptions = () => ({
        title: "ADD CONTACT",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (<View></View>),
        headerTintColor: globalStyles.$white
    });

    render() {
        return (
            <ScrollView style={styles.contacts}>
                <View style={styles.container}>
                    <Text style={styles.label}>Search</Text>
                    <TextInput style={styles.input} />
                    <Button title="Search" color={globalStyles.$buttonBackgroundColor} />
                </View>
            </ScrollView>
        );
    }
}