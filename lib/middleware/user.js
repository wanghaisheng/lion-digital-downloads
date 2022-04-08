import { login, register } from '~/lib/middleware'

export const loginUser = async (email,password) => {
	login(email,password)
}

export const registerUser = async (email,password) => {
	register(email,password)
}