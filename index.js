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
    falando:0,
    pensando:"",
    falante:100,
    f:false,
    frame:1,
    frameau:0
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


let drawarvore = false

for(c2=0;c2 < 15 ;c2++){ // temporario! enche um vetor com copias do obj animal 
    grupo[c2] = Object.create(animal)
    grupo[c2].tamanho += (Math.ceil(Math.random()*14))/10
    grupo[c2].cor += Math.floor(Math.random() * 511) - 255;
    grupo[c2].falante += Math.floor(Math.random() * 10000) ;
}
let ids = 0 // ids quantidade de objs no vetor grupo[]
let water = [400,300,50,50] // temporario relacionado a localização da comida ou agua


let objetos = []






let velocidade = 30 
let velocidadeswitch = 1 // relacionado ao botão de troca de velecidade  

let testtree = new Image
testtree.src = "sprites/natural/arv.png"
let falaimg = new Image
falaimg.src = "sprites/efeitos/talk.png"
let fala2img = new Image
fala2img.src = "sprites/efeitos/talk2.png"
let sele = new Image
sele.src = "sprites/bota/sele.png"


let sprite1 = new Image // carregando a imagem do animal
sprite1.src = "sprites/animal/1.png"
let sprite2 = new Image
sprite2.src = "sprites/animal/2.png"
let sprite3 = new Image
sprite3.src = "sprites/animal/3.png"


let sprite4 = new Image
sprite4.src = "sprites/animal/4.png"
let sprite5 = new Image
sprite5.src = "sprites/animal/5.png"
let sprite6 = new Image
sprite6.src = "sprites/animal/6.png"





let grass = new Image();
grass.src = "sprites/natural/grass.png"

let titulo = new Image();
titulo.src = "sprites/efeitos/titulo.png"


const arvore = {
    x:0,
    y:0,
    srite:testtree
}

let falas = ["Vai corinthians!","é o que sobra?","Nem fudendo","alfa aqui tá?","beta!","jonas mo gay","ala teu pai",
    "O que preferes?","mano tipo","Tipo bixo mesmo","oq tu acha?","antes de ir comer","Tranquilo","mo pas","n word","twiteiro medio","...",
    "LADRÂO!","Ai, que delicia","Tu que é","tu que deixa","comeu miojo?","passa pano!","Odeio os verdes","Odeio os roxos",
    "odeio os rosa","odeio os laranja","Seu bobão molhado",
  "Seu banana gigante",
  "Tolo sem noção",
  "Cabeça de vento",
  "Paspalho de marca",
  "Bobalhão sem rumo",
  "Zé ruela cansado",
  "Palhaço de aluguel",
  "Banana ambulante",
  "Troço sem graça",
  "Mala sem alça",
  "Panaca de plantão",
  "Chato pra caramba",
  "Nó cego chato",
  "Besta quadrada",
  "Tranqueira sem futuro",
  "Orelhudo de festa",
  "Zé ninguém molhado",
  "Cabeça de bagre",
  "Mané de novela",
  "Baranga de luxo",
  "Lesado de carteirinha",
  "Desenxabido sem classe",
  "Pateta de esquina",
  "Trombadinha de espuma",
  "Bobalhão de sempre",
  "Fiasco ambulante",
  "Nababão sem limites",
  "Aberração de bolso",
  "Enjoado de fábrica",
   "Gênio das galáxias",
  "Lenda do caos",
  "Brabo sem limites",
  "Mito dos cafés",
  "Fera dos cliques",
  "Astro das tretas",
  "Craque do improviso",
  "Prodígio das piadas",
  "Monstro do código",
  "Sábio das ruas",
  "Rei das gambis",
  "Lord dos memes",
  "Patrão da zoeira",
  "Chefe das lendas",
  "Majestade dos bugs",
   "Titã das galáxias",
  "Deus das planilhas",
  "Messias dos memes",
  "Imperador do caos",
  "Dragão do carisma",
  "Sabidão supremo intergaláctico",
  "Monarca das tretas",
  "Oráculo das piadas",
  "Faraó do estilo",
  "Colosso do talento",
  "Demônio do charme",
  "Gigante da sabedoria",
  "Divindade do hype",
  "Apocalipse do swag",
  "Rei do impossível",
    "Oi, bonitinho",
  "E aí, encanto",
  "Você brilha",
  "Oi, charme",
  "Fala, estrela",
  "Oi, lindinha",
  "Cheguei, sumido",
  "Você encanta",
  "Oi, beleza",
  "Sua presença ilumina",
  "Hey, fofura",
  "Você é charme",
  "Oi, crush",
  "Me notou?",
  "Gosto de você",
   "E aí, charme",
  "Oi, doce",
  "Você fascina",
  "Olá, sorriso",
  "E aí, paixão",
  "Oi, irresistível",
  "Você hipnotiza",
  "Olá, fofinho",
  "Hey, gracinha",
  "Que saudade",
  "Você encanta mesmo",
  "Oi, perfeição",
  "Chega mais",
  "Oi, preciosidade",
  "Tudo bem, lindo?",
  "jesus",
  "grosso",
  "feito",
  "bao?",
  "goku > ronaldo"
]




