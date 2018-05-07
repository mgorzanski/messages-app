import React from 'react';
import { InteractionManager } from 'react-native';

export default class AfterInteractions extends React.Component {
    state = { interactions: true }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ interactions: false });
        });
    }

    render() {
        if (this.state.interactions) {
            return null;
        }
        return this.props.children;
    }
}