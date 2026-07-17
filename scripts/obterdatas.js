// Preenche o ano atual dinamicamente no rodapé
const anoAtual = document.getElementById("anoatual");
anoAtual.textContent = new Date().getFullYear();

// Preenche a data da última modificação do documento no rodapé
const ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = `Última modificação: ${document.lastModified}`;