import axios from 'axios'
import { 
	collection, addDoc, doc, db, getDoc, where
} from '../fire/setup'
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

interface IUserSocial {
	[key:string]: string | null;
}

const secret = process.env.JWT_SECRET

class AuthenticateUserService {
  async execute (code: string, user_social: IUserSocial) {
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
		const userDocRef = doc(db, 'users', login)
		let user:any = await getDoc(userDocRef)

		if (!user.exists()) {
			user = await addDoc(collection(db, 'users'), {
				github_id: id,
				avatar_url,
				name,
				login,
				social: { ...user_social }
			})
		}

		console.log(user)

		const token = sign( user, secret, {
			subject: user.id,
			expiresIn: "1d"
		})

		return { token, user };
  }
}

export { AuthenticateUserService }

