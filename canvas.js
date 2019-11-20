function resizeCanvas(width, height) {
  canvas.width = width;
  canvas.height = height;
}


function resizeToFit() {
  var width = parseFloat(window.getComputedStyle(canvas).width);
  var height = parseFloat(window.getComputedStyle(canvas).height);
  resizeCanvas(width, height);
}

var canvas = document.getElementById('meuCanvas');

var circulo = canvas.getContext('2d');
var linha = canvas.getContext('2d');

resizeToFit();

var selectCampo = document.getElementById('selectCampo');
var checkCurva = document.getElementById('checkCurva');
var checkPontos = document.getElementById('checkPontos');
var checkPligonais = document.getElementById('checkPoligonais');
var interacoes = document.getElementById('interacoes');

var cores_controle = ["#00ff00", "#006666","#0000cc", "#333300", "#3366ff","#660000", "#666666","#660099"];
var cores_bezier = ["#cc0099","#ffff00","#ff3366","#ffffcc","#ff00ff","#ffffff","#996600", "#663366"];


function desenharControle(){
let a;
for(a = curvasControle.length-1;a>=0;a--){


if(curvasControle[a].desenharPontos){
  let i;
  for(i=0; i<curvasControle[a].pontos.length; i++){
    circulo.beginPath();
    circulo.arc(curvasControle[a].pontos[i][0], curvasControle[a].pontos[i][1], 5, 0, 2 * Math.PI);
    circulo.fillStyle = cores_controle[a % cores_controle.length];
    circulo.fill();
    circulo.stroke();
  }
}

if(curvasControle[a].desenharPoligonais){
  let j;
  for(j=0; j<curvasControle[a].poligonais.length; j++){
    linha.beginPath();
    linha.moveTo(curvasControle[a].poligonais[j][0][0],curvasControle[a].poligonais[j][0][1]);
    linha.lineTo(curvasControle[a].poligonais[j][1][0],curvasControle[a].poligonais[j][1][1]);
    linha.strokeStyle =  cores_controle[a % cores_controle.length];
    linha.stroke();
  }
}

if(curvasControle[a].desenharCurva){
  let k;
  for(k=0; k<curvasControle[a].poligonais_bezier.length; k++){
    linha.beginPath();
    linha.moveTo(curvasControle[a].poligonais_bezier[k][0][0],curvasControle[a].poligonais_bezier[k][0][1]);
    linha.lineTo(curvasControle[a].poligonais_bezier[k][1][0],curvasControle[a].poligonais_bezier[k][1][1]);
    linha.strokeStyle = cores_bezier[a+1 % cores_bezier.length];
    linha.stroke();
  }
}

}

}


function Redesenhar(){
circulo.clearRect(0,0,canvas.width, canvas.height);
criarCurvaBezier(interacoes.value);
desenharControle();
}