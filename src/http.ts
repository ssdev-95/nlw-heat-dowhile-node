import { serverHTTP, io /*, app*/ } from './server'
const PORT = process.env.PORT || 9000;
const MESSAGE = `server is running on port ${PORT}`

io.on('connection', socket => {
	console.log('A new client has connected')
})

serverHTTP.listen(PORT,  () => console.log(MESSAGE));

//app.listen(PORT,	()=>console.log(MESSAGE));

/* Post to /authenticate example
{
  "code": "3721b61dd56f85072b96",
  "social": {
    "whatsapp": "null",
    "instagram": "null",
    "linkedin": "null",
    "twitter": "null",
    "mail": "souza95salomao@gmail.com",
    "rocketseat": "null"
  }
}
*/
