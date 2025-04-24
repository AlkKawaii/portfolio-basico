customElements.define('custom-button', (await import('./components/button.js')).default);
customElements.define('custom-heading', (await import('./components/heading.js')).default);

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada!');
});