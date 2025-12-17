function wander(id){

        
    if(grupo[id].x < grupo[id].objetivox){
        grupo[id].vx+=0.1
    }
    if(grupo[id].x > grupo[id].objetivox){
        grupo[id].vx-=0.1
    }
    if(grupo[id].y < grupo[id].objetivoy){
        grupo[id].vy+=0.1
    }
    if(grupo[id].y > grupo[id].objetivoy){
        grupo[id].vy-=0.1
    }






    
    if(grupo[id].vx > grupo[id].velocidade ){
        grupo[id].vx = grupo[id].velocidade
    }
    if(grupo[id].vy > grupo[id].velocidade ){
        grupo[id].vy = grupo[id].velocidade
    }
    if(grupo[id].vx < grupo[id].velocidade*-1 ){
        grupo[id].vx = grupo[id].velocidade*-1
    }
    if(grupo[id].vy < grupo[id].velocidade*-1 ){
        grupo[id].vy = grupo[id].velocidade*-1
    }
    grupo[id].x += grupo[id].vx
    grupo[id].y += grupo[id].vy
    
    
}






function media(){
     au = 0
     au2 = 0
    while(au < grupo.length){

        if(grupo[au].morto == false){
             cormedia = cormedia+grupo[au].cor
             au2 +=1
        }
       
        au+=1
    }
    cormedia = cormedia/au2
    cormedia = Math.ceil(cormedia)
     au = 0
     au2 = 0
    while(au < grupo.length){

        

        if(grupo[au].morto == false){
             cormedia = cormedia+grupo[au].cor
             au2 +=1
        }
         au+=1

    }
    tamamedio = tamamedio/au2
    tamamedio = Math.ceil(tamamedio)

}
function test(){
    media()
    tela = 3
}


function objetivo(id){

    grupo[id].objetivox = Math.floor(Math.random() * 800)+150
    grupo[id].objetivoy = Math.floor(Math.random() * 500)+150



    grupo[id].objetivocool = 50
}
function objetivocomida(id){
    arvcomcomida = []
    au = [Infinity,Infinity]
    au2 = 0
    au3 = []
    if(arv.length > 0){
         for(c6=0;c6 < arv.length;c6++){
        if(arv[c6].comida == 1000){
             arvcomcomida[(arvcomcomida.length)] = [arv[c6].x,arv[c6].y]
             au3[au3.length] = c6
        }
    }
     for(c6=0;c6 < arvcomcomida.length;c6++){
  
        if((arvcomcomida[c6][0]**2 + arvcomcomida[c6][1]**2) < (au[0]**2+au[1]**2)){
            au = [arvcomcomida[c6][0], arvcomcomida[c6][1]]
            au2 = c6        
        }
        
     }
     if(arvcomcomida.length > 0){
        grupo[id].objetivox = au[0]
        grupo[id].objetivoy = au[1]

        if(grupo[id].x >= arvcomcomida[au2][0] && grupo[id].x <= arvcomcomida[au2][0]+64 && grupo[id].y >= arvcomcomida[au2][1] &&  grupo[id].y <= arvcomcomida[au2][1]+64){
            arv[au3[au2]].comida = 0
            grupo[id].energia += 2000

        }
     }
    }
    if(arvcomcomida.length == 0){
        objetivo(id)
    }
}

function repro(id){
    let pontos = 0
    let chance = Math.random()
    for(c9=1;c9 <= grupo.length;c9++){
         c10 = c9-1
        if(grupo[id].x > grupo[c10].x && grupo[id].x < grupo[c10].x+(64) && grupo[id].y > grupo[c10].y && grupo[id].y < grupo[c10].y+((64) && grupo[c10].morto == false && !(id == c10))){
            if(grupo[id].reproducool > grupo[id].reproducoolmax) {
                pontos+=(1000/grupo[id].cor) + 1
                pontos+=grupo[id].bonito
                pontos+= 1000/(grupo[id].falante/100) + 1
                pontos = pontos-400
                pontos = pontos/3000

                if(chance <= pontos) {
                    gerabebe(id,c10)
                    grupo[id].reproducool = 0
                }
            }
        }
    }

}

function gerabebe(id,id2){

     grupo[grupo.length] = Object.create(animal)

        if(grupo[id].tamanho >= grupo[id2].tamanho){
            grupo[grupo.length-1].tamanho = random((grupo[id2].tamanho),(grupo[id].tamanho))
 
        } else {
            grupo[grupo.length-1].tamanho = random((grupo[id].tamanho),(grupo[id2].tamanho))
        }
         if(grupo[id].cor >= grupo[id2].cor){
             grupo[grupo.length-1].cor = random((grupo[id2].cor),(grupo[id].cor))
        }else{
            grupo[grupo.length-1].cor = random((grupo[id].cor),(grupo[id2].cor))
        }
        if(grupo[id].falante >= grupo[id2].falante){
           grupo[grupo.length-1].falante = random((grupo[id2].falante),(grupo[id].falante))
        }
        else{
            grupo[grupo.length-1].falante = random((grupo[id].falante),(grupo[id2].falante))
        }
        if(grupo[id].velocidade >= grupo[id2].velocidade){
           grupo[grupo.length-1].velocidade = random((grupo[id2].velocidade),(grupo[id].velocidade))
        }else{
             grupo[grupo.length-1].velocidade = random((grupo[id].velocidade),(grupo[id2].velocidade))

        }
        if(grupo[id].maxenergiaenergia >= grupo[id2].maxenergiaenergia){
            grupo[grupo.length-1].maxenergiaenergia = random((grupo[id2].maxenergiaenergia),(grupo[id].maxenergiaenergia))
        }
        else{
            grupo[grupo.length-1].maxenergiaenergia = random((grupo[id].maxenergiaenergia),(grupo[id2].maxenergiaenergia))
        }
        grupo[grupo.length-1].energia = grupo[grupo.length-1].maxenergiaenergia
        grupo[grupo.length-1].nome = nomes[ Math.floor(Math.random() * nomes.length)]
        if(grupo[id].bonito >= grupo[id2].bonito){
             grupo[grupo.length-1].bonito = random((grupo[id2].bonito),(grupo[id].bonito))
        }
        else{
             grupo[grupo.length-1].bonito = random((grupo[id].bonito),(grupo[id2].bonito))
        }
        if(grupo[id].reproducoolmax >= grupo[id2].reproducoolmax){
              grupo[grupo.length-1].reproducoolmax = random((grupo[id2].reproducoolmax),(grupo[id].reproducoolmax))
        }
        else{
            grupo[grupo.length-1].reproducoolmax = random((grupo[id].reproducoolmax),(grupo[id2].reproducoolmax))
        }
        if(grupo[id].idademax >= grupo[id2].idademax){
           grupo[grupo.length-1].idademax = random((grupo[id].idademax),(grupo[id2].idademax))
        }
        else{
            grupo[grupo.length-1].idademax = random((grupo[id2].idademax),(grupo[id].idademax))

        }

        grupo[grupo.length-1].x = grupo[id].x
        grupo[grupo.length-1].y = grupo[id].y
        


}

function random(min, max) {
    au = Math.random() * (max - min) + min
    au.toFixed(2)
    return au;
}

function pontoColidecomCirculo(px, py, cx, cy, raio) {
  const dx = px - cx
  const dy = py - cy
  return (dx * dx + dy * dy) <= raio * raio
}