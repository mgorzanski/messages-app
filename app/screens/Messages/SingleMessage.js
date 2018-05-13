import React from 'react';
import { Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';
import AsyncImage from './../../components/AsyncImage';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    otherMessageRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    myMessageRow: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start'
    },
    otherMessageViewText: {
        backgroundColor: globalStyles.$otherMessageTextBackground,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 0,
        borderRadius: 5
    },
    myMessageViewText: {
        backgroundColor: globalStyles.$myMessageTextBackground,
        padding: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 5
    },
    messages: {
        backgroundColor: globalStyles.$appBackgroundColor,
        display: 'flex',
        flexDirection: 'column'
    },
    userImage: {
        width:41,
        height:41,
        marginTop:2
    },
    text: {
        fontSize: 16,
        fontFamily: 'arial',
        color: globalStyles.$white
    }
});

class SingleMessage extends React.PureComponent {
    render() {
        return (
            <View style={styles.messages}>
                { this.props._id === this.props.user.data.userId ? (
                    <View style={styles.myMessageRow}>
                        <View style={styles.myMessageViewText}>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.otherMessageRow}>
                        <AsyncImage source={require('./../../img/icons/user2.png')} style={styles.userImage} placeholderColor='#3a3a3a' />
                        <View style={styles.otherMessageViewText}>
                            <Text style={styles.text}>{this.props.text}</Text>
                        </View>
                    </View>
                ) }
            </View>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(SingleMessage);