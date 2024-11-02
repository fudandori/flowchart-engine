const draw = () => {
    createDefs()
    connect('batch', 'fetch', 'filter', 'accounts', 'kafka', 'if')
    connect('dosmth', 'end')
    forkLine('error','end', 3)
    forkLine('error','dosmth', 1)
    link()
}

const redraw = () => {
    svg.replaceChildren()
    draw()
}

draw()