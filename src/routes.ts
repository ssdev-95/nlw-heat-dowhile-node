import { Router } from 'express'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'

import { ensureAuthenticated } from './middlewares'

const router = Router()

router.get('/github', (req,res)=>{
	console.log('Algo')
	return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

router.get('/signin/callback', (req, res)=>{
  const { code } = req.query

	return res.json({ code })
})

router.post(
  '/authenticate',
  new AuthenticateUserController().handle
)

router.post(
	'/messages',
	ensureAuthenticated,
	new CreateMessageController().handle
)

router.get(
	'/messages/last_3',
	new GetLastThreeMessagesController().handle
)

router.get(
	'/profile',
	ensureAuthenticated,
	new ProfileUserController().handle
)

export { router }

