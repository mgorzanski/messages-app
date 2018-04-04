import React from 'react';
import { View, Image, StyleSheet, SectionList, Text, ScrollView, TouchableHighlight } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    contacts: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor,
        color: globalStyles.$white
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: globalStyles.$white
    }
});

export default class ContactsList extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "CONTACTS",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerLeft: (<View></View>),
        headerRight: (
            <View style={globalStyles.iconSpacingRight}>
                <TouchableHighlight onPress={() =>
                    navigation.navigate('AddContact')
                }>
                    <Image 
                        source={require('./../../img/icons/add-user.png')}
                        style={globalStyles.icon}
                    />
                </TouchableHighlight>
            </View>)
    });

    render() {
        return (
            <ScrollView style={styles.contacts}>
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {title: 'D', data: ['Devin']},
                            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
                        ]}
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </ScrollView>
        );
    }
}

ContactsList.propTypes = {
    navigation: PropTypes.object.isRequired
}