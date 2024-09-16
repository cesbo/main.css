window.ToggleTheme = function(ev) {
    const el = document.documentElement
    if(el.classList.contains('light')) {
        el.classList.remove('light')
    } else {
        el.classList.add('light')
    }
    ev.target.blur()
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

    document.body.style.display = ''
})
