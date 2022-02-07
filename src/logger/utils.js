const zero = 0
const one = 1
const two = 2
const three = 3
const sixty = 60

const getFormat = (num, length = two) => num.toString().padStart(length, '0')

const getTimezone = (offset) => {
  const t1 = Math.abs(offset / sixty)
  const hrs = Math.floor(t1)
  const mins = (t1 - hrs) * sixty
  const offsetSymbol = offset < zero ? '+' : '-'
  return `${offsetSymbol}${getFormat(hrs)}${getFormat(mins)}`
}

const getTimestamp = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + one
  const date = now.getDate()
  const time = `${[getFormat(now.getHours()),
    getFormat(now.getMinutes()),
    getFormat(now.getSeconds())].join(':')}.${getFormat(now.getMilliseconds(), three)}`
  const timezone = getTimezone(now.getTimezoneOffset())
  return `${year}-${getFormat(month)}-${getFormat(date)}T${time}${timezone}`
}

const filterSensitiveHeaders = (headers) => {
  // eslint-disable-next-line no-unused-vars
  const { Authorization, authorization, ...rest } = headers
  return rest
}

module.exports = { getTimestamp, filterSensitiveHeaders }
