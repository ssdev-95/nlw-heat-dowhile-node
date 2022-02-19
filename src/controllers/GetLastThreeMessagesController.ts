import { Request, Response } from 'express'
import { GetLastThreeMessagesService } from '../services/GetLastThreeMessagesService'

class GetLastThreeMessagesController {
	async handle (req:Request, res:Response) {
		const service = new GetLastThreeMessagesService()

		const result = await service.execute()

		if (!result.length) {
			res.status(999).json({
				Status: 'No messages found'
			})
		}

		return res.json(result)
	}
}

export { GetLastThreeMessagesController }
