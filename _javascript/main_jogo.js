// SELEÇÃO DE ELEMENTOS DO DOM
// Cada constante abaixo faz referência a elementos HTML
// usados dentro do jogo.
const telaInicial = document.getElementById("inicia"); // Tela de início (menu inicial)
const gameBoard = document.querySelector(".game-board"); // Área onde o jogo acontece
const mario = document.querySelector(".mario"); // Personagem principal
const pipe = document.querySelector(".pipe"); // Obstáculo (cano)
const contaVidas = document.querySelector(".conta-vidas"); // Exibição de corações (vidas restantes)
const contaPontos = document.querySelector(".conta-pontos"); // Exibição da pontuação
const moeda = document.querySelector(".moeda"); // Item coletável (moeda)
const gameOver = document.querySelector(".game-over"); // Tela de fim de jogo

// Áudios usados no jogo
const audioPulo = document.getElementById("audio-pulo");
const audioDerrota = document.getElementById("audio-derrota");
const audioAlerta = document.getElementById("audio-alerta");
const musica = document.getElementById("musica");
const audioMoeda = document.getElementById("audio-moeda");


// VARIÁVEIS DE CONTROLE DO JOGO
let vidas = 3; // Quantidade inicial de vidas do jogador
let pontos = 0; // Pontuação inicial
let loop = null; // Guardará o loop principal (setInterval)
let velocidadePipe = 2; // Velocidade inicial do obstáculo (segundos da animação)
let colidindoComPipe = false; // Evita perder múltiplas vidas de uma vez


// FUNÇÃO PARA INICIAR O JOGO
function jogar() {
    clearInterval(loop); // Garante que não tenha mais de um loop ativo

    const selectPerson = document.getElementById("escolhaPerson"); // Dropdown para escolher o personagem
    const personagemEscolhido = selectPerson.value; // Valor selecionado pelo jogador

    // Caso não tenha personagem escolhido, bloqueia o início
    if (!personagemEscolhido) {
        alert("Escolha um personagem para poder iniciar!!");
        return;
    }

    // Define a sprite (gif) do personagem escolhido
    mario.src = `_media/${personagemEscolhido}.gif`;

    // Mostra apenas a tela do jogo e esconde as demais
    telaInicial.style.display = "none";
    gameBoard.style.display = "block";
    gameOver.style.display = "none";

    // Reinicia vidas e pontos
    vidas = 3;
    pontos = 0;
    renderizarVidas(); // Renderiza corações
    contaPontos.textContent = pontos; // Mostra pontuação zerada

    // Ativa a animação do pipe e da moeda
    pipe.style.animation = `pipe-animation ${velocidadePipe}s infinite linear`;
    moeda.style.display = "block";
    moeda.style.animation = `moeda-animation ${velocidadePipe}s infinite linear`;

    // Inicia o loop principal
    startLoop();
}


// FUNÇÃO DE PULO DO PERSONAGEM
function jump() {
    // Só permite pular se o jogo estiver ativo
    if (gameBoard.style.display !== "block") return;

    // Só permite novo pulo se não estiver pulando
    if (!mario.classList.contains("jump")) {
        mario.classList.add("jump"); // Adiciona a classe que ativa a animação de pulo

        // Reproduz o som do pulo (se existir)
        if (audioPulo) {
            audioPulo.currentTime = 0;
            audioPulo.play();
        }

        // Remove a classe após 800ms, voltando à posição inicial
        setTimeout(() => mario.classList.remove("jump"), 800);
    }
}


// LOOP PRINCIPAL DO JOGO
// Esse loop roda a cada 100ms e atualiza:
// - Colisões com pipe
// - Coleta de moedas
// - Pontuação automática
// - Dificuldade do jogo
function startLoop() {
    loop = setInterval(() => {
        // === Pega posições dos elementos ===
        const pipePosition = pipe.offsetLeft; // Distância do cano até a esquerda
        const moedaPosition = moeda.offsetLeft; // Distância da moeda até a esquerda
        const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", ""); // Altura atual do Mario

        // === Colisão com o pipe ===
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            if (!colidindoComPipe) { 
                perdervida(pipePosition, marioPosition); // Perde vida
                colidindoComPipe = true; // Marca colisão para não descontar mais vidas de uma vez
            }
        } else {
            colidindoComPipe = false; // Libera para futuras colisões
        }

        // Coleta da moeda
        if (moedaPosition <= 120 && moedaPosition > 0 && marioPosition > 80) {
            pontos += 10; // Ganha pontos
            contaPontos.textContent = pontos;

            // Som de moeda
            if (audioMoeda) {
                audioMoeda.currentTime = 0;
                audioMoeda.play();
            }

            // Esconde a moeda e reaparece após 5 segundos
            moeda.style.display = "none";
            setTimeout(() => {
                moeda.style.display = "block";
            }, 5000);

            atualizarDificuldade(); // Pode aumentar a dificuldade
        }

        // Pontuação por tempo jogado
        pontos++;
        contaPontos.textContent = pontos;
        atualizarDificuldade(); // Atualiza dificuldade a cada ponto
    }, 100); // Executa a cada 100ms
}


