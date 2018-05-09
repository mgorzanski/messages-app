import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInformations } from './../../actions';
import AppApi from './../../api/AppApi';

class Informations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            render: false
        };
    }

    static navigationOptions = () => ({
        title: "Informations",
        headerRight: (<View></View>),
        headerTintColor: globalStyles.$white
    });

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 100);
        AppApi.getAppInformations().then((data) => this.props.fetchInformations(data)).then(() => this.setState({ dataLoaded: true}));
    }

    render() {
        const dataLoaded = this.state.dataLoaded;
        const render = this.state.render;

        if (render) {
        return (
            <ScrollView style={styles.informations}>
                <View style={styles.container}>
                    <Text style={styles.text}>{dataLoaded ? this.props.informations : ''}</Text>
                </View>
            </ScrollView>
        );
        }
        return (null);
    }
}

const styles = StyleSheet.create({
    informations: {
        backgroundColor: globalStyles.$appBackgroundColor,
        height: '100%'
    },
    container: {
        flex: 1,
        padding: 6
    },
    text: {
        color: globalStyles.$white,
        fontSize: 14
    }
});

Informations.propTypes = {
    navigation: PropTypes.object.isRequired,
    informations: PropTypes.string,
    fetchInformations: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        informations: state.informations
    }
};

const mapDispatchToProps = { fetchInformations };

export default connect(mapStateToProps, mapDispatchToProps)(Informations);