const draw = () => {
    createDefs()
    connect()
    forkLine('if', 'calc', 1)
    forkLine('if', 'calc', 3)
    forkLine('dosmth', 'error2', 3)
    forkLine('calc', 'dosmth', 4)
    link()
}

const redraw = () => {
    svg.replaceChildren()
    draw()
}

const renderIfs = () => {
    const elements = document.querySelectorAll('div[if]');

    elements.forEach((elem) => {
        const originalContent = elem.innerHTML
        elem.innerHTML = ''

        const randomDiv = document.createElement('div')
        randomDiv.id = crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11)

        const span = document.createElement('span')
        span.innerHTML = originalContent

        elem.appendChild(randomDiv)
        elem.appendChild(span)
    })
}

const connect = () => {
    document.querySelectorAll("div[next]")
        .forEach(el => {
            drawArrow(el.id, el.getAttribute("next"))
        })
}

const render = () => {
    renderIfs()
}

render();

draw()