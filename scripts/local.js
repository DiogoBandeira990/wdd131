// ===== Rodapé: ano atual e última modificação =====
const anoAtualEl = document.getElementById("ano-atual");
if (anoAtualEl) {
  anoAtualEl.textContent = new Date().getFullYear();
}

const ultimaModificacaoEl = document.getElementById("ultima-modificacao");
if (ultimaModificacaoEl) {
  ultimaModificacaoEl.textContent = document.lastModified;
}

const temperaturaAtual = 26; // °C
const velocidadeVentoAtual = 14; // km/h

function calcularSensacaoTermica(temperatura, velocidadeVento) {
  return 13.12 + 0.6215 * temperatura - 11.37 * Math.pow(velocidadeVento, 0.16) + 0.3965 * temperatura * Math.pow(velocidadeVento, 0.16);
}

const sensacaoTermicaEl = document.getElementById("sensacao-termica");

if (sensacaoTermicaEl) {
  
  const condicoesAtendidas = temperaturaAtual <= 10 && velocidadeVentoAtual > 4.8;

  sensacaoTermicaEl.textContent = condicoesAtendidas
    ? `${calcularSensacaoTermica(temperaturaAtual, velocidadeVentoAtual).toFixed(1)} °C`
    : "N/A";
}