//import { io } from '../server'
import { addDoc, db, collection, getDoc } from '../fire/setup'

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

		/*const infoWS = {
			id: message.id,
			text: message.text,
			user_id: message.user_id,
			created_at: message.created_at,
			user: {
				name: message.user.name,
				avatar_url: message.user.avatar_url
			}
    }

    io.emit('new_message' , infoWS)*/
		return {
			id: message.id,
			...message.data()
		};
	}
}

export { CreateMessageService }
