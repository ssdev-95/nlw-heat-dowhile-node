import { Router } from 'express'

import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'
import { GetMessageAuthorDataController } from './controllers/GetMessageAuthorDataController'

import { ensureAuthenticated } from './middlewares'

const router = Router()

/*router.get('/', (req, res) => res.json({ result: 'Ué kkkk' }))

router.get('/github', (req,res)=>{
	return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

router.get('/signin/callback', (req, res)=>{
  const { code } = req.query

	return res.json({ code })
})*/

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
	'/messages',
	new GetMessageAuthorDataController().handle
)

router.get(
	'/profile',
	ensureAuthenticated,
	new ProfileUserController().handle
)

export { router }

