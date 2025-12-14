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
    objetivocool: 0,
    energia:8000, // quantidade atual de energia diminui com tempo
    maxenergia:8000, // maximo de energia ***
    visao:100, // alcance da visão do animal ***
    velocidade:1, // velodidade de movimento do animal ***
    tamanho: 1,
    cor: 0,
    falando:0,
    pensando:"",
    falante:100,
    f:false,
    frame:1,
    frameau:0,
    morto:false,
    mortotics:0,
    objetivox:0,
    objetivoy:0,
    violento: 0,
    bonito: 0,
    nome:"",
    idade:0,
    idademax:0,
    reproducoolmax:1000,
    reproducool:0,
    

};      
    //probriendades marcadas com *** são genes ou status que provavelmente serão auterados
    // de pai pra filhos
let grupo = []
let zoom = 1
let cormedia = 0
let tamamedio = 0
let au = 0
let movezoomx = 0
let movezoomy = 0
let dias = 0
let diastic = 0


let drawarvore = false
let Populacao = 0
let causa = ""

for(c2=0;c2 < 15 ;c2++){ 
    grupo[c2] = Object.create(animal)
    grupo[c2].tamanho += (Math.ceil(Math.random()*14))/10
    grupo[c2].cor = Math.floor(Math.random() * 255);
    grupo[c2].falante = Math.floor(Math.random() * 10000);
    grupo[c2].velocidade = (Math.random() * 5)
    grupo[c2].maxenergiaenergia = Math.floor(Math.random() * 12000);
    grupo[c2].energia = grupo[c2].maxenergiaenergia;
    grupo[c2].nome = nomes[ Math.floor(Math.random() * nomes.length)]
    grupo[c2].bonito = Math.floor(Math.random() * 1000)


     grupo[c2].idademax =  Math.floor(Math.random() * 100000)+1000
     grupo[c2].reproducoolmax =  Math.floor(Math.random() * 10000)+1000

     
}
let ids = 0 // ids quantidade de objs no vetor grupo[]
let water = [400,300,50,50] // temporario relacionado a localização da comida ou agua


let arv = []






let velocidade = 30 
let velocidadeswitch = 1 // relacionado ao botão de troca de velecidade  




const arvore = {
    x:0,
    y:0,
    comida:500
}






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
     c.fillText("Nova simulação",400,480)
 
     c.fillStyle = "rgba(9, 9, 9, 1)"
     c.font = "25px Asimovian"
     c.fillText("Feito por Leonardo, Gabriel e Cristina",200,700)
     }



    if(tela == 2){

         diastic++
    
     
     if(diastic > 3000){
        dias+=1
        diastic = 0
     }


    c.drawImage(bgCanvas, 0, 0,canvas.width*zoom,canvas.height*zoom);
    for(c1=0;c1 < grupo.length ;c1++){ // chama as funcoes para cada animal
        if(grupo[c1].energia <= 0){grupo[c1].morto = true; causa = "id:"+c1+" Morreu de fome"}
         if(grupo[c1].idade >= grupo[c1].idademax){grupo[c1].morto = true;causa = "id:"+c1+" Morreu de velhice"}
        Populacao=0
        for(c33=0;c33<grupo.length;c33++){
            if(grupo[c33].morto == false){Populacao+=1}        
        }


        if(grupo[c1].morto == false){
        
        if(grupo[c1].objetivocool < 0 && grupo[c1].energia > grupo[c1].maxenergia/2){objetivo(c1)}
        if(grupo[c1].objetivocool < 0 && grupo[c1].energia < grupo[c1].maxenergia/2){objetivocomida(c1)}
        grupo[c1].objetivocool--

        wander(c1)
        grupo[c1].reproducool+=1
        grupo[c1].idade+=1
        repro(c1)
   

        grupo[c1].energia-=1

           // if(grupo[c1].energia < (grupo[c1].maxenergia/2)){
           //     grupo[c1].wandering = 0
           //     comer(c1)
           // }
        



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
            c.fillText(grupo[c1].energia,grupo[c1].x*zoom,grupo[c1].y*zoom)
        }

        }else{
            if(grupo[c1].mortotics < 80){
                c.drawImage(dead,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
                grupo[c1].mortotics++
            }
            
        }
    
    }



    for(c1=0;c1 < arv.length ;c1++){

            arv[c1].comida+=1
            if(arv[c1].comida > 1000){arv[c1].comida = 1000}


            if(arv[c1].comida < 1000){
                c.drawImage(testtree,arv[c1].x*zoom,arv[c1].y*zoom,64,64)
            }else{
                c.drawImage(testtree2,arv[c1].x*zoom,arv[c1].y*zoom,64,64)
            }
            

    }


    for(c1=0;c1 < grupo.length ;c1++){
         if(grupo[c1].f == true && grupo[c1].morto == false){
    
            c.drawImage(falaimg,(grupo[c1].x*zoom)+60,((grupo[c1].y*zoom)+movezoomy)-50,128,64)
            c.fillStyle = "rgba(9, 9, 9, 1)"
            c.font = "14px Asimovian"
            c.fillText(grupo[c1].pensando,(grupo[c1].x*zoom)+71,((grupo[c1].y*zoom)+movezoomy-15))


            
        }
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


    c.fillStyle = "red"
    c.fillRect(10,10,70,40)
    c.fillRect(10,60,100,30)
    c.fillRect(10,100,120,30)
    c.fillStyle = "Black"
    
    c.font = "10px Arial"
    c.fillText("adicionar teste",10,35)
    c.font = "35px Arial"
    c.fillText("População x"+Populacao,(canvas.width/2)-135,35)
    c.fillText(dias+" Dias",(canvas.width/2)-90,765)
    c.font = "25px Arial"
    c.fillText(causa,(canvas.width/2)-135,85)
     c.font = "20px Arial"
    c.fillText("velocidade",10,80)
    c.fillText(velocidadeswitch+"x",120,80)
    c.fillText("posição teste",10,120)
  

}
        if(tela == 3){
            c.fillStyle = "black"
            c.font = "30px Arial"
            c.fillText("Media de cor "+cormedia,30,30)
            c.fillText("Media de tamanho "+tamamedio,30,60)

        }
    setTimeout(main,velocidade)// chama e repete a função do main() "principal"

}

canvas.addEventListener("click",function(){
    if( event.offsetX > 10 && event.offsetX < 10+70 && event.offsetY > 10 && event.offsetY < 10+40 ){
        grupo[grupo.length] = Object.create(animal)
        grupo[grupo.length-1].tamanho += (Math.ceil(Math.random()*14))/10
         grupo[grupo.length-1].cor = Math.floor(Math.random() * 255);
         grupo[grupo.length-1].falante = Math.floor(Math.random() * 10000) ;
         grupo[grupo.length-1].velocidade = (Math.random() * 5)
         grupo[grupo.length-1].maxenergiaenergia = Math.floor(Math.random() * 12000);
         grupo[grupo.length-1].energia = grupo[grupo.length-1].maxenergiaenergia;
         grupo[grupo.length-1].nome = nomes[ Math.floor(Math.random() * nomes.length)]
         grupo[grupo.length-1].bonito = Math.floor(Math.random() * 1000)
         grupo[grupo.length-1].reproducoolmax =  Math.floor(Math.random() * 10000)+1000
         grupo[grupo.length-1].idademax =  Math.floor(Math.random() * 100000)+1000
         

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
        arv[arv.length] = Object.create(arvore)
         arv[arv.length-1].x = event.offsetX-32
         arv[arv.length-1].y = event.offsetY-32
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


