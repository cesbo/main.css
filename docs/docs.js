function toggleSource(event) {
    const pre = event.target.querySelector('pre');
    if(!event.target.open) {
        pre.textContent = ''
        return
    }

    const lines = event.target.previousElementSibling
        .innerHTML
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
    nav.querySelectorAll('a.active').forEach(el => el.classList.remove('active'))

    const hash = location.hash.substring(2).split('/')
    const element = document.getElementById(hash)
    if(element) {
        nav.querySelectorAll(`a[href="#/${hash}"]`).forEach(el => el.classList.add('active'))
        element.style.display = 'block'
    }
}

function init() {
    window.addEventListener('hashchange', onHashChange)
    if(location.hash === '') {
        location.hash = '#/quick-start'
    } else {
        onHashChange()
    }
}

window.addEventListener('load', init, {once: true})
