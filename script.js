function aplicarTema(tema) {
    const botao = document.getElementById("botao-tema");

    if (tema === "claro") {
        document.body.classList.add("tema-claro");
        botao.textContent = "Modo escuro";
    } else {
        document.body.classList.remove("tema-claro");
        botao.textContent = "Modo claro";
    }
}

function alternarTema() {
    const temaAtual = document.body.classList.contains("tema-claro") ? "claro" : "escuro";
    const novoTema = temaAtual === "claro" ? "escuro" : "claro";

    aplicarTema(novoTema);

    try {
        localStorage.setItem("tema", novoTema);
    } catch (erro) {
        console.log("Não foi possível salvar o tema.");
    }
}

function carregarTema() {
    let temaSalvo = "escuro";

    try {
        temaSalvo = localStorage.getItem("tema") || "escuro";
    } catch (erro) {
        temaSalvo = "escuro";
    }

    aplicarTema(temaSalvo);
}

function enviarMensagem(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const resposta = document.getElementById("resposta-formulario");

    resposta.classList.remove("erro", "sucesso");

    if (nome === "" || email === "" || mensagem === "") {
        resposta.textContent = "Preencha todos os campos antes de enviar.";
        resposta.classList.add("erro");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        resposta.textContent = "Digite um e-mail válido.";
        resposta.classList.add("erro");
        return;
    }

    resposta.textContent = "Obrigado, " + nome + "! Sua mensagem foi enviada.";
    resposta.classList.add("sucesso");
    document.getElementById("formulario-contato").reset();
}

document.addEventListener("DOMContentLoaded", function () {
    carregarTema();

    document.getElementById("botao-tema").addEventListener("click", alternarTema);

    const formulario = document.getElementById("formulario-contato");
    if (formulario) {
        formulario.addEventListener("submit", enviarMensagem);
    }
});