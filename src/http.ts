import { /*serverHTTP,*/ app } from './server'
const PORT = 9000
const MESSAGE = `server is running on port ${PORT}`

app.listen(PORT,	()=>console.log(MESSAGE));
