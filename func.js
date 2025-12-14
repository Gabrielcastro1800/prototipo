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



    grupo[id].objetivocool = 600
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
    
    for(c9=1;c9 <= grupo.length;c9++){
         c10 = c9-1
        if(grupo[id].x > grupo[c10].x && grupo[id].x < grupo[c10].x+((32)*grupo[c10].tamanho) && grupo[id].y > grupo[c10].y && grupo[id].y < grupo[c10].y+((32)*grupo[c10].tamanho && grupo[c10].morto == false)){
            if(grupo[id].reproducool > grupo[id].reproducoolmax){
                grupo[grupo.length] = Object.create(animal)

                grupo[grupo.length-1].tamanho = ((grupo[id].tamanho+grupo[c10].tamanho)/2)
            grupo[grupo.length-1].cor = ((grupo[id].cor+grupo[c10].cor)/2)+(Math.floor(Math.random() * 50)-25)          
            grupo[grupo.length-1].falante = (grupo[id].falante+grupo[c10].falante)+Math.floor(Math.random() * 3000)            
            grupo[grupo.length-1].velocidade = ((grupo[id].velocidade+grupo[c10].velocidade)/2)
             grupo[grupo.length-1].maxenergiaenergia = ((grupo[id].maxenergiaenergia+grupo[c10].maxenergiaenergia)/2)+Math.floor(Math.random() * 1200);
             grupo[grupo.length-1].energia = (grupo[grupo.length-1].maxenergiaenergia)/2;
            grupo[grupo.length-1].nome = nomes[ Math.floor(Math.random() * nomes.length)]
            grupo[grupo.length-1].bonito = ((grupo[id].bonito+grupo[c10].bonito)/2)+(Math.floor(Math.random() * 10)-10)
            grupo[grupo.length-1].reproducoolmax = ((grupo[id].reproducoolmax+grupo[c10].reproducoolmax)/2)
              grupo[grupo.length-1].idademax = ((grupo[id].idademax+grupo[c10].idademax)/2)

            grupo[grupo.length-1].x = grupo[id].x
            grupo[grupo.length-1].y = grupo[id].y
                grupo[id].reproducool=0
            }
        }
    }

}