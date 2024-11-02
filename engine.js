const ns = 'http://www.w3.org/2000/svg'

const svg = document.getElementById('svg')

const redirect = ev => {
    const page = ev.target.getAttribute('sub')
    window.location.href = `${page}.html`
}

const link = () => {
    const subroutines = Array.from(document.querySelectorAll('[sub]'))
    subroutines.forEach(div => div.addEventListener('click', redirect));
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

const getArrowVector = (origin, end) => {
    //const delta = isConditional(el2) ? 34 : 5

    const point1 = bottomPoint(origin)
    const point2 = topPoint(end)

    return new Vector()
        .setX1(point1.x)
        .setY1(point1.y)
        .setX2(point2.x)
        .setY2(point2.y - 5)
}

const createLine = vector => {
    const line = document.createElementNS(ns, 'line')
    line.setAttribute('x1', vector.x1)
    line.setAttribute('y1', vector.y1)
    line.setAttribute('x2', vector.x2)
    line.setAttribute('y2', vector.y2)
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

const forkLine = (origin, end, type) => {
    const vector1 = new Vector()
    const vector2 = new Vector()
    let point1, point2, point3, topEnd

    switch (type) {
        case 1:
            topEnd = topPoint(end)
            point1 = leftPoint(origin)
            point2 = { x: topEnd.x, y: point1.y }
            point3 = topEnd.offsetY(-5)
            break;

        case 2:
            topEnd = topPoint(end)
            point1 = rightPoint(origin)
            point2 = { x: topEnd.x, y: point1.y }
            point3 = topEnd.offsetY(-5)
            break;

        case 3:
            let rightEnd = rightPoint(end)
            point1 = bottomPoint(origin)
            point2 = { x: point1.x, y: rightEnd.y }
            point3 = rightEnd.offsetX(5)
            break;

        case 4:
            let leftEnd = leftPoint(end)
            point1 = bottomPoint(origin)
            point2 = { x: point1.x, y: leftEnd.y }
            point3 = leftEnd.offsetX(-5)
            break;
    }

    vector1
        .setOrigin(point1)
        .setEnd(point2)

    vector2
        .setOrigin(point2)
        .setEnd(point3)

    const line = createLine(vector1)
    const arrow = createArrow(vector2)

    svg.appendChild(line)
    svg.appendChild(arrow)

}

const createDefs = () => {
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

const connect = (...items) => {
    for (let i = 1; i < items.length; i++)
        drawArrow(items[i - 1], items[i])
}
