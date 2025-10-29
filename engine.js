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
  const position = origin.getRelativePosition(end)
  let p2

  switch (position) {
    case 'top':
      p2 = new Point(origin.center.x, end.top.y)
      break
    case 'bottom':
      p2 = new Point(origin.center.x, end.bottom.y)
      break
    case 'left':
      p2 = new Point(end.left.x, origin.center.y)
      break
    case 'right':
      p2 = new Point(end.right.x, origin.center.y)
      break
    case 'top-left':
      return origin.getLvectors(end, 'right')
    case 'top-right':
      return origin.getLvectors(end, 'left')
    case 'bottom-left':
      return origin.getLvectors(end, 'right')
    case 'bottom-right':
      return origin.getLvectors(end, 'left')
  }

  return [new Vector(p1, p2)]
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

  if (vector.length > 1) {
    svg.appendChild(createLine(vector[0]))
    svg.appendChild(createArrow(vector[1]))
  } else {
    svg.appendChild(createArrow(vector[0]))
  }
}

const drawWord = (point, word) => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
  text.setAttribute('x', point.x)
  text.setAttribute('y', point.y)
  text.setAttribute('font-size', '16px')
  text.setAttribute('font-family', 'Roboto, Helvetica Neue, sans-serif')
  text.setAttribute('fill', 'black')
  text.setAttribute('text-anchor', 'end')
  text.textContent = word
  svg.appendChild(text)
}

const drawBranch = (origin, end, word, port) => {
  if (port) {
    drawWord(origin.getWordPoint(port), word)
    forkLine(origin, end, port)
    return
  }

  const position = origin.getRelativePosition(end)
  
  let point
  if (position.includes('left')) {
    point = origin.getWordPoint('right')
  } else if (position.includes('right')) {
    point = origin.getWordPoint('left')
  } else if (position === 'top') {
    point = origin.getWordPoint('bottom')
  } else if (position === 'bottom') {
    point = origin.getWordPoint('top')
  }
  
  drawWord(point, word)
  drawArrow(origin, end)
}

const forkLine = (origin, end, type) => {
  const [v1, v2] = origin.getLvectors(end, type)

  const line = createLine(v1)
  const arrow = createArrow(v2)

  svg.appendChild(line)
  svg.appendChild(arrow)
}
