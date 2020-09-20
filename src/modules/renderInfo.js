import project from '../../package.json'

const wiki = 'https://en.wikipedia.org/wiki/'

const renderInfoBox = ({ people, info }) => {
  const el = document.querySelector('div.info')
  el.style = "display: flex;"

  const humans = people.map((human) => `
    <li class="item name">
      <a href="${wiki}${human.name}" target="_blank" rel="noreferrer noopener">${human.name}</a>
    </li>`
    ).join(' ')

  el.innerHTML = `
    <div class="block">
      <span class="header">${project.description}</span>
      <ul>
        <li class="item">
          <span class="title">Latitude: </span>
          <span>${Number(info.latitude).toFixed(2)}</span>
        </li>
        <li class="item">
          <span class="title">Longitude: </span>
          <span>${Number(info.longitude).toFixed(2)}</span>
        </li>
        <li class="item">
          <span class="title">Altitude: </span>
          <span>${Math.round(info.altitude)} Kms</span>
        </li>
        <li class="item">
          <span class="title">Speed: </span>
          <span>${Math.round(info.velocity)} Km/h </span>
        </li>
        <li class="item">
          <span class="title">Visibility: </span>
          <span>${info.visibility}</span>
        </li>
      </ul>
    </div>

    <div class="block humans">
      <span class="header">There are <span class="human-length">${people.length}</span> humans in space</span>
      <ul>
        ${humans}
      </ul>
    </div>
  `
}

export default renderInfoBox
