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

const isConditional = id => document.getElementById(id).hasAttribute('if')

const getDelta = (id, type) => {
    let result
    switch (type) {
        case 1:
            result = isConditional(id) ? -34 : -5
            break;
        case 2:
            result = isConditional(id) ? -34 : -5
            break;
        case 3:
            result = isConditional(id) ? 45 : 5
            break;
        case 4:
            result = isConditional(id) ? -45 : -5
            break;
    }

    return result
}

const getArrowVector = (origin, end) => {
    const delta = isConditional(end) ? -34 : -5

    const p1 = bottomPoint(origin)
    const p2 = topPoint(end)

    p2.offsetY(delta)

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

const forkLine = (origin, end, type) => {
    const delta = getDelta(end, type)
    const v1 = new Vector()
    const v2 = new Vector()
    let p1, p2, p3, p4, topEnd

    switch (type) {
        case 1:
            topEnd = topPoint(end)
            p1 = leftPoint(origin)
            p2 = { x: topEnd.x - 1, y: p1.y }
            p3 = { x: topEnd.x, y: p1.y }
            p4 = topEnd.offsetY(delta)
            break;

        case 2:
            topEnd = topPoint(end)
            p1 = rightPoint(origin)
            p2 = { x: topEnd.x + 1, y: p1.y }
            p3 = { x: topEnd.x, y: p1.y }
            p4 = topEnd.offsetY(delta)
            break;

        case 3:
            let rightEnd = rightPoint(end)
            p1 = bottomPoint(origin)
            p2 = { x: p1.x, y: rightEnd.y + 1 }
            p3 = { x: p1.x, y: rightEnd.y }
            p4 = rightEnd.offsetX(delta)
            break;

        case 4:
            let leftEnd = leftPoint(end)
            p1 = bottomPoint(origin)
            p2 = { x: p1.x, y: leftEnd.y + 1 }
            p3 = { x: p1.x, y: leftEnd.y }
            p4 = leftEnd.offsetX(delta)
            break;
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
