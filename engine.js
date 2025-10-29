const ns = 'http://www.w3.org/2000/svg'
const svg = document.getElementById('svg')

const boxMap = {}

const redirect = ev => {
  const page = ev.target.getAttribute('sub')
  if (page) window.location.href = `${page}.html`
}

const link = () => {
  const subroutines = Array.from(document.querySelectorAll('[sub]'))
  subroutines.forEach(div => div.addEventListener('click', redirect))
}

const getArrowVector = (origin, end) => {
  const p1 = origin.center
  const p2 = origin.isAbove(end) ? end.top : end.bottom

  return new Vector(p1, p2)
}

const createLine = vector => {
  const line = document.createElementNS(ns, 'line')
  line.setAttribute('x1', vector.p1.x)
  line.setAttribute('y1', vector.p1.y)
  line.setAttribute('x2', vector.p2.x)
  line.setAttribute('y2', vector.p2.y)
  line.setAttribute('stroke', 'black')
  line.setAttribute('stroke-width', '2px')

  return line
}

const createArrow = vector => {
  const line = createLine(vector)
  line.setAttribute('class', 'arrow')

  return line
}

const drawArrow = (origin, end) => {
  const vector = getArrowVector(origin, end)
  const arrow = createArrow(vector)
  svg.appendChild(arrow)
}

const forkLine = (origin, end, type) => {

  const [v1, v2] = origin.getLvectors(end, type)

  // if top OR bottom AND vertical aligned - 1 vector
  // if left OR right and horizontal aligned - 1 vector

  // else
  const line = createLine(v1)
  const arrow = createArrow(v2)

  svg.appendChild(line)
  svg.appendChild(arrow)
}
