export default class MessagesApi {
    static async getThreads() {
        const response = await fetch('http://192.168.100.4:3000/users/5ad2130b5105e8306cc48bfd/messages/threads', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZDIxMzBiNTEwNWU4MzA2Y2M0OGJmZCIsImlhdCI6MTUyNTA5NjkwMiwiZXhwIjoxNTI1MTgzMzAyfQ.Rdrs47OEXRf_uPOWyONlH1XsLybpZTjQEXYGWfnjYdw'
            })
        });
        const json = await response.json();
        return json;
    }
}