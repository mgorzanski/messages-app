import React from 'react';
import { ScrollView, Text } from 'react-native';
import * as globalStyles from './../../styles/globalStyles';

export default class Profile extends React.PureComponent {
    static navigationOptions = () => ({
        title: "Profile",
        headerTintColor: globalStyles.$white
    });

    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        setTimeout(() => {this.setState({render: true})}, 200);
    }

    render() {
        const render = this.state.render;
        if (render) {
            return (
                <ScrollView>
                    <Text>Test</Text>
                </ScrollView>
            );
        }
        return (null);
    }
}