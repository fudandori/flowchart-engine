const ns = 'http://www.w3.org/2000/svg'
const svg = document.getElementById('svg')

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

const getDelta = id => {
  const el = document.getElementById(id)
  if (isConditional(id)) return 45
  if (el.hasAttribute('db') || el.hasAttribute('api')) return 45
  if (el.hasAttribute('kafka')) return 35
  return 5
}

const getArrowVector = (origin, end) => {
  const delta = isConditional(end) ? -34 : -5

  let p1, p2

  if (centerPoint(origin).y < centerPoint(end).y) {

    p1 = bottomPoint(origin)
    p2 = topPoint(end)

    p2.offsetY(delta)

    return new Vector(p1, p2)
  }

  p1 = topPoint(origin)
  p2 = bottomPoint(end)

  p2.offsetY(-delta)

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

const drawArrow = (from, to) => {
  const vector = getArrowVector(from, to)
  const arrow = createArrow(vector)
  svg.appendChild(arrow)
}

const selectPort = (origin, end) => {
  const d = getDelta(end)
  const diff = centerPoint(origin).x - centerPoint(end).x
  if (Math.abs(diff) < 3) {
    return bottomPoint(end).offsetY(d)
  } else if (diff < 0) {
    return leftPoint(end).offsetX(-d)
  }

  return rightPoint(end).offsetX(d)
}

const midpointY = (origin, end) => {
  return (centerPoint(origin).y + centerPoint(end).y) / 2
}

const getVertex = (origin, end, x1) => {
  const abs = Math.abs(centerPoint(origin).x - centerPoint(end).x)

  return abs > 10
    ? new Point(x1, centerPoint(end).y)
    : new Point(x1, midpointY(origin, end))
}

const forkLine = (origin, end, type) => {

  const v1 = new Vector()
  const v2 = new Vector()
  let p1, p2, p3, p4, vertex



  switch (type) {
    case "top":
      p1 = topPoint(origin)
      vertex = getVertex(origin, end, p1.x)
      p2 = vertex.offsetY(-1)
      p3 = vertex
      p4 = selectPort(origin, end)
      break

    case "bottom":
      p1 = bottomPoint(origin)
      p2 = { x: topEnd.x, y: p1.y }
      p3 = { x: topEnd.x, y: p1.y }
      p4 = topEnd.offsetY(delta)
      break

    case "left":
      let rightEnd = rightPoint(end)
      p1 = bottomPoint(origin)
      p2 = { x: p1.x, y: rightEnd.y + 1 }
      p3 = { x: p1.x, y: rightEnd.y }
      p4 = rightEnd.offsetX(delta)
      break

    case "right":
      let leftEnd = leftPoint(end)
      p1 = bottomPoint(origin)
      p2 = { x: p1.x, y: leftEnd.y + 1 }
      p3 = { x: p1.x, y: leftEnd.y }
      p4 = leftEnd.offsetX(delta)
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
