export const login = (token, userId, username, fullName, email) => ({
	type: 'LOGIN',
	user: {token, userId, username, fullName, email}
});