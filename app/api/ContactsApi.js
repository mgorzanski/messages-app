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

    static async getInvitations(token, userId) {
        const response = await fetch(`${serverUrl}/users/${userId}/contacts/invitations`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }

    static async sendInvitation(token, userId, userToInviteId) {
        const response = await fetch(`${serverUrl}/users/${userId}/contacts/invitations`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            }),
            body: JSON.stringify({
                userToInviteId
            })
        });
        const json = await response.json();
        return json;
    }

    static async acceptInvitation(token, userId, inviterId) {
        await fetch(`${serverUrl}/users/${userId}/contacts/invitations/${inviterId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
    }

    static async declineInvitation(token, userId, inviterId) {
        await fetch(`${serverUrl}/users/${userId}/contacts/invitations/${inviterId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
    }
}
