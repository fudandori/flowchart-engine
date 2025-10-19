const tooltipContainer = document.getElementById('tooltip-container')

const draw = () => {
  createDefs()
  connect()
  link()
}

const redraw = () => {
  svg.replaceChildren()
  draw()
}

const showTooltip = (id, text, type) => {
  const tooltip = document.createElement('div')
  tooltip.id = `${id}-tooltip`
  tooltip.textContent = text
  tooltip.classList.add('tooltip-notification', 'visible', type)
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
      tooltipMap[key] = value
    })

  const icons = document.querySelectorAll('.icon')

  icons.forEach((icon, i) => {
    icon.id = `icon-${i}`

    const text = tooltipMap[icon.parentElement.id]

    icon.addEventListener('mouseenter', () => {
      const tooltip = tooltipContainer.querySelector(`#${icon.id}-tooltip`)
      if (!tooltip) {
        const type = icon.parentElement.hasAttribute('db') ? 'db' : icon.parentElement.hasAttribute('kafka') ? 'kafka' : 'api'
        showTooltip(icon.id, text, type)
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

const fillIf = (elem) => {
  const originalContent = elem.innerHTML
  elem.innerHTML = ''

  const randomDiv = document.createElement('div')
  randomDiv.id = crypto.randomUUID?.() || Math.random().toString(36).slice(2, 11)

  const span = document.createElement('span')
  span.innerHTML = originalContent

  elem.appendChild(randomDiv)
  elem.appendChild(span)

  return elem
}

const renderBoxes = () => {
  const elements = document.querySelectorAll('if, sub, step, kafka, db, api')

  elements.forEach(elem => {
    const div = document.createElement('div')

    if (elem.tagName === 'IF') fillIf(elem)

    div.setAttribute(elem.tagName, '')
    for (const attr of elem.attributes) {
      div.setAttribute(attr.name, attr.value);
    }

    div.append(...elem.childNodes)
    elem.replaceWith(div)
  })
}

const renderIcons = () => {
  const elements = document.querySelectorAll('[db], [kafka], [api]')

  elements.forEach(elem => {
    const dbIcon = document.createElement('span')
    dbIcon.classList.add('icon')
    elem.appendChild(dbIcon)
  })

  initIcons()
}

const renderGroups = () => {
  document
    .querySelectorAll('group')
    .forEach(group => {
      const container = document.createElement('div')
      container.setAttribute('container', '')
      container.append(...group.childNodes)
      group.replaceWith(container)
    })
}

const connect = () => {
  document.querySelectorAll("div[next]")
    .forEach(el => {
      drawArrow(el.id, el.getAttribute("next"))
    })

  document.querySelectorAll("div[fork]")
    .forEach(el => {
      el.getAttribute("fork")
        .split(';')
        .forEach(fork => {
          const split = fork.split(',')
          forkLine(el.id, split[0], parseInt(split[1]))
        })
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
  (['resize', 'scroll']).forEach(evt => window.addEventListener(evt, redraw))
  renderBoxes()
  renderGroups()
  renderIcons()
}

render()
draw()
