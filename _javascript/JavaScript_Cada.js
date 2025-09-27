 // Função de validação simples com regex
 function validarCadastro() {
    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var idade = document.getElementById("idade").value.trim();
    var turma = document.getElementById("turma").value.trim();
    var esporte = document.getElementById("esporte").value.trim();
    var escolha = document.querySelector('input[name="escolha"]:checked');

    // Validação Nome: só letras e espaços (com acentos)
    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (nome === "" || !regexNome.test(nome)) {
        alert("Nome inválido! Use apenas letras e espaços (ex: Roberto).");
        return false;
    }

    // Validação Email: formato básico
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !regexEmail.test(email)) {
        alert("Email inválido! Use um formato como exemplo@gmail.com.");
        return false;
    }

    // Validação Telefone: 10 ou 11 dígitos
    var regexTelefone = /^\d{10,11}$/;
    if (telefone === "" || !regexTelefone.test(telefone)) {
        alert("Telefone inválido! Use 10 ou 11 dígitos (ex: 11999999999).");
        return false;
    }

    // Validação Idade: dígitos e entre 1-120
    var regexIdade = /^\d+$/;
    if (idade === "" || !regexIdade.test(idade) || parseInt(idade) < 1 || parseInt(idade) > 120) {
        alert("Idade inválida! Use um número entre 1 e 120.");
        return false;
    }

    // Validação Turma: letras, números e espaços
    var regexTurma = /^[a-zA-Z0-9À-ÿ\s]+$/;
    if (turma === "" || !regexTurma.test(turma)) {
        alert("Turma inválida! Use letras, números e espaços (ex: Turma A1).");
        return false;
    }

    // Validação Esporte: só letras e espaços
    var regexEsporte = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (esporte === "" || !regexEsporte.test(esporte)) {
        alert("Esporte inválido! Use apenas letras e espaços (ex: Futebol).");
        return false;
    }

    // Validação Escolha: pelo menos um selecionado
    if (!escolha) {
        alert("Selecione se deseja receber novidades (Sim ou Não).");
        return false;
    }

    return true; // Tudo OK
}

// Função de cadastro atualizada com validação
function aviso() {
    if (validarCadastro()) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    }
// Se falhar, o alert de erro já foi mostrado na validação
}

// Função JSON atualizada com validação (opcional)
function json() {
    if (!validarCadastro()) {
        alert("Preencha e corrija os campos antes de gerar o JSON!");
        return; // Para aqui se inválido
    }

    var form_js = {
        nome: "",
        email: "",
        telefone: "",
        idade: "",
        turma: "",
        esporte: "",
        escolha: "",
    };

    var el_nome = document.getElementById("nome");
    form_js.nome = el_nome.value;
    var el_email = document.getElementById("email");
    form_js.email = el_email.value;
    var el_telefone = document.getElementById("telefone");
    form_js.telefone = el_telefone.value;
    var el_idade = document.getElementById("idade");
    form_js.idade = el_idade.value;
    var el_turma = document.getElementById("turma");
    form_js.turma = el_turma.value;
    var el_esporte = document.getElementById("esporte");
    form_js.esporte = el_esporte.value;
    var el_escolha = document.querySelector('input[name="escolha"]:checked');
    form_js.escolha = el_escolha ? el_escolha.value : "";

    var jsonString = JSON.stringify(form_js, null, 2);

    document.getElementById("jsonContent").textContent = jsonString;
    document.getElementById("jsonModal").style.display = "block";
}

// Função para fechar o modal (mantida)
function closeModal() {
    document.getElementById("jsonModal").style.display = "none";
}

// Fecha o modal ao clicar fora dele (mantida)
window.onclick = function(event) {
    var modal = document.getElementById("jsonModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};