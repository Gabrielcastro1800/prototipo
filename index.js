const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

const animal = {
    x:100,
    y:100,
    vx:0,
    vy:0,
    direc:0,
    wandering:true
};
let grupo = []
grupo[0] = Object.create(animal)
setInterval(main,200)

setInterval(direc,4500)

function main(){
    c.clearRect(0,0,800,800)
    wander(0)
    c.fillRect(grupo[0].x,grupo[0].y,40,40)
   
        if(grupo[0].x > 750){
            grupo[0].x = 710
            grupo[0].direc = 1
        }
        if(grupo[0].x < 50){
            grupo[0].x = 70
            grupo[0].direc = 0
        }
        if(grupo[0].y > 750){
            grupo[0].y = 710
            grupo[0].direc = 3
        }
        if(grupo[0].y < 50){
            grupo[0].y = 70
            grupo[0].direc = 2
        }
    
    console.log("X "+grupo[0].x+" Y "+grupo[0].y)
}
function wander(id){
    
    if (grupo[id].direc == 0){
        grupo[id].vx += 0.3
    }
    if (grupo[id].direc == 1){
        grupo[id].vx -= 0.3
    }
    if (grupo[id].direc == 2){
        grupo[id].vy += 0.3
    }    
    if (grupo[id].direc == 3){
        grupo[id].vy -= 0.3
    }
    grupo[id].x += grupo[id].vx
    grupo[id].y += grupo[id].vy

    if(grupo[id].vx > 0){
        grupo[id].vx -= 0.15 
    }
    if(grupo[id].yx < 0){
        grupo[id].yx -= 0.15 
    }
    
}
function direc(){
    console.log("direct")
    grupo[0].direc = Math.ceil(Math.random()*3)
}
