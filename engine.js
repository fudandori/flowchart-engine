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

const topPoint = id => {
  const el = document.getElementById(id)
  const frame = el.getBoundingClientRect()

  return new Point(frame.right - el.offsetWidth / 2, frame.top)
}

const bottomPoint = id => {
  const el = document.getElementById(id)
  const frame = el.getBoundingClientRect()

  return new Point(frame.right - el.offsetWidth / 2, frame.bottom)
}

const leftPoint = id => {
  const el = document.getElementById(id)
  const frame = el.getBoundingClientRect()

  return new Point(frame.left, frame.bottom - el.offsetHeight / 2)
}

const rightPoint = id => {
  const el = document.getElementById(id)
  const frame = el.getBoundingClientRect()

  return new Point(frame.right, frame.bottom - el.offsetHeight / 2)
} 

const centerPoint = id => {
  const el = document.getElementById(id)
  const frame = el.getBoundingClientRect()

  return new Point(frame.right - el.offsetWidth / 2, frame.bottom - el.offsetHeight / 2)
}

const isConditional = id => document.getElementById(id).hasAttribute('if')

const isLeft = (origin, end) => {
  return centerPoint(origin).x < centerPoint(end).x
}

const getDelta = (origin, end) => {
  const el = document.getElementById(end)
  if (isConditional(end)
    || (!isLeft(origin, end)
      && (el.hasAttribute('db') || el.hasAttribute('api'))))
    return 45
  if (!isLeft(origin, end) && el.hasAttribute('kafka')) return 35
  return 5
}

const getArrowVector = (origin, end) => {
  let p1, p2

  if (origin.isAbove(end) ) {
    p1 = origin.bottom
    p2 = end.topDelta
  } else {
    p1 = origin.top
    p2 = end.bottomDelta
  }

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

const selectPort = (origin, end) => {
  const d = getDelta(origin, end)
  const diff = centerPoint(origin).x - centerPoint(end).x
  if (Math.abs(diff) < 3) {
    if (centerPoint(origin).y < centerPoint(end).y) return topPoint(end).offsetY(isConditional(end) ? -35 : -5)
    return bottomPoint(end).offsetY(isConditional(end) ? 35 : 5)
  } else if (diff < 0) {
    return leftPoint(end).offsetX(-d)
  }

  return rightPoint(end).offsetX(d)
}

const selectPortHz = (origin, end) => {
  const d = getDelta(origin, end)
  const diff = centerPoint(origin).x - centerPoint(end).x
  if (Math.abs(diff) < 3) {
    if (centerPoint(origin).y < centerPoint(end).y) return topPoint(end).offsetY(isConditional(end) ? -35 : -5)
    return bottomPoint(end).offsetY(isConditional(end) ? 35 : 5)
  } else if (diff < 0) {
    return leftPoint(end).offsetX(-d)
  }

  return rightPoint(end).offsetX(d)
}

const midpointY = (origin, end) => {
  return (centerPoint(origin).y + centerPoint(end).y) / 2
}

const midpointX = (origin, end) => {
  return (centerPoint(origin).x + centerPoint(end).x) / 2
}

const getVertex = (origin, end, x1) => {
  const abs = Math.abs(centerPoint(origin).x - centerPoint(end).x)

  return abs > 10
    ? new Point(x1, centerPoint(end).y)
    : new Point(x1, midpointY(origin, end))
}

const getHzVertex = (origin, end, y1) => {
  const abs = Math.abs(centerPoint(origin).y - centerPoint(end).y)
  return abs > 10
    ? new Point(centerPoint(end).x, y1)
    : new Point(centerPoint(end).x, midpointX(origin, end))
}

const forkLine = (from, target, type) => {

  const origin = new Box(from)
  const end = new Box(target)

  const [v1, v2] = origin.getLvectors(end, type)

  // if top OR bottom AND vertical aligned - 1 vector
  // if left OR right and horizontal aligned - 1 vector

  // else
  switch (type) {
    case "top":

      break

    case "bottom":
      p1 = bottomPoint(origin)
      vertex = getVertex(origin, end, p1.x)
      p2 = vertex.offsetY(-1)
      p3 = vertex
      p4 = selectPort(origin, end)
      break

    case "left":
      p1 = leftPoint(origin)
      vertex = getHzVertex(origin, end, p1.y)
      p2 = vertex.offsetY(-1)
      p3 = vertex
      p4 = selectPort(origin, end)
      break

    case "right":
      p1 = rightPoint(origin)
      vertex = getHzVertex(origin, end, p1.y)
      p2 = vertex.offsetY(-1)
      p3 = vertex
      p4 = selectPort(origin, end)
      break
  }

  v1
    .setOrigin(p1)
    .setEnd(p2)

  v2
    .setOrigin(p3)
    .setEnd(p4)

  const line = createLine(v1)
  const arrow = createArrow(v2)

  svg.appendChild(line)
  svg.appendChild(arrow)
}
