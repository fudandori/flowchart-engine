const tooltipContainer = document.getElementById('tooltip-container')

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

const showTooltip = (id, text) => {
    const tooltip = document.createElement('div')
    tooltip.id = `${id}-tooltip`
    tooltip.textContent = text
    tooltip.classList.add('tooltip-notification', 'visible')
    tooltipContainer.appendChild(tooltip)
}

const initIcons = () => {
    const tooltipMap = {}
    const tooltips = document.querySelector('tooltips')

    Array.from(tooltips.childNodes)
        .filter(node => node.nodeType === Node.ELEMENT_NODE)
        .forEach(node => {
            const key = node.tagName.toLowerCase()
            const value = node.textContent.trim()
            tooltipMap[key] = value;
        })

    const icons = document.querySelectorAll('[db] .db-icon')

    icons.forEach((icon, i) => {
        icon.id = 'icon-' + i

        const text = tooltipMap[icon.parentElement.id]

        icon.addEventListener('mouseenter', () => {
            const tooltip = tooltipContainer.querySelector(`#${icon.id}-tooltip`)
            if (!tooltip) {
                showTooltip(icon.id, text)
            }
        })

        icon.addEventListener('mouseleave', () => {
            const tooltip = tooltipContainer.querySelector(`#${icon.id}-tooltip`)
            if (tooltip && !tooltip.classList.contains('pinned')) {
                tooltip.classList.remove('visible')
                setTimeout(() => tooltipContainer.removeChild(tooltip), 200)
            }
        })

        icon.addEventListener('click', () => {
            const tooltip = tooltipContainer.querySelector(`#${icon.id}-tooltip`)

            if (!tooltip) return
            tooltip.classList.toggle('pinned')
        })
    })

    tooltips.remove()
}

const renderIfs = () => {
    const elements = document.querySelectorAll('div[if]');

    elements.forEach(elem => {
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

const renderDbs = () => {
    const elements = document.querySelectorAll('div[db]');

    elements.forEach(elem => {
        const dbIcon = document.createElement('span')
        dbIcon.classList.add('db-icon')

        const dbTooltip = document.createElement('span')
        dbTooltip.classList.add('db-tooltip')

        elem.appendChild(dbIcon)
        elem.appendChild(dbTooltip)
    })

    initIcons()
}

const connect = () => {
    document.querySelectorAll("div[next]")
        .forEach(el => {
            drawArrow(el.id, el.getAttribute("next"))
        })
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

const render = () => {
    renderIfs()
    renderDbs()
}

render();

draw()