const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

const animal = {
    x:0,
    y:0,
    vx:0,
    vy:0,
    direc:0,
    wandering:true
};
let grupo = []
grupo[0] = Object.create(animal)
setInterval(main,500)


function main(){
    c.clearRect(0,0,800,800)
    wander(0)
    c.fillRect(grupo[0].x,grupo[0].y,40,40)
}
function wander(id){
    grupo[id].x += grupo[id].vx
    grupo[id].y += grupo[id].vy

    if (grupo[id].direc == 0){
        grupo[id].vx += 2
    }
    if(grupo[id].vx > 0){
        grupo[id].vx -= 1 
    }
    
}
