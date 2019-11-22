//Array que vai armazenas as minhas curvas de contrle

var curvasControle = [];

var curvaSelecionada=0;
var todasCurvas = 1;

var apertando = false;
var moveu = false;

//obter o  índice do ponto de controle que o cursor está clicando
var indiceClick; 

//função para inicializar a curva
function CriarCurva(){
  
  //Objeto referente a UMA curva de controle
  let curvaControle = new Object();
  
  //Agora eu vou definir os componentes que minha curva de controle vai possuir
  //Tipo os atributos do meu objeto curvaControle
	curvaControle.pontos = [];
  //Aquelas linhas que ficam ligando os pontos pra fazer as curvas a partir do algoritmo de DeCasteljau
	curvaControle.poligonais = [];
	curvaControle.poligonais_bezier = [];
	curvaControle.pontos_bezier = [];
	curvaControle.interacoes = 100;
	curvaControle.desenharPontos = true;
	curvaControle.desenharPoligonais = true;
  curvaControle.desenharCurva = true;
  //por fim retorna a curva já com os atributos definidos
	return curvaControle;
}


function criarPCntr(mouseX, mouseY){
	curvasControle[curvaSelecionada].pontos.push([mouseX,mouseY]);
  size = curvasControle[curvaSelecionada].pontos.length
	if(size>1){
    mX = curvasControle[curvaSelecionada].pontos[curvasControle[curvaSelecionada].pontos.length-2];
    mY = curvasControle[curvaSelecionada].pontos[curvasControle[curvaSelecionada].pontos.length-1]
		curvasControle[curvaSelecionada].poligonais.push([mX, mY]);
	}
	
}
//Quando for excluir o ponto de controle vai excluir a linha de controle tambem
function apagarLinhaControle(pX,pY){
  let i;
  size = curvasControle[curvaSelecionada].poligonais.length
	for(i=size-1; i>=0;i--){
		if(i==size-1 && (pX == curvasControle[curvaSelecionada].poligonais[i][1][0] && pY == curvasControle[curvaSelecionada].poligonais[i][1][1])){
			curvasControle[curvaSelecionada].poligonais.splice(i,1);
		}else if(pX == curvasControle[curvaSelecionada].poligonais[i][0][0] && pY == curvasControle[curvaSelecionada].poligonais[i][0][1]){
			if(i>0){
				curvasControle[curvaSelecionada].poligonais[i-1][1]=curvasControle[curvaSelecionada].poligonais[i][1];
			}
			curvasControle[curvaSelecionada].poligonais.splice(i,1);
		}
	}
}


function apagarPontoControle(mouseX, mouseY){
  
  crvSelecionada = curvasControle[curvaSelecionada]
  
  let i;
	for(i=curvasControle[curvaSelecionada].pontos.length-1; i>=0; i--){
		if(mouseX<(crvSelecionada.pontos[i][0]+5) && mouseX>(crvSelecionada.pontos[i][0]-5)){
			if(mouseY<(crvSelecionada.pontos[i][1]+5) && mouseY>(crvSelecionada.pontos[i][1]-5)){
				apagarLinhaControle(crvSelecionada.pontos[i][0],crvSelecionada.pontos[i][1]);
				crvSelecionada.pontos.splice(i,1);
			}
		}
	}
}

function PontoAtual(mouseX, mouseY){
  size = curvasControle[curvaSelecionada].pontos.length
  crvSelecionada = curvasControle[curvaSelecionada]
	let i;
	for(i=size-1; i>=0; i--){
		if(mouseX<(crvSelecionada.pontos[i][0]+5) && mouseX>(crvSelecionada.pontos[i][0]-5)){
			if(mouseY<(crvSelecionada.pontos[i][1]+5) && mouseY>(crvSelecionada.pontos[i][1]-5)){
				indiceClick = i;
				return true;
			}
		}
	}
	return false;
}

function moverPnt(mouseX, mouseY){	

	curvasControle[curvaSelecionada].pontos[indiceClick][0] = mouseX;
	curvasControle[curvaSelecionada].pontos[indiceClick][1] = mouseY;

	if(indiceClick == curvasControle[curvaSelecionada].pontos.length-1){
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][1] = mouseY;
	}else if(indiceClick == 0){
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][1] = mouseY;
	}else{
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick-1][1][1] = mouseY;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][0] = mouseX;
		curvasControle[curvaSelecionada].poligonais[indiceClick][0][1] = mouseY;
	}
	
}

function linhaCurvaBezier(start,end){
	curvasControle[curvaSelecionada].poligonais_bezier.push([[start[0],start[1]],[end[0],end[1]]]);
}

function pontoCurvaBezier(x,y){
  curvasControle[curvaSelecionada].pontos_bezier.push([x, y]);
  cvSel = curvasControle[curvaSelecionada]
  
	if(curvasControle[curvaSelecionada].pontos_bezier.length>1){
    tamX = cvSel.pontos_bezier[curvasControle[curvaSelecionada].pontos_bezier.length-2][0];
    tamY = cvSel.pontos_bezier[curvasControle[curvaSelecionada].pontos_bezier.length-2][1]
    arrXY = [x,y]
		linhaCurvaBezier([tamX,tamY],arrXY);
	}
}

function criarCurvaBezier(n){
	curvasControle[curvaSelecionada].poligonais_bezier.length = 0;
  curvasControle[curvaSelecionada].pontos_bezier.length = 0;
  tam = curvasControle[curvaSelecionada].pontos.length
  pnt = curvasControle[curvaSelecionada].pontos
	if(tam>1){
		let t;
		for(t=0; t<=n;t++){
			
			var coordenadas = pontoCurva(pnt,t/n);
			pontoCurvaBezier(coordenadas[0],coordenadas[1]);
			coordenadas.length=0;
			
		}
	}
}