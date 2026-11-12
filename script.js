/* Convite virtual · CPOR/SP
   Conteúdo que pode mudar fica todo aqui em cima. */

const CONVITE = {
  formulario: "https://docs.google.com/forms/d/e/1FAIpQLSddFb4ChG2wfqLAneSF9THKLDbxzMdTWvw0Ty1uSpltod7jzg/viewform?usp=header",
  email: "comsoc@cporsp.eb.mil.br",
  whatsapp: "5511939488270",
  whatsappTexto: "(11) 93948-8270",
  whatsappMensagem: "Olá! Gostaria de falar sobre a Cerimônia de Encerramento do Ano Letivo do CPOR/SP.",
  endereco: "Rua Alfredo Pujol, 681 · Santana · São Paulo (SP)",
  enderecoBusca: "Rua Alfredo Pujol, 681 - Santana, São Paulo - SP",
  prazoConfirmacao: "2026-11-30T23:59:59-03:00",
  eventos: [
    {
      nome: "Diplomação",
      inicio: "2026-12-03T19:00:00-03:00",
      dia: "03",
      mes: "dezembro",
      quando: "Quinta-feira · 19h",
      traje: [
        ["Militares", "5º Z1 ou correspondente"],
        ["Militares da reserva e civis", "Esporte fino"]
      ]
    },
    {
      nome: "Formatura",
      inicio: "2026-12-05T09:00:00-03:00",
      dia: "05",
      mes: "dezembro",
      quando: "Sábado · 9h",
      traje: [
        ["Oficiais", "4º com barretas ou correspondente"],
        ["Praças", "5º A1/5º A1S com barretas ou correspondente"],
        ["Militares da reserva e civis", "Esporte fino"]
      ]
    }
  ]
};

