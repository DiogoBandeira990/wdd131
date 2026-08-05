// templos-filtrados.js
// 1) Mantém o comportamento do menu mobile do álbum original.
// 2) Gera os cartões de templo dinamicamente a partir do array "templos"
//    (scripts/dados-templos.js), com carregamento lento nativo nas imagens.
// 3) Responde aos filtros do menu principal (Antigo, Novo, Grande, Pequeno).

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Menu mobile ---------- */

  const botaoMenu = document.getElementById("botao-menu");
  const navPrincipal = document.getElementById("nav-principal");

  botaoMenu.addEventListener("click", () => {
    const aberto = navPrincipal.classList.toggle("oculto") === false;
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.textContent = aberto ? "✕" : "☰";
  });

  /* ---------- Galeria de templos ---------- */

  const galeria = document.getElementById("galeria-templos");
  const legenda = document.getElementById("legenda-filtro");
  const botoesFiltro = document.querySelectorAll(".nav-link");

  const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });

  const formatadorArea = new Intl.NumberFormat("pt-BR");

  function criarCartaoTemplo(templo) {
    const cartao = document.createElement("figure");
    cartao.className = "cartao-templo";

    const dataFormatada = formatadorData.format(new Date(templo.dedicado));
    const areaFormatada = `${formatadorArea.format(templo.areaPes2)} pés²`;

    cartao.innerHTML = `
      <img
        src="${templo.imagem}"
        alt="${templo.nome}"
        loading="lazy"
      >
      <figcaption>
        <span class="cartao-templo__nome">${templo.nome}</span>
        <span class="cartao-templo__dado">${templo.local}</span>
        <span class="cartao-templo__dado">Dedicado em ${dataFormatada}</span>
        <span class="cartao-templo__dado">${areaFormatada}</span>
      </figcaption>
    `;

    return cartao;
  }

  function renderizarTemplos(listaTemplos) {
    galeria.innerHTML = "";
    const fragmento = document.createDocumentFragment();

    listaTemplos.forEach((templo) => {
      fragmento.appendChild(criarCartaoTemplo(templo));
    });

    galeria.appendChild(fragmento);
  }

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

      // Em telas pequenas, fecha o menu depois de escolher um filtro.
      if (window.matchMedia("(max-width: 767px)").matches) {
        navPrincipal.classList.add("oculto");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.textContent = "☰";
      }
    });
  });

  renderizarTemplos(templos);

  /* ---------- Rodapé ---------- */

  document.getElementById("ano").textContent = new Date().getFullYear();
  document.getElementById("ultimaModificacao").textContent = document.lastModified;

});
