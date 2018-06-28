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

    static async updateProfile(token, userId, fullName, username, email, password, repeatPassword) {
        const response = await fetch(`${serverUrl}/users/${userId}/profile`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            }),
            body: JSON.stringify({
                fullName,
                username,
                email,
                password,
                repeatPassword
            })
        });
        const json = await response.json();
        return json;
    }
}
