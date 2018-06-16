import React from 'react';
import Messages from './../app/screens/Messages';
import { Provider } from 'react-redux';
import { store } from './../app/config/store';

import renderer from 'react-test-renderer';

describe('ReactNativeTesting', () => {
    test('renders correctly', () => {
        const initialState = {
            user: {
                data: {
                    token: '',
                    userId: 1,
                    fullName: 'test'
                }
            }
        };
        const testStore = store(initialState);
        const tree = renderer.create(<Provider store={testStore}><Messages /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});