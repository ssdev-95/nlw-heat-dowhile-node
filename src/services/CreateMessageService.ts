//import { io } from '../server'

interface IMessageServiceProps {
	text: string;
	user_id: string;
}

class CreateMessageService {
  async execute ({text, user_id}: IMessageServiceProps) {
		/*const message = await prismaClient
		.message
    .create({
		  data: {
				text,
				user_id
			},
			include: {
				user: true
			}
		})

		const infoWS = {
			id: message.id,
			text: message.text,
			user_id: message.user_id,
			created_at: message.created_at,
			user: {
				name: message.user.name,
				avatar_url: message.user.avatar_url
			}
    }

    io.emit('new_message' , infoWS)
		return message;*/
	 return {}
	}
}

export { CreateMessageService }
