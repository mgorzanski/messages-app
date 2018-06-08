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

    static async getContacts(token, userId) {
        const response = await fetch(`${serverUrl}/users/${userId}/contacts`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
        const json = await response.json();
        return json;
    }

    static spreadContacts(contactsArray) {
        let list = new Array();
        contactsArray.forEach((item) => {
            const letter = item.fullName.substr(0, 1);
            const letterIndexInList = list.findIndex(x => x.title === letter);
            if (letterIndexInList !== -1) {
                list[letterIndexInList].data.push(item);
            } else {
                list.push({ title: letter, data: new Array(item) });
            }
        });
        list.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
        return list;
    }

    static async deleteContact(token, userId, contactId) {
        await fetch(`${serverUrl}/users/${userId}/contacts/${contactId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': token
            })
        });
    }
}
