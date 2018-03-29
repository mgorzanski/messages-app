import React from 'react';
import { View, Image, StyleSheet, SectionList, Text, ScrollView } from 'react-native';
import Header from './Header';
import * as globalStyles from './../../styles/globalStyles';

export default class Settings extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        tabBarIcon: () => (
            <Image
                source={require('./../../img/icons/settings.png')}
                style={styles.tabBarIcon}
            />
        ),
    };

    render() {

        return (
            <ScrollView style={styles.settings}>
                <Header />
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {title: 'My account', data: ['My profile', 'Logout']},
                            {title: 'Settings', data: ['Notifications settings']},
                            {title: 'About app', data: ['Informations']}
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

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 45,
        height: 45
    },
    settings: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 13,
        paddingRight: 13,
        paddingBottom: 6,
        fontSize: 14,
        fontWeight: 'bold',
        color: globalStyles.$sectionHeaderFontColor,
        backgroundColor: globalStyles.$sectionHeaderBackgroundColor
    },
    item: {
        paddingTop: 10,
        paddingLeft: 13,
        paddingBottom: 10,
        paddingRight:13,
        fontSize: 18,
        height: 54,
        marginTop: 8,
        color: globalStyles.$white
    }
});