import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class AsyncImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render() {
        const { placeholderColor, style, source } = this.props;

        return (
            <View style={style}>
                <Image
                    source={source}
                    resizeMode={'contain'}
                    style={[
                        style,
                        {
                            position: 'absolute',
                            resizeMode: 'contain'
                        }
                    ]}
                    onLoad={this._onLoad} />

                    {!this.state.loaded ? (
                        <View
                            style={{
                                backgroundColor: placeholderColor,
                                position: 'absolute'
                            }} />
                    ) : null}
            </View>
        );
    }

    _onLoad = () => {
        this.setState(() => ({ loaded: true }));
    }
}

AsyncImage.propTypes = {
    placeholderColor: PropTypes.string,
    style: PropTypes.any.isRequired,
    source: PropTypes.any.isRequired
}