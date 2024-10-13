const painelGrafico = document.getElementById("painel_grafico");
const textoPainel = document.getElementById("texto_painel");
let corDaSombra = "#000000"; 

document.getElementById("corFundo").addEventListener("input", function () {
  painelGrafico.style.backgroundColor = this.value;
});

document.getElementById("borda").addEventListener("input", function () {
  painelGrafico.style.borderWidth = this.value + "px";
});

document.getElementById("textoCartao").addEventListener("input", function () {
  textoPainel.textContent = this.value;
});

document.getElementById("tamanhoCartao").addEventListener("input", function () {
  painelGrafico.style.width = this.value + "px";
});

document.getElementById("boxShadowSim").addEventListener("change", function () {
  painelGrafico.style.boxShadow = `5px 5px 15px ${corDaSombra}`;
});

document.getElementById("boxShadowNao").addEventListener("change", function () {
  painelGrafico.style.boxShadow = "none";
});

document.getElementById("corSombra").addEventListener("input", function () {
  corDaSombra = this.value; 
  if (document.getElementById("boxShadowSim").checked) {
    painelGrafico.style.boxShadow = `5px 5px 15px ${corDaSombra}`;
  }
});
