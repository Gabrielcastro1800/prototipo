const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
c.imageSmoothingEnabled =false

const animal = {
    x:300,
    y:300,
    vx:0,
    vy:0,
    direc:0,
    direccool:0,
    wandering:0,
    wanderingcool:0,
    energia:1000,
    maxenergia:1000,
    visao:100
};
let grupo = []

for(c2=0;c2 < 15 ;c2++){
    grupo[c2] = Object.create(animal)
}
let ids = 0


setInterval(main,50)
let testsprite = new Image
testsprite.src = "1.png"



function main(){
    ids = grupo.length
    c.clearRect(0,0,1200,1200)
    for(c1=0;c1 < grupo.length ;c1++){
        coli(c1)
        wander(c1)
        wandering(c1)
        direc(c1)
        c.drawImage(testsprite,grupo[c1].x,grupo[c1].y,32,32)
    }
    c.fillStyle = "red"
    c.fillRect(10,10,70,40)
    c.fillStyle = "Black"
    
    c.font = "10px Arial"
    c.fillText("adicionar teste",10,35)
    c.font = "20px Arial"
    c.fillText("População teste x"+(grupo.length),90,35)
   
}
function wander(id){
    if(grupo[id].wandering == 1)
    {
        if (grupo[id].direc == 1){
            grupo[id].vx += 0.1
        }
        if (grupo[id].direc == 2){
            grupo[id].vx -= 0.1
        }
        if (grupo[id].direc == 3){
            grupo[id].vy += 0.1
        }    
        if (grupo[id].direc == 4){
            grupo[id].vy -= 0.1
        }
        grupo[id].x += grupo[id].vx
        grupo[id].y += grupo[id].vy
    
        if(grupo[id].vx > 0){
            grupo[id].vx -= 0.05
        }
        if(grupo[id].vx < 0){
            grupo[id].vx += 0.05
        }
        if(grupo[id].vy > 0){
            grupo[id].vy -= 0.05
        }
        if(grupo[id].vy < 0){
            grupo[id].vy += 0.05 
        }
        
    }
    if(grupo[id].vx > 1){
        grupo[id].vx = 1
    }
    if(grupo[id].vy > 1){
        grupo[id].vy = 1
    }
    if(grupo[id].vx < -1){
        grupo[id].vx = -1
    }
    if(grupo[id].vy < -1){
        grupo[id].vy = -1
    }
    
    
}
function direc(id){
    grupo[id].direccool +=1
    if(grupo[id].direccool > 50){
        grupo[id].direc = Math.ceil(Math.random()*4)
        grupo[id].direccool = 0
    }
    
}
function wandering(id){
    grupo[id].wanderingcool += 1
    if(grupo[id].wanderingcool > 60){

    au = Math.ceil(Math.random()*2)
    if(au == 1){
        if(grupo[id].wandering == 0){
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
    
    if( grupo[id].x > 1200){
        grupo[id].x = 1200
    }
    if( grupo[id].x < 0){
        grupo[id].x = 0
    }
    if( grupo[id].y > 780){
        grupo[id].y = 780
    }
    if( grupo[id].y < 0){
        grupo[id].y = 0
    }
}


canvas.addEventListener("click",function(){
    if( event.offsetX > 10 && event.offsetX < 10+70 && event.offsetY > 10 && event.offsetY < 10+40 ){
        grupo[grupo.length] = Object.create(animal)
    }
})
