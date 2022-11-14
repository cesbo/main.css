(function() {
'use strict';

function toggleSource(event) {
    const pre = event.target.querySelector('pre');
    if(!event.target.open) {
        pre.textContent = ''
        return
    }

    const lines = event.target.previousElementSibling
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
    pre.innerHTML = hljs.highlightAuto(html).value
}

function initSourcePreview() {
    document.querySelectorAll('.docs-box').forEach(el => {
        const pre = document.createElement('pre')
        const details = document.createElement('details')
        details.classList.add('docs-source')
        const summary = document.createElement('summary')
        summary.textContent = 'Source'
        details.appendChild(summary)
        details.appendChild(pre)
        details.addEventListener('toggle', toggleSource)
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

window.ModalOpen = function(id) {
    document.getElementById(id).classList.add('open')
}

window.ModalClose = function(id) {
    document.getElementById(id).classList.remove('open')
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

window.addEventListener('load', init, {once: true})

})();
