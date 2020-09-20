const fetch = require('isomorphic-fetch')

const fetcher = url => fetch(url).then(res => res.json())

const OPEN_NOTIFY = 'http://api.open-notify.org'
const WHERE_THE_ISS_AT = 'https://api.wheretheiss.at/v1'

exports.handler = async () => {
  try {
    const [info, astros] = await Promise.all([
      fetcher(`${WHERE_THE_ISS_AT}/satellites/25544`),
      fetcher(`${OPEN_NOTIFY}/astros.json`)
    ])

    return {
      statusCode: 200,
      body: JSON.stringify({ info, people: astros.people })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}