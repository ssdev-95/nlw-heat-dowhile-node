import { doc, db, collection, getDoc } from '../fire/setup'

class GetMessageAuthorDataService {
  async execute (author: string) {
		const userRef = doc(collection(db, 'users'), author)
		const user = await getDoc(userRef)

		return {
			id: user.id,
			...user.data()
		};
  }
}

export { GetMessageAuthorDataService }

