import axios from 'axios'

const handleError = (err) => console.log(err)

// This API is limit to one call every second
export const getInfo = () => (axios.get('https://api.wheretheiss.at/v1/satellites/25544'))
  .then(res => res.data)
  .catch(err => handleError(err))

// This one has no limits.
export const getPos = () => (axios.get('http://api.open-notify.org/iss-now.json'))
  .then(res => res.data.iss_position)
  .catch(err => handleError(err))

export const getPpl = () => (axios.get('http://api.open-notify.org/astros.json'))
  .then(res => res.data.people)
  .catch(err => handleError(err))

export const getAll = () => (axios.all([ getPos(), getInfo(), getPpl() ]))
  .then(([ position, info, ppl ]) => ({ position, info, ppl }) )
  .catch(err => handleError(err))
