const DustbinService = require('./pageService')
const logger = require('./logger')
const {DD602} = require('../config/error')

const formatMessage = (message) => {
  try {
    return {payload: JSON.parse(message)}
  } catch (error) {
    logger.error('Error on formatting message', `${message}`)
    return {error: true, payload: message}
  }
}

const wssEvent = (wss) => ({
  STATUS(ws, payload) {
    DustbinService.updateStatus(ws.id, payload)
      .then(({data}) => {
        const responsePayload = {event: payload.event, ...data}
        logger.info('Successfully updated dustbin status', responsePayload)
        wss.broadcast(responsePayload)
      })
      .catch((error) => logger.error(DD602, error))
  },
  
  GATE(ws, payload) {
    DustbinService.updateGate(ws.id, payload)
      .then(({data}) => {
        const responsePayload = {event: payload.event, ...data}
        logger.info('Successfully updated gate status', responsePayload)
        wss.broadcast(responsePayload)
        wss.sendToDustbin({event: payload.event, gate: data.gate.status, id: data.dustbinId})
      })
      .catch((error) => logger.error(DD602, error))
  }
})

const WebSocketMessageService = (ws, wss) => (message) => {
  const {error, payload} = formatMessage(message)
  if (!error && payload.event) {
    wssEvent(wss)[payload.event](ws, payload)
  }
}

module.exports = WebSocketMessageService
