import { serverUrl } from './../config/server';

export default class MessagesApi {
    static async getThreads(token) {
        const response = await fetch(`${serverUrl}/users/5ad2130b5105e8306cc48bfd/messages/threads`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }

    static async getMessagesFromThread(token, threadId) {
        const response = await fetch(`${serverUrl}/users/5ad2130b5105e8306cc48bfd/messages/threads/${threadId}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }
}
