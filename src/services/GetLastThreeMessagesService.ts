import { 
	db, collection, getDocs, query, limit
} from '../fire/setup'

class GetLastThreeMessagesService {
	async execute () {
		const messagesRef = query(
			collection(db, 'messages'),
			limit(3)
		)

		const snapshot = await getDocs(messagesRef)
		let messages = []

		snapshot.forEach(doc => {
			const message = {
				id: doc.id,
				...doc.data()
			}
			messages = [...messages, message]
		})

		return messages;
	}
}

export { GetLastThreeMessagesService }
