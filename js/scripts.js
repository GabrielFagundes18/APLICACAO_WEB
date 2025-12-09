document.addEventListener("DOMContentLoaded", () => {
    inicializarCookies();

    const btn = document.getElementById("btnConsultar");
    if (btn) btn.addEventListener("click", consultarPorSexo);

    const area = document.getElementById("conteudoServidor");
    if (area && area.dataset.page === "geral") {
        carregarHtmlDoServidor();
    }
});

function inicializarCookies() {
    const banner = document.getElementById("cookie-banner");
    const btn = document.getElementById("aceitarCookies");

    if (!banner) return;

    if (!localStorage.getItem("cookiesAceitos")) {
        banner.style.display = "block";
    }

    if (btn) {
        btn.addEventListener("click", () => {
            localStorage.setItem("cookiesAceitos", "true");
            banner.style.display = "none";
        });
    }
}

function carregarHtmlDoServidor() {
    const url = "https://mfpledon.com.br/contatos/contatosHTMLv2.php";
    const target = document.getElementById("conteudoServidor");

    if (!target) return;

    target.innerHTML = '<p class="status-message loading">🔄 Carregando dados do servidor...</p>';
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            target.innerHTML = html;
            target.classList.add('loaded-success'); 
        })
        .catch(error => {
            console.error("Erro ao carregar servidor:", error);
            target.innerHTML = `<p class="status-message error">❌ Erro ao carregar os dados do servidor. (${error.message})</p>`;
        });
}