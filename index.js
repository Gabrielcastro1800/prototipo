const canvas = document.getElementById("canvas");
let c = canvas.getContext("2d"); //<--bagulhos do canvas


const bgCanvas = document.createElement('canvas');
const bgCtx = bgCanvas.getContext('2d');

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
    tamanho: 1,
    cor: 0,
};      
    //probriendades marcadas com *** são genes ou status que provavelmente serão auterados
    // de pai pra filhos
let grupo = []
let zoom = 1
let cormedia = 0
let tamamedio = 0
let au =0
let movezoomx = 0
let movezoomy = 0

for(c2=0;c2 < 15 ;c2++){ // temporario! enche um vetor com copias do obj animal 
    grupo[c2] = Object.create(animal)
    grupo[c2].tamanho += (Math.ceil(Math.random()*14))/10
    grupo[c2].cor += Math.floor(Math.random() * 511) - 255;
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
let sprite2 = new Image
sprite2.src = "2.png"
let grass = new Image();
grass.src = "grass.png"




let tela = 1
let select = 1
let pos = false




function main(){ // funcao principal do jogo

    





    ids = grupo.length
    
     if(tela == 1){
  
    c.fillStyle = "green"
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
    c.drawImage(bgCanvas, 0, 0,canvas.width*zoom,canvas.height*zoom);
    for(c1=0;c1 < grupo.length ;c1++){ // chama as funcoes para cada animal
        visao(c1)
        wander(c1)
        wandering(c1)
        direc(c1)
        coli(c1)

        c.filter = "hue-rotate("+grupo[c1].cor+"deg)";
        if(grupo[c1].vx < 0){
            c.drawImage(testsprite,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
        }
        if(grupo[c1].vx > 0){
            c.drawImage(sprite2,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
        }
        if(grupo[c1].vx == 0){
            c.drawImage(sprite2,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
        }
    
        c.filter = "none";

  

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
     c.drawImage(testtree,580*zoom,100*zoom,64*zoom,64*zoom)
          c.drawImage(testtree,320*zoom,150*zoom,64*zoom,64*zoom)

               c.drawImage(testtree,680*zoom,220*zoom,64*zoom,64*zoom)

}
        if(tela == 3){
            c.fillStyle = "black"
            c.font = "30px Arial"
            c.fillText("Media de cor "+cormedia,30,30)
            c.fillText("Media de tamanho "+tamamedio,30,60)

            c.filter = "hue-rotate("+cormedia+"deg)";
            c.drawImage(testsprite,100,100,150,150)
            c.filter = "none";

        }
    setTimeout(main,velocidade)// chama e repete a função do main() "principal" basicamente o fps do jogo/simulação

}

canvas.addEventListener("click",function(){
    if( event.offsetX > 10 && event.offsetX < 10+70 && event.offsetY > 10 && event.offsetY < 10+40 ){
        grupo[grupo.length] = Object.create(animal)
        grupo[grupo.length-1].tamanho += (Math.ceil(Math.random()*14))/10
         grupo[grupo.length-1].cor += Math.floor(Math.random() * 511) - 255;

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
                velocidade = 1
                velocidadeswitch = 3
            
                break;
            case 3:
                velocidade = 30
                velocidadeswitch = 1
        

                break
        }
    }

})
document.addEventListener("keyup", function(){
if(event.keyCode === 38 && tela == 2 && !(zoom == 1)){
    movezoomy-=15
    if(movezoomy < -800){
        movezoomy = 0
    }
}
if(event.keyCode === 40 && tela == 2 && !(zoom == 1)){
    movezoomy+=15
     if(movezoomy > 0){
        movezoomy = 0
    }
}



if(event.keyCode === 187  && tela == 2){
    zoom+=1
    if(zoom > 5)
{
    zoom = 5
}
}
if(event.keyCode === 189  && tela == 2){
    zoom-=1
    if(zoom == 0)
{
    zoom = 1
}
    
}


if(event.keyCode === 40 && tela == 1){
select +=1
if(select > 2){
    select = 1
}
}
if(event.keyCode === 38 && tela == 1){
select -=1
if(select < 1){
    select = 2
}
}
if(event.keyCode === 13 && select == 1 && tela == 1){
    tela = 2
}
}
);



grass.onload = () => {
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;

        const pattern = bgCtx.createPattern(grass, "repeat");
        bgCtx.fillStyle = pattern;


        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        main()

}


