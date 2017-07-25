import { getAll } from './api'

const showInfo = () => {
  const wiki = "https://en.wikipedia.org/wiki/"

  getAll().then(({ info, position, ppl }) => {
    const el = document.querySelector("div.info");
    el.style = "visibility: visible"

    const humans = ppl.map(human => `<li class="name"><a href="${wiki}${human.name}" target="_blank">${human.name}</a></li>`)
    .join(" ")
    
    el.innerHTML = `
      <span class="header">Current position of the ISS</span>
      <ul class="info-list">
        <li class="lat">
          <span>Latitude: </span>
          <span>${ Number(position.latitude).toFixed(2) }</span>
        </li>
        <li class="lon">
          <span>Longitude: </span>
          <span>${ Number(position.longitude).toFixed(2) }</span>
        </li>
        <li class="altitude">
          <span>Altitude: </span>
          <span>${ Math.round(info.altitude) } Kms</span>
        </li>
        <li class="speed">
          <span>Speed: </span>
          <span>${  Math.round(info.velocity) } Km/h </span>
        </li>
        <li class="visibility">
          <span>Visibility: </span>
          <span>${info.visibility} </span>
        </li>
      </ul>
      <div class="people">
        <span class="header"> There are <span style="color: #00BCD4;">${ppl.length}</span> humans in space </span>
        <ul class="info-list"> ${humans} </ul>
      </div>
    `
  })
}

export default showInfo