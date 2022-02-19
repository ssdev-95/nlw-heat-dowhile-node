import axios from 'axios'
import prismaClient from '../prisma'
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
	id: number;
	login: string;
	name: string;
	avatar_url: string;
}

const secret = process.env.JWT_SECRET

class AuthenticateUserService {
  async execute (code: string) {
		const url = "https://githun.com/login/oauth/access_token"
		const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
			params: {
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code
			},
			headers: {
				"Accept": "application/json"
		  }
    })

		const { data: userResponse } = await axios.get<IUserResponse>('https://api.github.com/user', {
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`
			}
		})

		const { login, id, name, avatar_url } = userResponse;
		let user = await prismaClient.user.findFirst({
			where: {
				github_id: id
			}
		})

		if (!user) {
			user = await prismaClient.user.create({
				data: {
					github_id: id,
					avatar_url,
					name,
					login
				}
			})
		}

		const token = sign( user, secret, {
			subject: user.id,
			expiresIn: "1d"
		})

		return { token, user };
  }
}

export { AuthenticateUserService }

