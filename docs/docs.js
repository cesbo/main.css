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

function onHashChange() {
    const nav = document.querySelector('nav.docs-navbar')
    document.querySelectorAll('.docs-section').forEach(el => el.style.display = 'none')
    nav.querySelectorAll('a.focus').forEach(el => el.classList.remove('focus'))

    const hash = location.hash.substring(2).split('/')
    const element = document.getElementById(hash)
    if(element) {
        nav.querySelectorAll(`a[href="#/${hash}"]`).forEach(el => el.classList.add('focus'))
        element.style.display = 'block'
    }
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

function init() {
    if(location.hash === '') {
        location.hash = '#/quick-start'
    }

    initSourcePreview()

    window.addEventListener('hashchange', onHashChange)
    onHashChange()
}

window.addEventListener('load', init, {once: true})

})();