// FUNÇÃO DE PERDER VIDA
function perdervida(pipePosition, marioPosition) {
    vidas--; // Diminui vida
    renderizarVidas(); // Atualiza ícones de coração

    // Reproduz som de derrota
    if (audioDerrota) {
        audioDerrota.currentTime = 0;
        audioDerrota.play();
    }

    // Se restar apenas 1 vida, troca música por alerta
    if (vidas === 1) {
        if (musica) musica.pause();
        if (audioAlerta) {
            audioAlerta.currentTime = 0;
            audioAlerta.play();
        }
    }

    // Se não restarem vidas → fim de jogo
    if (vidas <= 0) {
        fimDeJogo(pipePosition, marioPosition);
    }
}


// FUNÇÃO DE FIM DE JOGO
function fimDeJogo(pipePosition, marioPosition) {
    clearInterval(loop); // Para o loop principal

    // Congela o pipe na posição em que estava
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    // Congela o Mario e troca sprite para "game over"
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "_imagens/game-over.png";
    mario.style.width = "100px"; // Ajuste de tamanho

    // Some com a moeda
    moeda.style.display = "none";

    // Exibe tela de "Game Over"
    gameOver.style.display = "flex";

    // Garante que o som de alerta pare
    if (audioAlerta) audioAlerta.pause();
}


// FUNÇÃO DE REINICIAR O JOGO
function reiniciarJogo() {
    // Recarrega a página, resetando tudo
    window.location.reload(true);
}


// FUNÇÃO DE DIFICULDADE DINÂMICA
// Ajusta a velocidade do pipe e altera o fundo
// conforme a pontuação aumenta.
function atualizarDificuldade() {
    let novaVelocidade = 2; // Velocidade base

    // Aumenta dificuldade progressivamente
    if (pontos >= 1200) novaVelocidade = 1;
    else if (pontos >= 900) novaVelocidade = 1.2;
    else if (pontos >= 600) novaVelocidade = 1.4;
    else if (pontos >= 300) novaVelocidade = 1.6;
    else if (pontos >= 100) novaVelocidade = 1.8;

    // Troca o fundo (ciclo dia → pôr do sol → noite)
    let fase = pontos % 1300; // reinicia após 1300
    let bg;
    if (fase < 500) {
        bg = 'linear-gradient(#87ceeb, #e0f6ff)'; // Dia
    } else if (fase < 1000) {
        bg = 'linear-gradient(#E42E0C, #F7B402)'; // Pôr do sol
    } else {
        bg = 'linear-gradient(#000030, #000E9D)'; // Noite
    }
    gameBoard.style.background = bg;

    // Só reinicia animações se a velocidade mudar
    if (novaVelocidade !== velocidadePipe) {
        velocidadePipe = novaVelocidade;

        // Reinicia animação do pipe
        pipe.style.animation = 'none';
        pipe.offsetHeight; // Força reflow
        pipe.style.left = '';
        pipe.style.animation = `pipe-animation ${velocidadePipe}s infinite linear`;

        // Reinicia animação da moeda
        moeda.style.animation = 'none';
        moeda.offsetHeight;
        moeda.style.left = '';
        moeda.style.animation = `moeda-animation ${velocidadePipe}s infinite linear`;
    }
}

// EVENTO DE TECLA PARA PULO
document.addEventListener("keydown", jump);

// FUNÇÃO PARA RENDERIZAR VIDAS NA TELA
//mostrar na tela a vida dos jogadores
function renderizarVidas() {
    //Serve para zerar o que está na tela antes de atualizar.
    contaVidas.innerHTML = ''; // Limpa o contador

    // Cria e adiciona um coração para cada vida
    //Um laço de repetição, se o jogador tem 3 vidas (vidas = 3), o laço vai rodar 3 vezes.
    for (let i = 0; i < vidas; i++) {

        //Cria uma imagem (<img>) para representar um coração (uma vida).
        const coracao = document.createElement('img');

        //Define o caminho da imagem do coração.
        coracao.src = '_imagens/coracao.png';

        //Define um texto alternativo, útil para acessibilidade (ex: leitores de tela)
        coracao.alt = 'Coração';

        coracao.className = 'icone-coracao';

        //Adiciona essa imagem do coração dentro do elemento contaVidas.
        contaVidas.appendChild(coracao);
    }
}