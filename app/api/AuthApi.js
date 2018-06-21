//import AuthLocal from './../utils/AuthLocal';
import { serverUrl } from './../config/server';

export default class AuthApi {
    static async login(email, password) {
        const response = await fetch(`${serverUrl}/auth/login`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email,
                password
            })
        });
        const json = await response.json();
        //if (json.auth) await AuthLocal.authenticate(json.token);
        return json;
    }

    static async register(username, fullName, email, password) {
        const response = await fetch(`${serverUrl}/auth/register`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username,
                fullName,
                email,
                password
            })
        });
        const json = await response.json();
        return json;
    }
}
