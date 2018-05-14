import { serverUrl } from './../config/server';

export default class ContactsApi {
    static async searchUsers(token, userId, searchQuery) {
        const response = await fetch(`${serverUrl}/users/${userId}/contacts/search`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            }),
            body: JSON.stringify({
                searchQuery
            })
        });
        const json = await response.json();
        return json;
    }
}
