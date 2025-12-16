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
let menu = 0

let bioma = 0

let pausa = false

let drawarvore = false
let Populacao = 0
let causa = ""

let quantidadeini = 15
let remov = false


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

       if(pausa == false){
            diastic++
            if(diastic > 3000){
            dias+=1
            diastic = 0
            }
       }  
    
     
     
       Populacao=grupo.length

    c.drawImage(bgCanvas, 0, 0,canvas.width*zoom,canvas.height*zoom);
    for(c1=0;c1 < grupo.length ;c1++){ // chama as funcoes para cada animal
        if(pausa == false){ if(grupo[c1].energia <= 0){grupo[c1].morto = true; causa = "id:"+c1+" Morreu de fome"}
         if(grupo[c1].idade >= grupo[c1].idademax){grupo[c1].morto = true;causa = "id:"+c1+" Morreu de velhice"}}
        
        


        if(grupo[c1].morto == false){
        
       if(pausa == false){ if(grupo[c1].objetivocool < 0 && grupo[c1].energia > grupo[c1].maxenergia/2){objetivo(c1)}
        if(grupo[c1].objetivocool < 0 && grupo[c1].energia < grupo[c1].maxenergia/2){objetivocomida(c1)}
        grupo[c1].objetivocool--

        wander(c1)
        grupo[c1].reproducool+=1
        grupo[c1].idade+=1
        repro(c1)
   

        grupo[c1].energia-=1
    
             grupo[c1].falando+=1
        grupo[c1].frameau+=1
    }
        



        c.filter = "hue-rotate("+grupo[c1].cor+"deg)";
        if(grupo[c1].vx < 0) {

            switch(grupo[c1].frame) {
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
               if(pausa == false){grupo[c1].mortotics++} 
            }
            if(grupo[c1].mortotics >80){
                grupo.splice(c1,1)
            }
        }
    
    }



    for(c1=0;c1 < arv.length ;c1++){

            if(pausa == false){
                if(bioma == 0){arv[c1].comida+=1}
                if(bioma == 1){arv[c1].comida+=0.5}

            }
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
   if(menu == 0){
        c.drawImage(sele2,1100,350,64,64)
    }
    if(menu == 1){
          c.drawImage(sele,850,350,64,64)
        c.drawImage(square,930,50,352,688)
          if(drawarvore == false){
            c.fillStyle = "red"
            c.fillRect(950,630,80,80)
    }
    if(drawarvore == true){
            c.fillStyle = "gray"
            c.fillRect(950,630,80,80)
    }

      
         c.drawImage(testtree,950,630,64,64)



    c.fillStyle = "red"
    c.fillRect(950,540,80,80)

    c.drawImage(fabrica,950,540,64,64)

    c.fillRect(1040,540,80,80)

    c.drawImage(fabrica,950,540,64,64)
    c.drawImage(toca2,1040,540,64,64)

    c.fillStyle = "red"
    c.fillRect(950,100,130,40)
    
    c.fillRect(10,60,100,30)

   if(remov == false){
    c.fillStyle = "red"
    c.fillRect(950,150,130,40)
   }
   if(remov == true){
    c.fillStyle = "gray"
    c.fillRect(950,150,130,40)
   }
   c.fillStyle = "red"
   c.fillRect(950,200,130,40)
    c.fillStyle = "Black"  
    c.font = "15px Arial"
    c.fillText("Adicionar Animal",955,120)
    c.fillText("Remover",955,170)
    c.fillText("Limpar",955,220)
    }

    c.fillStyle = "red"
c.fillRect(10,60,100,30)
c.fillRect(10,20,100,30)
c.fillRect(10,100,100,30)
    c.fillStyle = "Black"
    c.font = "35px Arial"
    c.fillText("População x"+Populacao,(canvas.width/2)-135,35)
    c.fillText(dias+" Ciclos",(canvas.width/2)-90,765)
    c.font = "25px Arial"
    c.fillText(causa,(canvas.width/2)-135,85)
     c.font = "20px Arial"
    c.fillText("velocidade",10,80)
    c.fillText("Pausar",10,40)
     c.fillText("Finalizar",10,120)
    c.fillText(velocidadeswitch+"x",120,80)


 


}
        if(tela == 3){
            c.fillStyle = "rgba(34, 34, 44, 1)"
              c.fillRect(0,0,canvas.width,canvas.height)
             c.fillStyle = "rgba(252, 252, 252, 1)"
                c.font = "25px serif"
            c.fillText("Velocidade Media",500,90)

            c.fillText("Ciclos:",30,770)

            c.fillText("10",30,700)
            c.fillText("20",30,600)
            c.fillText("30",30,500)
            c.fillText("40",30,400)
            c.fillText("50",30,300)
            c.fillText("60",30,200)

            c.fillText("velocidade:",30,150)


            c.fillText("1",150,770)
            c.fillText("2",300,770)
            c.fillText("3",450,770)
            c.fillText("4",600,770)
            c.fillText("5",750,770)
            c.fillText("6",900,770)
            c.fillText("7",1050,770)

              c.fillStyle = "rgba(114, 15, 15, 1)"
              c.fillRect(105,620,100,120)
              c.fillRect(255,520,100,220)
              c.fillRect(405,320,100,420)
              c.fillRect(555,300,100,440)
              c.fillRect(705,600,100,140)
              c.fillRect(855,500,100,240)
              c.fillRect(1005,560,100,180)



        }
        if(tela == 4){

             c.drawImage(bgCanvas, 0, 0,canvas.width,canvas.height);
              c.drawImage(square, 200, 50,832,732);
                 c.fillStyle = "black"
                c.font = "40px serif"
                c.fillText("Configurações",500,110)

              c.fillStyle = "rgba(210, 117, 117, 1)"
              c.fillRect(360,150,240,50)
              c.fillRect(360,250,240,50)
              c.fillRect(360,350,240,50)
              c.fillRect(525,700,140,50)

               c.fillStyle = "black"
                c.font = "25px serif"
                c.fillText("Quantidade inicial "+quantidadeini+"x",370,180)

                if(bioma == 0){
                    c.fillText("Floresta",430,280)
                }
                if(bioma == 1){
                    c.fillText("Deserto",430,280)
                }
               
                c.fillText("Dificuldade",430,380)
                c.fillText("iniciar",560,730)

                c.drawImage(sele, 620, 160,32,32);
                c.drawImage(sele, 620, 260,32,32);
                c.drawImage(sele, 620, 360,32,32);
                c.drawImage(sele2, 310, 160,32,32);
                c.drawImage(sele2, 310, 260,32,32);
                 c.drawImage(sele2, 310, 360,32,32);
                 c.drawImage(grass, 790, 360,128,128);
                 c.drawImage(testtree2, 780, 300,128,128);
                
           
        }   
    setTimeout(main,velocidade)// chama e repete a função do main() "principal"

}

