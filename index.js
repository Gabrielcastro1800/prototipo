const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d"); //<--bagulhos do canvas

c.imageSmoothingEnabled = false // liga ou deslica a suavização das imagens do canvas horrivel para pixelart

const animal = { // objeto do animal base
    x:300,
    y:300,
    vx:0, // velocidade no eixo x
    vy:0, // velocidade no eixo y
    direc:0, // direção do animal 0,1
    direc2:0,
    direccool:0, // cooldown para trocar a sua direção 
    wandering:0, // 1 se o animal esta andando sem rumo,0 se não
    wanderingcool:0,// cooldown para andar ou parar
    direcao:0, // se o animal está indo a algum lugar(exemplo comida)
    energia:1000, // quantidade atual de energia diminui com tempo
    maxenergia:1000, // maximo de energia ***
    agua:1000, // quantidade atual de agua diminui com tempo
    aguamaximo:1000, // maximo de agua ***
    visao:100, // alcance da visão do animal ***
    velocidade:1 // velodidade de movimento do animal *** 
};      
    //probriendades marcadas com *** são genes ou status que provavelmente serão auterados
    // de pai pra filhos
let grupo = []
let zoom = 1

for(c2=0;c2 < 1 ;c2++){ // temporario! enche um vetor com copias do obj animal 
    grupo[c2] = Object.create(animal)
}
let ids = 0 // ids quantidade de objs no vetor grupo[]
let water = [400,300,50,50] // temporario relacionado a localização da comida ou agua
let velocidade = 30 // quantidade de milesegundos do fps não funciona por enquanto 
let velocidadeswitch = 1 // relacionado ao botão de troca de velecidade  
let testsprite = new Image // carregando a imagem do animal
testsprite.src = "1.png"
let testtree = new Image
testtree.src = "treetemp.png"



function main(){ // funcao principal do jogo
    ids = grupo.length
    c.clearRect(0,0,1200,1200) // limpa a tela do jogo a cada frame
    c.fillStyle = "green"
    c.fillRect(0,0,2000,2000)
    for(c1=0;c1 < grupo.length ;c1++){ // chama as funcoes para cada animal
        visao(c1)
        wander(c1)
        wandering(c1)
        direc(c1)
        coli(c1)
        c.drawImage(testsprite,grupo[c1].x*zoom,grupo[c1].y*zoom,32*zoom,32*zoom)
        c.fillText(grupo[c1].direc+"/"+grupo[c1].direc2,grupo[c1].x*zoom,(grupo[c1].y+50)*zoom)
        c.fillText(grupo[c1].x+"/"+grupo[c1].y,grupo[c1].x*zoom,(grupo[c1].y+70)*zoom)
        
    }
    c.fillStyle = "red"
    c.fillRect(10,10,70,40)
    c.fillRect(10,60,100,30)
    c.fillStyle = "Black"
    
    c.font = "10px Arial"
    c.fillText("adicionar teste",10,35)
    c.font = "20px Arial"
    c.fillText("População teste x"+(grupo.length),90,35)
    c.fillText("velocidade",10,80)
    c.fillText(velocidadeswitch+"x",120,80)

    c.drawImage(testtree,water[0]*zoom,water[1]*zoom,water[2]*zoom,water[3]*zoom)
   
    setTimeout(main,velocidade)// chama e repete a função do main() "principal" basicamente o fps do jogo/simulação

}

canvas.addEventListener("click",function(){
    if( event.offsetX > 10 && event.offsetX < 10+70 && event.offsetY > 10 && event.offsetY < 10+40 ){
        grupo[grupo.length] = Object.create(animal)
    }
    if( event.offsetX > 10 && event.offsetX < 10+100 && event.offsetY > 60 && event.offsetY < 60+30 ){
        switch(velocidadeswitch){
            case 1: 
                    velocidade = 10
                    velocidadeswitch = 2
                    
                    break;
            case 2:
                velocidade = 5
                velocidadeswitch = 3
            
                break;
            case 3:
                velocidade = 1
                velocidadeswitch = 4
        

                break
            case 4:
                velocidade = 30
                velocidadeswitch = 1
                

                break;
        }
    }

})
document.addEventListener("keyup", function(){
if(event.keyCode === 187){
    zoom+=2
}
if(event.keyCode === 189){
    zoom-=2
}
if(zoom < 0)
{
    zoom = 1
}
}
);
main()
