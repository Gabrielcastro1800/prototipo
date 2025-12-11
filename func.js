function wander(id){
    if(grupo[id].wandering == 1)
    {
        if (grupo[id].direc == 1){
            grupo[id].vx = grupo[id].vx+0.1
        }
        if (grupo[id].direc == -1){
            grupo[id].vx = grupo[id].vx-0.1
        }
        if (grupo[id].direc2 == 1){
            grupo[id].vy = grupo[id].vy+0.1
        }    
        if (grupo[id].direc2 == -1){
            grupo[id].vy = grupo[id].vy-0.1
        }

    
       
        
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

function direc(id){
    grupo[id].direccool +=1
    if(grupo[id].direccool > 30+grupo[id].velocidade*15){
        grupo[id].direc = Math.random() < 0.5 ? -1 : 1
        grupo[id].direc2 = Math.random() < 0.5 ? -1 : 1
        grupo[id].direccool = 0
    }
    
    
}



function coli(id){
    
    if( grupo[id].x >= 800 || grupo[id].x <= 100 ){
        grupo[id].vx = grupo[id].vx*-1
        grupo[id].direc = grupo[id].direc*-1
       

        
    }
    if( grupo[id].y >= 750 || grupo[id].y <= 100 ){
        grupo[id].vy = grupo[id].vy*-1
        grupo[id].direc2 = grupo[id].direc2*-1
     
        
    }
  
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
  


