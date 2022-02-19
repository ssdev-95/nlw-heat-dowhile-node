import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

const secret = process.env.JWT_SECRET
export function ensureAuthenticated(req:Request, res:Response, next:NextFunction) {
	const authToken = req.headers.authorization


	if (!authToken) {
		return res.status(401).json({
			ErrorCode: "Invalid Token"
  	})
	}

	try {

	const token = authToken.replace('Bearer ', '')
	const { sub } = verify(token, secret) as IPayload

	req.user_id = sub

	return next();
	} catch {
		return res.status(401).json({
			ErrorCode: "Token Expired"
		})
	}
}
