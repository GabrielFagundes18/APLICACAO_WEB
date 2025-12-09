document.addEventListener("DOMContentLoaded", function () {

  async function includeHTML(el, url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao carregar " + url);
      const html = await res.text();
      el.innerHTML = html;
    } catch (e) {
      console.error(e);
    }
  }

  const includes = document.querySelectorAll("[data-include]");
  includes.forEach((el) => {
    includeHTML(el, el.getAttribute("data-include")).then(() => {
      marcarNavAtiva();
      atualizarAnoFooter();
    });
  });

  function marcarNavAtiva() {
    const pagina = location.pathname.split("/").pop().toLowerCase();

    document.querySelectorAll(".main-nav a").forEach((a) => {
      a.classList.remove("active");

      const href = a.getAttribute("href").split("/").pop().toLowerCase();
      if (href === pagina) a.classList.add("active");
    });
  }

  function atualizarAnoFooter() {
    const span = document.getElementById("anoAtual");
    if (span) span.textContent = new Date().getFullYear();
  }
});