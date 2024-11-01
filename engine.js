const ns = 'http://www.w3.org/2000/svg'

const redirect = ev => {
    const page = ev.target.getAttribute('sub')
    window.location.href = `${page}.html`
}

const link = () => {
    const subroutines = Array.from(document.querySelectorAll('[sub]'))
    subroutines.forEach(div => div.addEventListener('click', redirect));
}

const getVector = (origin, end) => {
    const el1 = document.getElementById(origin)
    const el2 = document.getElementById(end)
    const frame1 = el1.getBoundingClientRect()
    const frame2 = el2.getBoundingClientRect()
    return {
        x1: frame1.right - el1.offsetWidth / 2,
        y1: frame1.bottom,
        x2: frame2.right - el2.offsetWidth / 2,
        y2: frame2.top - 5
    }
}

const createLine = (vector) => {
    const line = document.createElementNS(ns, 'line')
    line.setAttribute('x1', vector.x1)
    line.setAttribute('y1', vector.y1)
    line.setAttribute('x2', vector.x2)
    line.setAttribute('y2', vector.y2)
    line.setAttribute('stroke', 'black')
    line.setAttribute('stroke-width', '2px')
    line.setAttribute('class', 'arrow')

    return line
}

const drawLine = (from, to, svg) => {
    const vector = getVector(from, to)
    const line = createLine(vector)

    svg.appendChild(line)
}

const createDefs = (svg) => {
    const defs = document.createElementNS(ns, 'defs')

    const marker = document.createElementNS(ns, 'marker')
    marker.setAttribute('id', 'arrow')
    marker.setAttribute('viewBox', '0 0 10 10')
    marker.setAttribute('refX', '5')
    marker.setAttribute('refY', '5')
    marker.setAttribute('markerWidth', '5')
    marker.setAttribute('markerHeight', '5')
    marker.setAttribute('orient', 'auto-start-reverse')

    const path = document.createElementNS(ns, 'path')
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z')

    marker.appendChild(path)
    defs.appendChild(marker)
    svg.appendChild(defs)
}

