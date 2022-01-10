const formatMessage = (texts) => texts.map((text) => {
  if (typeof text === 'object') {
    return JSON.stringify(text)
  }
  return text
})

const info = (...message) => {
  console.log('Info:', ...formatMessage(message))
}

const error = (...message) => {
  console.error('Error:', ...formatMessage(message))
}

const warn = (...message) => {
  console.warn('Warn:', ...formatMessage(message))
}

module.exports = { info, error, warn }
