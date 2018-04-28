import React from 'react';
import { View, StyleSheet, SectionList, Text, ScrollView, TouchableHighlight } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { informationsFetched } from './../../actions';
import App from './../../api/App';

class Informations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
    }

    static navigationOptions = () => ({
        title: "INFORMATIONS",
        headerStyle: globalStyles.headerStyle,
        headerTitleStyle: globalStyles.headerTitleStyle,
        headerRight: (<View></View>),
        headerTintColor: globalStyles.$white
    });

    componentDidMount() {
        App.getAppInformations().then((data) => this.props.informationsFetched(data)).then(() => this.setState({ dataLoaded: true}));
    }

    render() {
        const dataLoaded = this.state.dataLoaded;

        return (
            <ScrollView style={styles.settings}>
                <View style={styles.container}>
                    <Text>{dataLoaded ? this.props.informations : ''}</Text>
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

Informations.propTypes = {
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        informations: state.informations
    }
};

const mapDispatchToProps = { informationsFetched };

export default connect(mapStateToProps, mapDispatchToProps)(Informations);