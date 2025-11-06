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
    velocidade:1, // velodidade de movimento do animal ***
    tamanho: 1
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
let sele = new Image
sele.src = "sele.png"
let tela = 1
let select = 1
let pos = false



function main(){ // funcao principal do jogo
    ids = grupo.length
    c.clearRect(0,0,1200,1200) // limpa a tela do jogo a cada frame
     if(tela == 1){

    c.fillStyle = "rgb(93, 212, 38)"
    c.fillRect(0,0,2000,2000)
    c.drawImage(testsprite,480,100,128,128)
    c.drawImage(testtree,560,100,128,128)
    c.drawImage(testtree,380,100,128,128)
     c.fillStyle = "rgba(17, 122, 161, 1)"
     c.font = "50px Asimovian"
     c.fillText("Começar nova",400,400)
     c.fillText("Graficos",400,480)
     if(select == 1){
        c.drawImage(sele,330,350,64,64)
     }
     if(select == 2){
        c.drawImage(sele,330,430,64,64)
     }
     c.fillStyle = "rgba(9, 9, 9, 1)"
     c.font = "25px Asimovian"
     c.fillText("Feito por Leonardo, Gabriel e Cristina",200,700)
     }



    if(tela == 2){
    c.fillStyle = "green"
    c.fillRect(0,0,2000,2000)
    for(c1=0;c1 < grupo.length ;c1++){ // chama as funcoes para cada animal
        visao(c1)
        wander(c1)
        wandering(c1)
        direc(c1)
        coli(c1)
        grupo[c1].energia -=1 
        c.drawImage(testsprite,grupo[c1].x*zoom,grupo[c1].y*zoom,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
        if(pos == true){
            c.fillStyle = "Black"
            c.fillText(grupo[c1].direc+"|"+grupo[c1].direc2,grupo[c1].x*zoom,grupo[c1].y*zoom)
        }
        
    }
    c.fillStyle = "red"
    c.fillRect(10,10,70,40)
    c.fillRect(10,60,100,30)
    c.fillRect(10,100,120,30)
    c.fillStyle = "Black"
    
    c.font = "10px Arial"
    c.fillText("adicionar teste",10,35)
    c.font = "20px Arial"
    c.fillText("População teste x"+(grupo.length),90,35)
    c.fillText("velocidade",10,80)
    c.fillText(velocidadeswitch+"x",120,80)
    c.fillText("posição teste",10,120)

    c.drawImage(testtree,water[0]*zoom,water[1]*zoom,water[2]*zoom,water[3]*zoom)
     c.drawImage(testtree,580,100,64,64)
          c.drawImage(testtree,320,150,64,64)

               c.drawImage(testtree,680,220,64,64)

}
    setTimeout(main,velocidade)// chama e repete a função do main() "principal" basicamente o fps do jogo/simulação

}

canvas.addEventListener("click",function(){
    if( event.offsetX > 10 && event.offsetX < 10+70 && event.offsetY > 10 && event.offsetY < 10+40 ){
        grupo[grupo.length] = Object.create(animal)
        grupo[grupo.length-1].tamanho += (Math.ceil(Math.random()*14))/10 
    }
    if( event.offsetX > 10 && event.offsetX < 10+120 && event.offsetY > 100 && event.offsetY < 100+30 ){
        pos = !pos
        //c.fillRect(10,100,120,30)
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
if(event.keyCode === 40){
select +=1
if(select > 2){
    select = 1
}
}
if(event.keyCode === 38){
select -=1
if(select < 1){
    select = 2
}
}
if(event.keyCode === 13 && select == 1){
    tela = 2
}
}
);
main()
