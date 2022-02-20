import { Request, Response } from 'express'
import { GetMessageAuthorDataService } from '../services/GetMessageAuthorDataService'

class GetMessageAuthorDataController {
  async handle (req:Request, res:Response) {
		const query = req.query
		const author = query.author as string;

    const service = new GetMessageAuthorDataService()

		try {
			const result = await service.execute(author)
			return res.json(result);
		} catch(err) {
			return res.json({ Error: err.message });
		}
	}
}

export { GetMessageAuthorDataController }

