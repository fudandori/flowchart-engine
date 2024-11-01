const svg = document.getElementById('svg')

const connect = (...items) => {
    for (let i = 1; i < items.length; i++)
        drawLine(items[i - 1], items[i], svg)
}

const draw = () => {
    createDefs(svg)
    connect('batch', 'fetch', 'filter', 'accounts', 'kafka')
}

const redraw = () => {
    svg.replaceChildren()
    draw()
}

draw()