(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const calmo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links ---------- */
  const busca = encodeURIComponent(CONVITE.enderecoBusca);
  const links = {
    formulario: CONVITE.formulario,
    email: "mailto:" + CONVITE.email,
    whatsapp: "https://wa.me/" + CONVITE.whatsapp + "?text=" + encodeURIComponent(CONVITE.whatsappMensagem),
    maps: "https://www.google.com/maps/search/?api=1&query=" + busca,
    waze: "https://waze.com/ul?q=" + busca + "&navigate=yes"
  };
  $$("[data-link]").forEach(a => { a.href = links[a.dataset.link]; });
  $("#endereco").textContent = CONVITE.endereco;
  $("#email-texto").textContent = CONVITE.email;
  $("#whatsapp-texto").textContent = CONVITE.whatsappTexto;

  /* ---------- Envelope ---------- */
  const cena = $("#envelope");
  let aberto = false;
  document.body.classList.add("fechado");
  $("#conteudo").setAttribute("inert", "");
  $("#topo").setAttribute("inert", "");

  // O cartão sai do envelope (~1,8 s) e fica à mostra por 3 s; um toque passa adiante
  let seguiu = false, espera = null;
  function seguir() {
    if (seguiu) return;
    seguiu = true;
    clearTimeout(espera);
    document.body.classList.remove("fechado");
    $("#conteudo").removeAttribute("inert");
    $("#topo").removeAttribute("inert");
    window.scrollTo(0, 0);
    cena.classList.add("saindo");
    setTimeout(() => { cena.hidden = true; }, 600);
  }
  function abrir() {
    if (aberto) return;
    aberto = true;
    cena.classList.add("abrindo");
    espera = setTimeout(seguir, calmo ? 2000 : 4800);
    // depois que o cartão saiu, tocar em qualquer lugar segue para o convite
    setTimeout(() => cena.addEventListener("click", seguir), calmo ? 300 : 1900);
  }
  $("#abrir").addEventListener("click", e => { e.stopPropagation(); abrir(); });
  $("#envelope-peca").addEventListener("click", e => { if (!aberto) { e.stopPropagation(); abrir(); } });

  /* ---------- Capa: texto sempre abaixo da bandeira do Brasil ---------- */
  // Na foto cpor-aereo.jpg (1536 × 1024) a faixa da bandeira termina na linha 517.
  const FOTO = { w: 1536, h: 1024, bandeira: 517 };
  const capaEl = $(".capa"), capaImg = $(".capa-foto img");
  function posicionarCapa() {
    const w = capaEl.clientWidth, h = capaEl.clientHeight;
    const emPe = window.matchMedia("(max-aspect-ratio: 1 / 1)").matches;
    let linha;
    if (emPe) {
      // celular: a foto tem altura fixa e começa no topo
      linha = FOTO.bandeira * capaImg.clientHeight / FOTO.h;
    } else {
      // computador: object-fit cover, posição vertical 60%
      const esc = Math.max(w / FOTO.w, h / FOTO.h);
      linha = (h - FOTO.h * esc) * 0.6 + FOTO.bandeira * esc;
    }
    capaImg.style.setProperty("--linha-bandeira", linha.toFixed(1) + "px");
    capaEl.style.setProperty("--abaixo-bandeira", (linha + (emPe ? 22 : 26)).toFixed(1) + "px");
  }
  posicionarCapa();
  window.addEventListener("resize", posicionarCapa);
  if (!capaImg.complete) capaImg.addEventListener("load", posicionarCapa);

  /* ---------- Cartões da programação ---------- */
  const icVirar = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 0 1-13.7 5.6L4 15M4 20v-5h5"/></svg>';
  $("#cartoes").innerHTML = CONVITE.eventos.map((e, i) => `
    <article class="cartao revelar" data-i="${i}" aria-label="${e.nome}, ${e.dia} de ${e.mes}, ${e.quando}">
      <div class="cartao-giro">
        <div class="face frente">
          <div class="faixa">${e.nome}</div>
          <div class="face-corpo">
            <span class="dia">${e.dia}</span>
            <span class="mes">${e.mes}</span>
            <span class="quando">${e.quando}</span>
          </div>
          <div class="face-acoes">
            <button type="button" class="mini virar" aria-label="Ver o traje da ${e.nome}">${icVirar}Traje</button>
          </div>
        </div>
        <div class="face verso" aria-hidden="true">
          <div class="face-corpo">
            <p class="traje-titulo">Traje</p>
            <ul class="traje">
              ${e.traje.map(([quem, qual]) => `<li><div class="quem">${quem}</div><div class="qual">${qual}</div></li>`).join("")}
            </ul>
          </div>
          <div class="face-acoes">
            <button type="button" class="mini virar" tabindex="-1" aria-label="Voltar para a data da ${e.nome}">${icVirar}Voltar</button>
          </div>
        </div>
      </div>
    </article>`).join("");

  $$(".cartao").forEach(c => {
    const frente = $(".frente", c), verso = $(".verso", c);
    const virar = () => {
      const v = c.classList.toggle("virado");
      frente.setAttribute("aria-hidden", v);
      verso.setAttribute("aria-hidden", !v);
      $$(".frente a, .frente button", c).forEach(el => el.tabIndex = v ? -1 : 0);
      $(".verso button", c).tabIndex = v ? 0 : -1;
      (v ? $(".verso button", c) : $(".frente .virar", c)).focus({ preventScroll: true });
    };
    c.addEventListener("click", ev => {
      if (ev.target.closest("a")) return;
      virar();
    });
  });

  /* ---------- Contagem regressiva ---------- */
  const relogio = $("#relogio"), fim = $("#contagem-fim"), tituloContagem = $("#contagem-titulo");
  const campos = { d: $('[data-u="d"]'), h: $('[data-u="h"]'), m: $('[data-u="m"]'), s: $('[data-u="s"]') };
  const dois = n => String(n).padStart(2, "0");
  function tique() {
    const agora = Date.now();
    const prox = CONVITE.eventos.find(e => new Date(e.inicio).getTime() > agora);
    if (!prox) {
      const ultimo = CONVITE.eventos[CONVITE.eventos.length - 1];
      const mesmoDia = new Date(agora).toDateString() === new Date(ultimo.inicio).toDateString();
      relogio.hidden = true; fim.hidden = false;
      tituloContagem.textContent = mesmoDia ? "É hoje" : "Cerimônias realizadas";
      fim.textContent = mesmoDia ? "A Formatura é hoje. Bem-vindos!" : "Obrigado por fazer parte deste momento.";
      return false;
    }
    tituloContagem.textContent = "Faltam para a " + prox.nome;
    let r = Math.floor((new Date(prox.inicio).getTime() - agora) / 1000);
    const v = { d: Math.floor(r / 86400), h: Math.floor(r % 86400 / 3600), m: Math.floor(r % 3600 / 60), s: r % 60 };
    for (const k in v) {
      const txt = dois(v[k]);
      if (campos[k].textContent !== txt) {
        campos[k].textContent = txt;
        if (!calmo) { campos[k].classList.remove("virou"); void campos[k].offsetWidth; campos[k].classList.add("virou"); }
      }
    }
    return true;
  }
  if (tique()) { const id = setInterval(() => { if (!tique()) clearInterval(id); }, 1000); }

  /* ---------- Prazo de confirmação ---------- */
  (function () {
    const ms = new Date(CONVITE.prazoConfirmacao).getTime() - Date.now();
    const dias = Math.ceil(ms / 86400000);
    let t;
    if (ms < 0) t = "O prazo terminou. Em caso de dúvida, fale com a Comunicação Social.";
    else if (dias <= 1) t = "Hoje é o último dia para confirmar.";
    else t = "Faltam " + dias + " dias para o prazo. Leva menos de um minuto.";
    $("#prazo").textContent = t;
  })();

  /* ---------- Selo postal da mensagem acompanha levemente a rolagem ---------- */
  const msg = $("#mensagem-texto");
  const selo = $(".selo-postal");
  function moverSelo() {
    if (!selo) return;
    // aparece só depois de rolar um pouco a partir da primeira página; volta a sumir lá em cima
    selo.classList.toggle("aparece", window.scrollY > capaEl.offsetHeight * 0.3);
    if (calmo) return;
    const r = msg.getBoundingClientRect(), vh = window.innerHeight;
    selo.style.setProperty("--desloca", Math.max(0, (r.top - vh / 2) * -0.06).toFixed(1) + "px");
  }
  window.addEventListener("scroll", moverSelo, { passive: true });
  moverSelo();

  /* ---------- Pontinhos dos cartões (celular) ---------- */
  const trilhoCartoes = $("#cartoes"), pontos = $$("#pontos span");
  trilhoCartoes.addEventListener("scroll", () => {
    const i = Math.round(trilhoCartoes.scrollLeft / Math.max(1, trilhoCartoes.scrollWidth - trilhoCartoes.clientWidth));
    pontos.forEach((p, k) => p.classList.toggle("ativo", k === i));
  }, { passive: true });

  /* ---------- Setas: cada uma leva à página seguinte ---------- */
  document.addEventListener("click", e => {
    const b = e.target.closest(".proxima");
    if (!b) return;
    const alvo = document.getElementById(b.dataset.para);
    if (alvo) alvo.scrollIntoView({ behavior: calmo ? "auto" : "smooth", block: "start" });
  });

  /* ---------- Selo da confirmação: só quando se chega à última página ---------- */
  const paginaConfirmar = $("#confirmar");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => paginaConfirmar.classList.toggle("chegou", e.intersectionRatio > .55),
      { threshold: [0, .55, 1] }).observe(paginaConfirmar);
  } else {
    paginaConfirmar.classList.add("chegou");
  }

  /* ---------- Entrada ao rolar ---------- */
  const alvos = $$(".revelar");
  if ("IntersectionObserver" in window && !calmo) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    alvos.forEach(a => io.observe(a));
  } else {
    alvos.forEach(a => a.classList.add("visivel"));
  }
})();
