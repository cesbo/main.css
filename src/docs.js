window.ListboxDragstart = function(ev) {
    console.log(ev)
}

window.ListboxDragend = function(ev) {
    console.log(ev)
}

window.ListboxDragover = function(ev) {
}

window.ListboxDragenter = function(ev) {
}

window.ListboxDragleave = function(ev) {
}

window.OpenDropdown = function(target) {
    const el = document.querySelector(target)
    el.classList.toggle('open')
}

const modalStack = []

function closeModalOnEscape(ev) {
    if(ev.key == 'Escape') {
        CloseModal()
    }
}

window.OpenModal = function(target) {
    const el = document.querySelector(target)
    modalStack.push(el)
    el.classList.add('open')
    if(modalStack.length == 1) {
        window.addEventListener('keydown', closeModalOnEscape)
    }
}

window.CloseModal = function() {
    const el = modalStack.pop()
    el.classList.remove('open')
    if(modalStack.length == 0) {
        window.removeEventListener('keydown', closeModalOnEscape)
    }
}

window.ToggleOpen = function(target) {
    const el = document.querySelector(target)
    el.classList.toggle('open')
}

window.ToggleTheme = function(ev) {
    const el = document.documentElement
    if(el.classList.contains('light')) {
        el.classList.remove('light')
        ev.target.innerText = 'Light'
    } else {
        el.classList.add('light')
        ev.target.innerText = 'Dark'
    }
    ev.target.blur()
}

window.ToggleDisable = function(target) {
    const el = document.querySelector(target)
    el.disabled = !el.disabled
}

window.ScrollCarousel = function(target, direction) {
    const el = document.querySelector(target)
    el.scrollLeft += el.clientWidth * direction
}

function renderSource(el) {
    const lines = el
        .innerHTML
        .replaceAll('=""', '')
        .split('\n')
        .filter(line => line.trim() !== '')

    const rx = /(<(hr)|(input)[^>]*)/

    let indent = 0;
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if(i == 0) {
            indent = line.match(/^\s*/)[0].length
        }
        lines[i] = line.substr(indent).replaceAll('\t', '  ').replace(rx, "$1 /")
    }
    const html = lines.join('\n')
    return hljs.highlight(html, {language: 'xml'}).value
}

function initDocsBox() {
    document.querySelectorAll('.docs-box').forEach(el => {
        const toolbar = document.createElement('div')
        toolbar.classList.add('docs-box-toolbar')

        /* source preview */
        const details = document.createElement('details')
        details.classList.add('docs-box-source')
        toolbar.appendChild(details)

        const summary = document.createElement('summary')
        summary.textContent = 'Source'
        details.appendChild(summary)

        const pre = document.createElement('pre')
        pre.innerHTML = renderSource(el)
        details.appendChild(pre)

        /* */
        el.parentNode.insertBefore(toolbar, el.nextSibling)
    })
}

function onHashChange() {
    document.querySelectorAll('.docs-navbar a.active').forEach(el => {
        el.classList.remove('active')
    })

    document.querySelectorAll('.docs-navbar a[href="' + location.hash + '"]').forEach(el => {
        el.classList.add('active')
    })

    window.scrollTo(0, 0)
}

document.addEventListener('DOMContentLoaded', function init() {
    document.removeEventListener('DOMContentLoaded', init)

    if(location.hash === '') {
        location.hash = '#quick-start'
    }

    initDocsBox()

    window.addEventListener('hashchange', onHashChange)
    onHashChange()

    document.body.style.display = 'initial'
})
