let parado = true;
let timerDiv1;
let podeAtirar = true;
let bala;
let timerBala;
let timerJogo;
let alvosRestantes = 0;
let tempo = 0;
let recorde = localStorage.getItem("recorde") || 0;  

const fundo = document.querySelector("#fundo");
const div1 = document.querySelector("#div1");
const contador = document.querySelector("#contador");
const recordeDisplay = document.querySelector("#recorde");
const botaoReiniciar = document.querySelector("#reiniciar");
const audio = document.querySelector("#audio"); 
document.querySelector("#iniciar").addEventListener("click", () => iniciar());

function iniciar() {
    div1.style.left = "35vw";
    div1.style.top = "35vw";

    audio.play();

    document.querySelector("#atirar").addEventListener("click", () => atirar());
    document.querySelector("#esquerda").addEventListener("click", () => move('esquerda'));
    document.querySelector("#direita").addEventListener("click", () => move('direita'));
    
    document.querySelector("#iniciar").style.visibility = "hidden";
    botaoReiniciar.style.visibility = "hidden";

    iniciarContador();
    criarAlvos();
}

function iniciarContador() {
    tempo = 0;
    contador.textContent = `Tempo: ${tempo}s`;
    timerJogo = setInterval(() => {
        tempo++;
        contador.textContent = `Tempo: ${tempo}s`;
    }, 1000);
}

function criarAlvos() {
    const numeroAlvos = Math.floor(Math.random() * 6) + 10; 
    alvosRestantes = numeroAlvos;

    for (let i = 0; i < numeroAlvos; i++) {
        const alvo = document.createElement("img");
        alvo.classList.add("target");
        alvo.src = "./img/barraca.png";  

        const randomX = Math.random() * (fundo.clientWidth - 30);  
        const randomY = Math.random() * (fundo.clientHeight - 30) * 0.7;  

        alvo.style.left = randomX + "px";
        alvo.style.top = randomY + "px";

        fundo.appendChild(alvo);
    }
}

function atirar() {
    if (podeAtirar) {
        bala = document.createElement("img");  
        bala.src = "./img/missel-test.png";  
        bala.classList.add("bullets");
        bala.style.left = parseInt(getComputedStyle(div1).left) + "px";
        bala.style.top = parseInt(getComputedStyle(div1).top) + "px";
        fundo.appendChild(bala);
        podeAtirar = false;
        timerBala = setInterval(() => moveBala(bala), 10);
    }
}

function moveBala(bala) {
    let top = parseInt(getComputedStyle(bala).top);
    bala.style.top = top - 5 + "px";

    if (top <= 0) {
        bala.parentElement.removeChild(bala);
        clearInterval(timerBala);
        podeAtirar = true;
    } else {
        verificarColisao(bala);
    }
}

function verificarColisao(bala) {
    const alvos = document.querySelectorAll(".target");

    alvos.forEach((alvo) => {
        const balaRect = bala.getBoundingClientRect();
        const alvoRect = alvo.getBoundingClientRect();

        if (
            balaRect.left < alvoRect.right &&
            balaRect.right > alvoRect.left &&
            balaRect.top < alvoRect.bottom &&
            balaRect.bottom > alvoRect.top
        ) {
            alvo.parentElement.removeChild(alvo);
            bala.parentElement.removeChild(bala);
            clearInterval(timerBala);
            podeAtirar = true;
            alvosRestantes--;

            if (alvosRestantes === 0) {
                finalizarJogo();
            }
        }
    });
}

function finalizarJogo() {
    clearInterval(timerJogo);
    if (tempo < recorde || recorde === 0) {
        recorde = tempo;
        localStorage.setItem("recorde", recorde); 
    }
    recordeDisplay.textContent = `Recorde: ${recorde}s`;
    botaoReiniciar.style.visibility = "visible";
}

function move(direcao) {
    if (!parado) {
        clearInterval(timerDiv1);
    }
    if (direcao === "direita") {
        timerDiv1 = setInterval(() => direita(), 15);
        parado = false;
    } else if (direcao === "esquerda") {
        timerDiv1 = setInterval(() => esquerda(), 15);
        parado = false;
    }
}

function direita() {
    let div1Left = parseInt(getComputedStyle(div1).left);
    let fundoWidth = parseInt(getComputedStyle(fundo).width);
    let div1Width = parseInt(getComputedStyle(div1).width);

    div1.style.left = div1Left + 5 + "px";
    if (div1Left >= fundoWidth - div1Width) {
        clearInterval(timerDiv1);
    }
}

function esquerda() {
    let div1Left = parseInt(getComputedStyle(div1).left);

    div1.style.left = div1Left - 5 + "px";
    if (div1Left <= 0) {
        clearInterval(timerDiv1);
    }
}

botaoReiniciar.addEventListener("click", () => {

    const alvos = document.querySelectorAll(".target");
    alvos.forEach(alvo => alvo.remove());
    
    const balas = document.querySelectorAll(".bullets");
    balas.forEach(bala => bala.remove());

    div1.style.left = "35vw";
    div1.style.top = "35vw";
    iniciarContador();
    criarAlvos();
    botaoReiniciar.style.visibility = "hidden";
    document.querySelector("#iniciar").style.visibility = "hidden";

    audio.play();
});