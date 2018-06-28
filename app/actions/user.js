export const login = (token, userId, username, fullName, email) => ({
	type: 'LOGIN',
	user: {token, userId, username, fullName, email}
});

export const logout = () => ({
	type: 'LOGOUT'
});

export const update = (username, fullName, email) => ({
	type: 'UPDATE',
	user: {username, fullName, email}
});