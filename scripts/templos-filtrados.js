// templos-filtrados.js
// Gera os cartões de templo dinamicamente a partir do array "templos"
// (definido em dados-templos.js) e responde aos filtros do menu principal.

const galeria = document.getElementById("galeria-templos");
const legenda = document.getElementById("legenda-filtro");
const botoesFiltro = document.querySelectorAll(".nav-principal__item");

const formatadorData = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

const formatadorArea = new Intl.NumberFormat("pt-BR");

// Cria o HTML de um único cartão de templo a partir de um objeto de templo.
function criarCartaoTemplo(templo) {
  const cartao = document.createElement("article");
  cartao.className = "cartao-templo";

  const dataFormatada = formatadorData.format(new Date(templo.dedicado));
  const areaFormatada = `${formatadorArea.format(templo.areaPes2)} pés²`;

  cartao.innerHTML = `
    <div class="cartao-templo__imagem-wrap">
      <img
        src="${templo.imagem}"
        alt="${templo.nome}"
        loading="lazy"
        class="cartao-templo__imagem"
      >
    </div>
    <div class="cartao-templo__corpo">
      <h2 class="cartao-templo__nome">${templo.nome}</h2>
      <hr class="cartao-templo__linha">
      <dl class="cartao-templo__dados">
        <div>
          <dt>Localização</dt>
          <dd>${templo.local}</dd>
        </div>
        <div>
          <dt>Dedicação</dt>
          <dd>${dataFormatada}</dd>
        </div>
        <div>
          <dt>Área total</dt>
          <dd>${areaFormatada}</dd>
        </div>
      </dl>
    </div>
  `;

  return cartao;
}

// Recebe um array de templos (já filtrado ou não) e desenha os cartões.
function renderizarTemplos(listaTemplos) {
  galeria.innerHTML = "";
  const fragmento = document.createDocumentFragment();

  listaTemplos.forEach((templo) => {
    fragmento.appendChild(criarCartaoTemplo(templo));
  });

  galeria.appendChild(fragmento);
}

// Aplica a regra de filtragem correspondente ao botão de navegação clicado.
function filtrarTemplos(filtro) {
  switch (filtro) {
    case "antigos":
      return templos.filter((t) => new Date(t.dedicado).getFullYear() < 1900);
    case "novos":
      return templos.filter((t) => new Date(t.dedicado).getFullYear() > 2000);
    case "grandes":
      return templos.filter((t) => t.areaPes2 > 90000);
    case "pequenos":
      return templos.filter((t) => t.areaPes2 < 10000);
    default:
      return templos;
  }
}

const textoLegenda = {
  todos: "Exibindo todos os templos",
  antigos: "Templos antigos — dedicados antes de 1900",
  novos: "Templos novos — dedicados depois de 2000",
  grandes: "Templos grandes — mais de 90.000 pés²",
  pequenos: "Templos pequenos — menos de 10.000 pés²"
};

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    const filtro = botao.dataset.filtro;

    botoesFiltro.forEach((b) => b.removeAttribute("aria-current"));
    botao.setAttribute("aria-current", "page");

    legenda.textContent = textoLegenda[filtro] ?? textoLegenda.todos;
    renderizarTemplos(filtrarTemplos(filtro));
  });
});

// Rodapé: ano de direitos autorais e data da última modificação da página.
document.getElementById("ano-atual").textContent = new Date().getFullYear();
document.getElementById("ultima-modificacao").textContent = document.lastModified;

// Renderização inicial: todos os templos.
renderizarTemplos(templos);
