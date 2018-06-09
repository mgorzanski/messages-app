import { serverUrl } from './../config/server';

export default class MessagesApi {
    static async getThreads(token, userId) {
        const response = await fetch(`${serverUrl}/users/${userId}/messages/threads`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }

    static async getMessagesFromThread(token, userId, threadId) {
        const response = await fetch(`${serverUrl}/users/${userId}/messages/threads/${threadId}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }

    static async createThread(token, firstUserId, secondUserId) {
        const response = await fetch(`${serverUrl}/users/${firstUserId}/messages/threads`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            }),
            body: JSON.stringify({
                firstUserId,
                secondUserId
            })
        });
        const json = await response.json();
        return json.thread;
    }
}
