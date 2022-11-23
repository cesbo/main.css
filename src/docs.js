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

function initSourcePreview() {
    document.querySelectorAll('.docs-box').forEach(el => {
        const details = document.createElement('details')
        details.classList.add('docs-source')

        const summary = document.createElement('summary')
        summary.textContent = 'Source'
        details.appendChild(summary)

        const pre = document.createElement('pre')
        pre.innerHTML = renderSource(el)
        details.appendChild(pre)

        el.parentNode.insertBefore(details, el.nextSibling)
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

function init() {
    if(location.hash === '') {
        location.hash = '#quick-start'
    }

    initSourcePreview()

    window.addEventListener('hashchange', onHashChange)
    onHashChange()
}

document.addEventListener('alpine:init', init)
