import { Request, Response } from 'express'
import { ProfileUserService } from '../services/ProfileUserService'

class ProfileUserController {
  async handle (req:Request, res:Response) {
		const { user_id } = req
    const service = new ProfileUserService()

		try {
			const result = await service.execute(user_id)
			return res.json(result);
		} catch(err) {
			return res.json({ Error: err.message });
		}
	}
}

export { ProfileUserController }

