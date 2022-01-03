const app = require('./app')
const websocket = require('./websocket')

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => console.log('server is on', PORT))

server.on('upgrade', websocket.onUpgrade)
