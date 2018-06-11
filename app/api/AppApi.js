import { serverUrl } from './../config/server';

export default class AppApi {
    static async getAppInformations() {
        const response = await fetch(`${serverUrl}/app/informations`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const json = await response.json();
        return json.content;
    }
}
