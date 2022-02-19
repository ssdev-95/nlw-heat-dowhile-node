import { serverHTTP } from './server'

serverHTTP.listen(
	9000,
	()=>console.log('server is running on port 9000')
);
