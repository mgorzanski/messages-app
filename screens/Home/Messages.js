import React from 'react';
import { ScrollView } from 'react-native';
import Message from './Message';

export default class Messages extends React.Component {
    render() {
        return (
            <ScrollView>
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
                <Message userName="LoremIpsum" message="Testowa wiadomość..." date="11.03.2018 13:39" />
            </ScrollView>
        );
    }
}