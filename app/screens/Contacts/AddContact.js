import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
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
    static navigationOptions = () => ({
        title: "Add contact",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
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