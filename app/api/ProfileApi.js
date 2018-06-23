import { serverUrl } from './../config/server';

export default class ContactsApi {
    static async getProfile(token, userId) {
        const response = await fetch(`${serverUrl}/users/${userId}/profile`, {
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
