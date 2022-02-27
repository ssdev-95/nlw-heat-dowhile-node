import axios from 'axios'
import { 
	collection, doc, db, getDoc, where, setDoc
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
                console.log(JSON.stringify(accessTokenResponse))
		const { data: userResponse } = await axios.get<IUserResponse>('https://api.github.com/user', {
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`
			}
		})

		const { login, id: github_id, name, avatar_url } = userResponse;
		const userRef = doc(collection(db, 'users'), String(github_id))
		let snapshot:any = await getDoc(userRef)

		let user:any = {}

		if (snapshot.exists()) {
			user = {
				id: snapshot.id,
				...snapshot.data()
			}
		} else {
			await setDoc(doc(db, 'users', String(github_id)), {
				id: String(github_id),
				avatar_url,
				name,
				login,
				social: { ...user_social }
			})

			user = {
				id: String(github_id),
				avatar_url,
				name,
				login,
				social: { ...user_social }
			}
		}

		const token = sign( JSON.parse(JSON.stringify(user)), secret, {
			subject: String(user.id),
			expiresIn: "1d"
		})

		return { token, user };
  }
}

export { AuthenticateUserService }

