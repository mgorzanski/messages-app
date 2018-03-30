import React from 'react';
import Messages from './../screens/Home/Messages';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Messages />).toJSON();
    expect(tree).toMatchSnapshot();
});