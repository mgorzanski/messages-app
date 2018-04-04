import React from 'react';
import { View, StyleSheet, SectionList, Text, ScrollView } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class SettingsList extends React.Component {
    static navigationOptions = () => ({
        title: "SETTINGS",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerLeft: (<View></View>),
        headerRight: (<View></View>)
    });

    render() {

        return (
            <ScrollView style={styles.settings}>
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