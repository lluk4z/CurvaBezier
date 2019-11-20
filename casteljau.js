function pontoCurva(pNivel, u){
  var tamanho = pNivel.length;
  if(tamanho==0){
    return [];
  } else if (tamanho==1){
    return pNivel[0];
  }else{
    var NivelSuperior = [];

    let i

    for(i=0; i<tamanho-1; i++){
      let Xsuperior = pNivel[i][0]+(u*(pNivel[i+1][0]-pNivel[i][0]));
      let Ysuperior = pNivel[i][1]+(u*(pNivel[i+1][1]-pNivel[i][1]));

      NivelSuperior.push([Xsuperior, Ysuperior]);
    }
    return pontoCurva(NivelSuperior, u);
  }
}