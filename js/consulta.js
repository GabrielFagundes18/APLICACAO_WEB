const JSON_URL = "https://mfpledon.com.br/contatos/contatosJSONv2.php";

async function consultarPorSexo() {
    const valor = document.querySelector("input[name='sexo']:checked");

    if (!valor) {
        alert("Selecione um sexo.");
        return;
    }

    const alvo = document.getElementById("conteudoServidor");
    alvo.innerHTML = "Carregando...";

    try {
        const res = await fetch(JSON_URL);
        const data = await res.json();

        const filtrados = data.pessoas.filter(p =>
            p.sexo.toUpperCase() === valor.value.toUpperCase()
        );

        exibirCards(filtrados);

    } catch (e) {
        alvo.innerHTML = "Erro ao carregar dados.";
    }
}

function exibirCards(lista) {
    const area = document.getElementById("conteudoServidor");

    if (!lista.length) {
        area.innerHTML = "<p>Nenhum contato encontrado.</p>";
        return;
    }

    area.innerHTML = `
    <div class="cards-container">
        ${lista.map(p => `
            <div class="card">
                <h4>${p.nome}</h4>
                <p>Email: ${p.mail}</p>
                <p>Telefone: ${p.telefone}</p>
                <p>Sexo: ${p.sexo}</p>
            </div>
        `).join("")}
    </div>`;
}