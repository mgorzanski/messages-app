import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';

export default class AuthLocal {
    static async authenticate(token) {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log('An error occurred');
        }
    }

    static deauthenticate() {
        AsyncStorage.removeItem('token');
    }

    static tokenNotExpired(token) {
        const decoded = jwtDecode(token);

        if (decoded.exp < new Date().getTime() / 1000) {
            return false;
        }
        return true;
    }

    static async getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                return token;
            }
        } catch(error) {
            console.log('An error occurred');
        }
    }

    static async checkToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                if (this.tokenNotExpired(token)) {
                    return true;
                }
                return false;
            }
            return false;
        } catch(error) {
            console.log('An error occurred');
        }
    }

    static tokenExists() {
        return AsyncStorage.getItem('token') !== null;
    }
}
