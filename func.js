function wander(id){
    if(grupo[id].wandering == 1)
    {
        if (grupo[id].direc == 1){
            grupo[id].vx += 0.1
        }
        if (grupo[id].direc == -1){
            grupo[id].vx -= 0.1
        }
        if (grupo[id].direc2 == 1){
            grupo[id].vy += 0.1
        }    
        if (grupo[id].direc2 == -1){
            grupo[id].vy -= 0.1
        }

    
       
        
    }
    if(grupo[id].vx > 1 ){
        grupo[id].vx = 1
    }
    if(grupo[id].vy > 1 ){
        grupo[id].vy = 1
    }
    if(grupo[id].vx < -1 ){
        grupo[id].vx = -1
    }
    if(grupo[id].vy < -1 ){
        grupo[id].vy = -1
    }
    grupo[id].x += grupo[id].vx
        grupo[id].y += grupo[id].vy
    
    
}

function direc(id){
    grupo[id].direccool +=1
    if(grupo[id].direccool > 50){
        grupo[id].direc = Math.random() < 0.5 ? -1 : 1
        grupo[id].direc2 = Math.random() < 0.5 ? -1 : 1
        grupo[id].direccool = 0
    }
    
    
}
function wandering(id){
    grupo[id].wanderingcool += 1
    if(grupo[id].wanderingcool > 60){

    au = Math.ceil(Math.random()*2)
    if(au == 1){
        if(grupo[id].wandering == 0 && grupo[id].direcao == 0){
            grupo[id].wandering = 1
        }
        else{
            grupo[id].wandering = 0
        }
        
    }
   
    grupo[id].wanderingcool = 0
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

function visao(id){
    if(water[0] > grupo[id].x && water[0] < grupo[id].x+grupo[id].visao && water[1] > grupo[id].y && water[1] > grupo[id].y+grupo[id].visao){
        if(grupo[id].energia < 500){
            grupo[id].direcao = 1
            grupo[id].wandering = 0
        }
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

