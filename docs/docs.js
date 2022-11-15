(function() {
'use strict';

function renderSource(el) {
    const lines = el
        .innerHTML
        .replaceAll('=""', '')
        .split('\n')
        .filter(line => line.trim() !== '')

    let indent = 0;
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if(i == 0) {
            indent = line.match(/^\s*/)[0].length
        }
        lines[i] = line.substr(indent).replaceAll('\t', '  ')
    }
    const html = lines.join('\n')
    return hljs.highlightAuto(html).value
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
    document.querySelectorAll('.docs-navbar a.focus').forEach(el => {
        el.classList.remove('focus')
    })

    document.querySelectorAll('.docs-navbar a[href="' + location.hash + '"]').forEach(el => {
        el.classList.add('focus')
    })

    window.scrollTo(0, 0)
}

window.DropdownOpen = function(event) {
    const btn = event.target
    const el = btn.parentNode

    el.classList.toggle('open')

    // TODO
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

})();
