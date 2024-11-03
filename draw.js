const draw = () => {
    createDefs()
    connect('batch', 'fetch', 'filter', 'accounts', 'kafka', 'if')
    //connect('if', 'dosmth')
    forkLine('if','calc', 1)
    forkLine('if','calc', 3)
    link()
}

const redraw = () => {
    svg.replaceChildren()
    draw()
}

draw()