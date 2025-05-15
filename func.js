function wander(id){
    if(grupo[id].wandering == 1)
    {
        if (grupo[id].direc == 1){
            grupo[id].vx += 0.1
        }
        if (grupo[id].direc == 2){
            grupo[id].vx -= 0.1
        }
        if (grupo[id].direc2 == 1){
            grupo[id].vy += 0.1
        }    
        if (grupo[id].direc2 == 2){
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
    grupo[id].energia--
    grupo[id].x += grupo[id].vx
        grupo[id].y += grupo[id].vy
    
    
}

function direc(id){
    grupo[id].direccool +=1
    if(grupo[id].direccool > 50){
        grupo[id].direc = Math.ceil(Math.random()*2)
        grupo[id].direc2 = Math.ceil(Math.random()*2)
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
    
    if( grupo[id].x > 1170){
        grupo[id].vx = 2
        
    }
    if( grupo[id].x < 50){
        grupo[id].vx = 2
        grupo[id].x = 100

        
    }
    if( grupo[id].y > 780){
        grupo[id].vy = -2

    }
    if( grupo[id].y < 50){
        grupo[id].vy = 2
        grupo[id].y = 100
    
    }
}
function direcao(id){
    if(grupo[id].direcao == 1){
        if(!(grupo[id].x > water[0] && grupo[id].x < water[2] && grupo[id].y > water[1] && grupo[id].x < water[4])){
            if(grupo[id].x > water[0] ){
                grupo[id].vx += 0.1
            }
            if(grupo[id].y > water[1] ){
                grupo[id].vy += 0.1
            }
            if(grupo[id].x < water[0] ){
                grupo[id].vx -= 0.1
            }
            if(grupo[id].y < water[1] ){
                grupo[id].vy -= 0.1
            }
        }
        
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