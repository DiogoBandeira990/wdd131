// templos.js

// Ano de direitos autorais e data da última modificação no footer
document.getElementById('ano').textContent = new Date().getFullYear();
document.getElementById('ultimaModificacao').textContent = document.lastModified;

// Menu hambúrguer responsivo
const botaoMenu = document.getElementById('botao-menu');
const navPrincipal = document.getElementById('nav-principal');

botaoMenu.addEventListener('click', () => {
    navPrincipal.classList.toggle('oculto');
    const menuAberto = !navPrincipal.classList.contains('oculto');
    botaoMenu.setAttribute('aria-expanded', menuAberto);
    botaoMenu.textContent = menuAberto ? '✕' : '☰';
});