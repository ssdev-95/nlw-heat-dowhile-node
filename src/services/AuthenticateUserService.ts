import axios from 'axios'
import { 
	collection, addDoc, query, db, getDocs, where
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
		const url = "https://github.com/login/oauth/access_token"
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

		const { login, id: github_id, name, avatar_url } = userResponse;
		const userRef = query(collection(db, 'users'), where('github_id', '==', github_id))
		let userSnap:any = await getDocs(userRef)

		if (!userSnap) {
			userSnap = await addDoc(collection(db, 'users'), {
				github_id,
				avatar_url,
				name,
				login,
				social: { ...user_social }
			})
		}

		/*const user = {
			id: userSnap.id,
			...userSnap.data()
		}*/
	 console.log(userSnap.data())

		const token = sign( JSON.parse(JSON.stringify(userSnap)), secret, {
			subject: `${userSnap.id}`,
			expiresIn: "1d"
		})

		return { token, user: userSnap };
  }
}

export { AuthenticateUserService }

