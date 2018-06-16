import 'jsdom-global/register';
import React from 'react';
import Messages from './../app/screens/Messages';
import { Provider } from 'react-redux';
import { store } from './../app/config/store';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('MessagesScreen', () => {
    let mountedMessagesScreen;
    const messagesScreen = () => {
        if (!mountedMessagesScreen) {
            mountedMessagesScreen = mount(
                <Messages />
            );
        }
        return mountedMessagesScreen;
    }

    beforeEach(() => {
        mountedMessagesScreen = undefined;
    });

    it('always renders a container', () => {
        const containers = messagesScreen().find('Container');
        expect(containers.length).toBeGreaterThan(0);
    });

    describe('the rendered container', () => {
        it('contains everything else that gets rendered', () => {
            const containers = messagesScreen().find('Container');
            const wrappingContainer = containers.first();
            expect(wrappingContainer.children()).toEqual(messagesScreen().children());
        });
    });

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