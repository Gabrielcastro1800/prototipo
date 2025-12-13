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
    while(au < grupo.length){

        cormedia = cormedia+grupo[au].cor
        au+=1

    }
    cormedia = cormedia/grupo.length
    cormedia = Math.ceil(cormedia)
     au = 0
    while(au < grupo.length){

        tamamedio = tamamedio+grupo[au].tamanho
        au+=1

    }
    tamamedio = tamamedio/grupo.length
    tamamedio = Math.ceil(tamamedio)

}
function test(){
    media()
    tela = 3
}


function objetivo(id){

    grupo[id].objetivox = Math.floor(Math.random() * 900)
    grupo[id].objetivoy = Math.floor(Math.random() * 500)



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