let tela = 1
let select = 1
let pos = false




function main(){ // funcao principal do jogo

    





    ids = grupo.length
    
     if(tela == 1){
        
     c.drawImage(bgCanvas, 0, 0,canvas.width*zoom,canvas.height*zoom);

     c.drawImage(titulo,200,0,800,400)
  
     c.fillStyle = "rgba(17, 122, 161, 1)"
     c.font = "50px Asimovian"
     c.fillText("Começar nova",400,480)
     c.fillText("Graficos",400,560)
     if(select == 1){
        c.drawImage(sele,330,430,64,64)
     }
     if(select == 2){
        c.drawImage(sele,330,510,64,64)
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

            switch(grupo[c1].frame){

                case 1:
                 c.drawImage(sprite1,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                    break;
                 case 2:
                 c.drawImage(sprite2,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                    break;

                case 3:
                 c.drawImage(sprite3,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                    break;
            }
           

        }
        if(grupo[c1].vx > 0){

             switch(grupo[c1].frame){
                    
                case 1:
                c.drawImage(sprite4,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                break;

                case 2:
                c.drawImage(sprite5,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                break;
                case 3:
                c.drawImage(sprite6,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                break;
             }

          
        }
        if(grupo[c1].vx == 0){
            c.drawImage(sprite4,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
        }
        c.filter = "none";
        if(grupo[c1].f == true){
    
            c.drawImage(falaimg,(grupo[c1].x*zoom)+60,((grupo[c1].y*zoom)+movezoomy)-50,128,64)
            c.fillStyle = "rgba(9, 9, 9, 1)"
            c.font = "14px Asimovian"
            c.fillText(grupo[c1].pensando,(grupo[c1].x*zoom)+71,((grupo[c1].y*zoom)+movezoomy-15))


            
        }
        grupo[c1].falando+=1
        grupo[c1].frameau+=1
        if(grupo[c1].frameau > 4){grupo[c1].frame+=1; grupo[c1].frameau = 0 }
        if(grupo[c1].frame > 3){grupo[c1].frame = 1}

        if(grupo[c1].falando > grupo[c1].falante && grupo[c1].f == false){
            grupo[c1].falando = 0
            grupo[c1].f = true
            grupo[c1].pensando = falas[Math.ceil(Math.random()*falas.length-1)]
        }
        if(grupo[c1].falando > grupo[c1].falante && grupo[c1].f == true){
            grupo[c1].falando = 0
            grupo[c1].f = false
        }



    
        

  

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


    for(c1=0;c1 < objetos.length ;c1++){
        
            c.drawImage(testtree,objetos[c1].x*zoom,objetos[c1].y*zoom,64,64)
    }


    if(drawarvore == false){
            c.fillStyle = "red"
            c.fillRect(10,160,80,80)
    }
    if(drawarvore == true){
            c.fillStyle = "gray"
            c.fillRect(10,160,80,80)
    }


    c.drawImage(testtree,10,160,64,64)



  

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
         grupo[grupo.length-1].falante += Math.floor(Math.random() * 10000) ;

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

    if( event.offsetX > 10 && event.offsetX < 10+80 && event.offsetY > 160 && event.offsetY < 160+80 && tela == 2 ){
        drawarvore = !drawarvore
    }

    if( !(event.offsetX > 10 && event.offsetX < 10+80 && event.offsetY > 160 && event.offsetY < 160+80) && tela == 2 && drawarvore == true){
        objetos[objetos.length] = Object.create(arvore)
         objetos[objetos.length-1].x = event.offsetX-32
         console.log(objetos[0].x)
         objetos[objetos.length-1].y = event.offsetY-32
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