canvas.addEventListener("click",function(){

    if(tela == 4){
        

        if(event.offsetX > 620 && event.offsetX < 620+32 && event.offsetY > 160 && event.offsetY < 160+32){
            quantidadeini+=1
            if(quantidadeini > 80){ quantidadeini = 80}
        }
        if(event.offsetX > 310 && event.offsetX < 310+32 && event.offsetY > 160 && event.offsetY < 160+32){
            quantidadeini-=1
            if(quantidadeini < 0){ quantidadeini = 0}
        }

        if(event.offsetX > 620 && event.offsetX < 620+32 && event.offsetY > 260 && event.offsetY < 260+32){
            bioma+=1
            if(bioma > 1){
                bioma = 0
            }
        }
        if(event.offsetX > 310 && event.offsetX < 310+32 && event.offsetY > 260 && event.offsetY < 260+32){
            bioma-=1
            if(bioma < 0){
                bioma = 1
            }
        }

        //c.drawImage(sele, 620, 260,32,32);
        //c.drawImage(sele2, 310, 260,32,32);




        if(event.offsetX > 525 && event.offsetX < 525+140 && event.offsetY > 700 && event.offsetY < 700+50){
            tela = 2
            for(c2=0;c2 < quantidadeini ;c2++){ 
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
     grupo[c2].reproducoolmax =  Math.floor(Math.random() * 10000)+2500




     if(bioma == 1){
        testtree.src = "sprites/natural/arbusto.png"
        testtree2.src = "sprites/natural/arbusto2.png"
        grass.src ="sprites/natural/sand.png"
          const pattern = bgCtx.createPattern(grass, "repeat");
        bgCtx.fillStyle = pattern;


        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    }
     
}
        }
    }



    if(tela == 2){
        if(event.offsetX > 950 && event.offsetX < 950+130 && event.offsetY > 200 && event.offsetY < 200+40 && menu == 1){
                    grupo = [];
                    arv = [];
                     Populacao = grupo.length      
        }
                 
             

        if(menu == 0 && event.offsetX > 1100 && event.offsetX < 1100+64 && event.offsetY > 350 && event.offsetY < 350+64){
            menu = 1
        }
        if(menu == 1 && event.offsetX > 850 && event.offsetX < 850+64 && event.offsetY > 350 && event.offsetY < 350+64){
            menu = 0
        }
        if(event.offsetX > 10 && event.offsetX < 10+100 && event.offsetY > 20 && event.offsetY < 20+30){
            pausa = !pausa
        }


         if( event.offsetX > 950 && event.offsetX < 950+130 && event.offsetY > 100 && event.offsetY < 100+40 && menu == 1 ){
            grupo[grupo.length] = Object.create(animal)
            grupo[grupo.length-1].tamanho += (Math.ceil(Math.random()*14))/10
            grupo[grupo.length-1].cor = Math.floor(Math.random() * 255);
            grupo[grupo.length-1].falante = Math.floor(Math.random() * 10000) ;
            grupo[grupo.length-1].velocidade = (Math.random() * 5)
            grupo[grupo.length-1].maxenergiaenergia = Math.floor(Math.random() * 12000);
            grupo[grupo.length-1].energia = grupo[grupo.length-1].maxenergiaenergia;
            grupo[grupo.length-1].nome = nomes[ Math.floor(Math.random() * nomes.length)]
            grupo[grupo.length-1].bonito = Math.floor(Math.random() * 1000)
            grupo[grupo.length-1].reproducoolmax =  Math.floor(Math.random() * 10000)+2500
            grupo[grupo.length-1].idademax =  Math.floor(Math.random() * 100000)+1000
        }
        if( event.offsetX > 950 && event.offsetX < event.offsetX+130 && event.offsetY > 150 && event.offsetY < 150+40 && menu == 1){
            remov = !remov
            drawarvore = false
        }

        if(remov == true){
            let mx = event.offsetX
            let my = event.offsetY

            for(c40 = 0;c40<arv.length;c40++){
                if(mx > arv[c40].x && mx < arv[c40].x+64 && my > arv[c40].y && my < arv[c40].y+64){
                    arv.splice(c40,1)

                }
                if(mx > grupo[c40].x && mx < grupo[c40].x+64 && my > grupo[c40].y && my < grupo[c40].y+64){
                    grupo.splice(c40,1)

                }
            }
              for(c40 = 0;c40<grupo.length;c40++){
                if(mx > grupo[c40].x && mx < grupo[c40].x+64 && my > grupo[c40].y && my < grupo[c40].y+64){
                    grupo.splice(c40,1)

                }
              }
        


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
            if( event.offsetX > 950 && event.offsetX < 950+80 && event.offsetY > 630 && event.offsetY < 630+80){
             drawarvore = !drawarvore
             remov = false
             }
                if(menu == 1){
                    if( !(event.offsetX > 930 && event.offsetX < 930+352 && event.offsetY > 50 && event.offsetY < 50+688) && tela == 2 && drawarvore == true){
                arv[arv.length] = Object.create(arvore)
                 arv[arv.length-1].x = event.offsetX-32
                 arv[arv.length-1].y = event.offsetY-32
                }
                 if(menu == 0){
                    if( tela == 2 && drawarvore == true){
                    arv[arv.length] = Object.create(arvore)
                    arv[arv.length-1].x = event.offsetX-32
                    arv[arv.length-1].y = event.offsetY-32
                }
                 }
                }


                
    }
    if(tela == 1){
         tela = 4
    
    }

   
   
   

    

    
})
document.addEventListener("keyup", function(){



    if(event.keyCode === 13 && tela == 4){
    tela = 2
        for(c2=0;c2 < quantidadeini ;c2++){ 
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
     grupo[c2].reproducoolmax =  Math.floor(Math.random() * 10000)+2500

     
}
}
if(event.keyCode === 13 && tela == 1){
    tela = 4
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


