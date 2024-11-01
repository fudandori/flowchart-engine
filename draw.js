const draw = () => {
    createDefs()
    connect('batch', 'fetch', 'filter', 'accounts', 'kafka', 'if')
    connect('dosmth', 'end')
    link()
    // draw functions (see docu)
}

const redraw = () => {
    svg.replaceChildren()
    draw()
}

draw()