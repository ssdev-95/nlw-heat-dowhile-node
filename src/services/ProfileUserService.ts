import { doc, db, collection, getDoc } from '../fire/setup'

class ProfileUserService {
  async execute (user_id: string) {
		const userRef = doc(collection(db, 'users'), user_id)
		const user = await getDoc(userRef)

		return {
			id: user.id,
			...user.data()
		};
  }
}

export { ProfileUserService }

