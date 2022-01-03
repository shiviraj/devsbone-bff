const WebSocket = require('ws')
const url = require('url')
const logger = require('./service/logger')
const ClientService = require('./domain/clients')
const WebSocketMessageService = require('./service/webSocketMessageService')
const DustbinService = require('./service/pageService')

const addClient = (ws) => {
  logger.info('New connection established')
  if (ws.id.startsWith('Dustbin')) {
    DustbinService.getDustbinByToken(ws.id)
      .then(({data}) => {
        ws.dustbinId = data.dustbinId
        logger.info('Successfully fetched dustbin by token')
        ClientService.addClient(ws)
      })
      .catch(() => logger.error('Failed to fetch dustbin by token'))
  } else {
    ClientService.addClient(ws)
  }
}

const webSocketController = () => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  })
  
  wss.broadcast = (message) => {
    const uiClients = ClientService.clients.filter((client) => client.id.startsWith('Bearer'))
    uiClients.forEach((client) => client.send(JSON.stringify(message)))
    logger.info('Successfully send message to ui clients via websocket', message)
  }
  
  wss.sendToDustbin = (payload, retry = 10) => {
    const dustbin = ClientService.getClient(payload.id)
    if (retry > 0) {
      if (dustbin) {
        dustbin.send(JSON.stringify(payload))
        logger.info('Successfully send message to dustbin via websocket', payload)
        return
      }
      setTimeout(wss.sendToDustbin, 1000, payload, retry - 1)
    }
  }
  
  wss.on('connection', (ws, req) => {
    const parameters = url.parse(req.url, true)
    ws.id = parameters.query.token
    addClient(ws)
    ws.on('message', WebSocketMessageService(ws, wss))
    ws.on('close', () => ClientService.removeClient(ws))
  })
  
  wss.onUpgrade = (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit('connection', websocket, request)
    })
  }
  
  return wss
}

module.exports = webSocketController()
