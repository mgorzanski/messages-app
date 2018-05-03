import AuthLocal from './../utils/AuthLocal';

export default class AuthApi {
    static async login(email, password) {
        const response = await fetch('http://192.168.100.4:3000/auth/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const json = await response.json();
        //if (json.auth) await AuthLocal.authenticate(json.token);
        return json;
    }
}
