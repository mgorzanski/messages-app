export default class App {
    static async getAppInformations() {
        const response = await fetch('http://192.168.100.4:3000/app/informations', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const json = await response.json();
        return json.content;
    }
}
