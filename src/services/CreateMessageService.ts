import { io } from '../server'
import { addDoc, db, collection, getDoc, doc } from '../fire/setup'

interface IMessageServiceProps {
	text: string;
	user_id: string;
}

class CreateMessageService {
  async execute ({text, user_id}: IMessageServiceProps) {
		const ref = collection(db, 'messages')
		const messageRef = await addDoc(ref, {
			text,
			user_id
		})

		const message = await getDoc(messageRef)

		const userRef = doc(collection(db, 'users'), user_id)
		const user = await getDoc(userRef)

		const infoWS = {
			id: message.id,
			text: message.data().text,
			user_id: message.data().user_id,
			created_at: Date.now(),
			user: {
			  id: user.id,
				...user.data()
			}
    }

    io.emit('new_message' , infoWS)

		return {
			id: message.id,
			...message.data()
		};
	}
}

export { CreateMessageService }
