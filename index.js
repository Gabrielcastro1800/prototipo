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
    fuga: false,
    envenado: false
};      

const toca = {
    x:0,
    y:0,
    cooldown:4000,
    cooldownmax:4000,
    dentro: true
}
const predador = {
    x:0,
    y:0,
    maximodetempo:5000,
    vx:0,
    vy:0,
    tic:0,
    startx:0,
    starty:0
}


    let Dificuldade = 1



    const fabrica = {
    x:0,
    y:0,
    poluicao:0,
    tic:0
    }
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
let drawfabrica = false
let mostrarinfo = -1
let bioma = 0
let drawtoca = false

let pausa = false
let tocas = []
let predadores = []
let drawarvore = false
let Populacao = 0
let causa = ""

let quantidadeini = 15
let remov = false
let fabricas = []
let mainStarted = false;


let ids = 0 // ids quantidade de objs no vetor grupo[]
let water = [400,300,50,50] // temporario relacionado a localização da comida ou agua


let arv = []

// Histórico de médias para gráfico
let historicoVelocidade = []
let historicoTamanho = []
let historicoEnergia = []
let historicoMaxenergia = []
let historicoCor = []
let historicoBonito = []
let historicoReproducoolmax = []
let historicoIdademax = []
let historicoFalante = []
let ultimoDiaGrafico = 0
let graficoAtual = 0  // 0-8 para cada variável





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


let filt = 0

function calcularMedia(propriedade){
    if(grupo.length === 0) return 0
    let soma = 0
    for(let i = 0; i < grupo.length; i++){
        if(grupo[i].morto === false){
            soma += grupo[i][propriedade]
        }
    }
    return soma / grupo.length
}

function main(){ // funcao principal do jogo

    

    
    if(tela == 7){
        c.clearRect(0,0,canvas.width,canvas.height)

        c.filter = "hue-rotate("+filt+"deg)";
       c.drawImage(sprite1, 128, 128, 128, 120); 
    }


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
      
            if(dias !== ultimoDiaGrafico){
                historicoVelocidade.push(calcularMedia('velocidade'))
                historicoTamanho.push(calcularMedia('tamanho'))
                historicoEnergia.push(calcularMedia('energia'))
                historicoMaxenergia.push(calcularMedia('maxenergia'))
                historicoCor.push(calcularMedia('cor'))
                historicoBonito.push(calcularMedia('bonito'))
                historicoReproducoolmax.push(calcularMedia('reproducoolmax'))
                historicoIdademax.push(calcularMedia('idademax'))
                historicoFalante.push(calcularMedia('falante'))
                ultimoDiaGrafico = dias
            }
            diastic = 0
            }
       }  
    
     
     
       Populacao=grupo.length

    c.drawImage(bgCanvas, 0, 0,canvas.width*zoom,canvas.height*zoom);
    for(c1=0;c1 < grupo.length ;c1++){ 
        if(pausa == false){ if(grupo[c1].energia <= 0){grupo[c1].morto = true; causa = grupo[c1].nome+" Morreu de fome"}
         if(grupo[c1].idade >= grupo[c1].idademax){grupo[c1].morto = true;causa = grupo[c1].nome+" Morreu de velhice"}}
            
         


        if(grupo[c1].morto == false){
        
       if(pausa == false){

        for(c2=0;c2 < predadores.length ;c2++){
             if(pontoColidecomCirculo(predadores[c2].x,predadores[c2].y,grupo[c1].x,grupo[c1].y,300)){
            grupo[c1].vx+= (grupo[c1].x - predadores[c2].x) * 0.01
            grupo[c1].vy+= (grupo[c1].y - predadores[c2].y) * 0.01
            if(grupo[c1].vx > grupo[c1].velocidade){grupo[c1].vx = grupo[c1].velocidade}
            if(grupo[c1].vy > grupo[c1].velocidade){grupo[c1].vy = grupo[c1].velocidade}
            if(grupo[c1].vx < -grupo[c1].velocidade){grupo[c1].vx = -grupo[c1].velocidade}
            if(grupo[c1].vy < -grupo[c1].velocidade){grupo[c1].vy = -grupo[c1].velocidade}

            grupo[c1].fuga = true
        }
        else{
            grupo[c1].fuga = false
        }
        if(predadores.length == 0){
            grupo[c1].fuga = false
        }

        }

             if(grupo[c1].objetivocool < 0 && grupo[c1].energia < grupo[c1].maxenergia/2 && grupo[c1].fuga == false){objetivocomida(c1)}
        if(grupo[c1].objetivocool < 0 && grupo[c1].energia > grupo[c1].maxenergia/2 && grupo[c1].fuga == false){objetivo(c1)}
        

       
        
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

        if(grupo[c1].falando > grupo[c1].falante){
            grupo[c1].falando = 0
            grupo[c1].f = !grupo[c1].f
            grupo[c1].pensando = falas[Math.ceil(Math.random()*falas.length-1)]
        }
       



    
        

  


        }else{
            if(grupo[c1].mortotics < 80){
                c.drawImage(dead,grupo[c1].x*zoom,(grupo[c1].y*zoom)+movezoomy,(32*zoom)*grupo[c1].tamanho,(32*zoom)*grupo[c1].tamanho)
               if(pausa == false){grupo[c1].mortotics++} 
                
            }
            if(grupo[c1].mortotics == 80){
                grupo.splice(c1,1)
            }
            
        }
      
    }
    

        if(tocas.length > 0){
            
        c.drawImage(toca1,tocas[0].x,tocas[0].y,64,64)
    
 
        
    
    if(pausa == false){
         tocas[0].cooldown-=1
         if(tocas[0].cooldown == 0 && tocas[0].dentro == true){
            tocas[0].cooldown = -1
            tocas[0].dentro = false
            predadores[predadores.length] = Object.create(predador)
            predadores[predadores.length-1].x = tocas[0].x
            predadores[predadores.length-1].y = tocas[0].y
            predadores[predadores.length-1].startx = tocas[0].x
            predadores[predadores.length-1].starty = tocas[0].y
            predadores[predadores.length-1].vx = 0
            predadores[predadores.length-1].vy = 0
            predadores[predadores.length-1].maximodetempo = 5000*Dificuldade
         }

    }
        }

        
    
    c.filter = "none";
    for(c1=0;c1 < predadores.length ;c1++){
        // Sempre desenhar o predador (sem piscar) - tic controla apenas animação
        if(predadores[c1].vx > 0){
            if(predadores[c1].tic < 5){
                c.drawImage(predador1,predadores[c1].x*zoom,predadores[c1].y*zoom,64,64)
            } else {
                c.drawImage(predador2,predadores[c1].x*zoom,predadores[c1].y*zoom,64,64)
            }
        }
        else if(predadores[c1].vx < 0){
            if(predadores[c1].tic < 5){
                c.drawImage(predador3,predadores[c1].x*zoom,predadores[c1].y*zoom,64,64)
            } else {
                c.drawImage(predador4,predadores[c1].x*zoom,predadores[c1].y*zoom,64,64)
            }
        }
        else {
            c.drawImage(predador1,predadores[c1].x*zoom,predadores[c1].y*zoom,64,64)
        }

        if(pausa == false){
            predadores[c1].tic+=1
            if(predadores[c1].tic > 10){
                predadores[c1].tic = 0
            }
            predadores[c1].maximodetempo-=1
            if(predadores[c1].maximodetempo <= 0){
                predadorback(c1)
            }else{
                predadorhunt(c1)
             }
            
        }
    }
     for(c1=0;c1 < fabricas.length ;c1++){

            if(pausa == false){
                fabricas[c1].tic+=1

                if(fabricas[c1].tic > 30){
                    fabricas[c1].tic = 0
                }
            }

            if(fabricas[c1].tic >= 0 && fabricas[c1].tic < 10){
                c.drawImage(fab,fabricas[c1].x*zoom,fabricas[c1].y*zoom,128,128)
            }
            if(fabricas[c1].tic >= 10 && fabricas[c1].tic < 20){
                c.drawImage(fab2,fabricas[c1].x*zoom,fabricas[c1].y*zoom,128,128)
            }
            if(fabricas[c1].tic >= 20 && fabricas[c1].tic <= 30){
                c.drawImage(fab3,fabricas[c1].x*zoom,fabricas[c1].y*zoom,128,128)
            }

            for(c2=0;c2 < arv.length ;c2++){
         
                if(pontoColidecomCirculo(arv[c2].x,arv[c2].y,fabricas[c1].x,fabricas[c1].y,300)){
                   if(pausa == false){ arv[c2].comida -= 0.25
                    c.drawImage(venenoimg,arv[c2].x+10,arv[c2].y-30,32,32)
                    }
                 
            }
        }
            for(c2=0;c2 < grupo.length ;c2++){
                if(pontoColidecomCirculo(grupo[c2].x,grupo[c2].y,fabricas[c1].x,fabricas[c1].y,400*Dificuldade)){
                   if(pausa == false){ grupo[c2].energia -= 1}
                   c.drawImage(venenoimg,grupo[c2].x+10,grupo[c2].y-30,32,32)
                   grupo[c2].envenado = true
            }
        else{
            grupo[c2].envenado = false
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
            c.font = "10px Asimovian"
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
    }else{
        c.fillStyle = "gray"
            c.fillRect(950,630,80,80)
    }
            
    

      
         c.drawImage(testtree,950,630,64,64)


    if(drawfabrica == false){
        c.fillStyle = "red"
         c.fillRect(950,540,80,80)
    }
    else{
        c.fillStyle = "gray"
         c.fillRect(950,540,80,80)
    }
    c.fillStyle = "red"
   
    
    c.drawImage(fab,950,540,64,64)

    

    if(drawtoca == false){
        c.fillStyle = "red"
        c.fillRect(1040,540,80,80)
    }else{
        c.fillStyle = "gray"
        c.fillRect(1040,540,80,80)
    }
    c.drawImage(toca2,1040,540,64,64)

    c.fillStyle = "red"
    c.fillRect(950,100,130,40)
    
    c.fillRect(10,60,100,30)

   if(remov == false){
    c.fillStyle = "red"
    c.fillRect(950,150,130,40)
   }else{
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
    if(pausa == false){
    c.fillText("Pausar",10,40)
    }else{
    c.fillText("Continuar",10,40)
    }
     c.fillText("Grafico",10,120)
    c.fillText(velocidadeswitch+"x",120,80)

    try{if(mostrarinfo >= 0){
        c.drawImage(square, grupo[mostrarinfo].x-60, grupo[mostrarinfo].y-200,150,200);

        c.fillStyle = "black"
        c.font = "12px Arial"
        c.fillText("Nome: "+grupo[mostrarinfo].nome, grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-180);
        c.fillText("Idade: "+Math.floor((grupo[mostrarinfo].idade/grupo[mostrarinfo].idademax)*100)+"%", grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-160);
        c.fillText("Tamanho: "+grupo[mostrarinfo].tamanho.toFixed(2), grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-140);
        c.fillText("Cor: "+grupo[mostrarinfo].cor.toFixed(2), grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-120);
        c.fillText("Velocidade: "+grupo[mostrarinfo].velocidade.toFixed(2), grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-100);
        c.fillText("Fala: "+grupo[mostrarinfo].falante.toFixed(2), grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-80);
        c.fillText("Bonito: "+grupo[mostrarinfo].bonito.toFixed(2), grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-60);
        c.fillText("Energia: "+Math.floor((grupo[mostrarinfo].energia/grupo[mostrarinfo].maxenergia)*100)+"%", grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-40);
        c.fillText("Reprodução: "+Math.floor((grupo[mostrarinfo].reproducool/(grupo[mostrarinfo].reproducoolmax||1))*100)+"%", grupo[mostrarinfo].x-50, grupo[mostrarinfo].y-20);
    }}
    catch{}

 


}
        if(tela == 3){
            c.fillStyle = "rgba(34, 34, 44, 1)"
            c.fillRect(0,0,canvas.width,canvas.height)

            c.fillStyle = "red"
             c.fillRect(20,20,100,30)

             c.font = "20px Arial"
                c.fillStyle = "black"
                c.fillText("Voltar",50,40)

             c.fillStyle = "rgba(34, 34, 44, 1)"
     
            let variavelGrafico = ["Velocidade", "Tamanho", "Energia", "Max Energia", "Cor", "Bonito", "Reprodução (max)", "Idade (max)", "Falante"]
            let historicoAtual = graficoAtual === 0 ? historicoVelocidade : 
                                  graficoAtual === 1 ? historicoTamanho : 
                                  graficoAtual === 2 ? historicoEnergia :
                                  graficoAtual === 3 ? historicoMaxenergia :
                                  graficoAtual === 4 ? historicoCor :
                                  graficoAtual === 5 ? historicoBonito :
                                  graficoAtual === 6 ? historicoReproducoolmax :
                                  graficoAtual === 7 ? historicoIdademax : historicoFalante
            
            c.fillStyle = "rgba(252, 252, 252, 1)"
            c.font = "25px serif"
            c.fillText(variavelGrafico[graficoAtual] + " - Média do Grupo", 300, 90)
            
         
            c.font = "14px serif"
            c.fillText("Clique para alternar variáveis (" + (graficoAtual + 1) + "/9)", 350, 125)
            
    
            c.fillStyle = "rgba(252, 252, 252, 1)"
            c.fillRect(80, 150, 1050, 2)  // eixo X
            c.fillRect(80, 150, 2, 520)   // eixo Y
            
            c.font = "14px serif"
    
            c.fillText("Max", 20, 165)
            c.fillText("Med", 20, 415)
            c.fillText("Min", 20, 665)
            
        
            c.fillText("Ciclos:", 20, 720)
            

            if(historicoAtual.length > 0){
                let maxValor = Math.max(...historicoAtual) * 1.2
                let larguraBarra = 90
                let espacoBarra = 120
                
                for(let i = 0; i < historicoAtual.length && i < 7; i++){
                    let altura = (historicoAtual[i] / maxValor) * 520
                    let x = 100 + (i * espacoBarra)
                    let y = 670 - altura
                    
               
                    let cores = [
                        "rgba(255, 100, 100, 1)",  
                        "rgba(100, 150, 255, 1)", 
                        "rgba(100, 255, 150, 1)",  
                        "rgba(255, 200, 100, 1)",   
                        "rgba(255, 100, 200, 1)", 
                        "rgba(200, 100, 255, 1)",   
                        "rgba(100, 255, 255, 1)",  
                        "rgba(255, 255, 100, 1)",   
                        "rgba(150, 200, 100, 1)"  
                    ]
                    
                    c.fillStyle = cores[graficoAtual]
                    c.fillRect(x, y, larguraBarra, altura)
                    
             
                    c.fillStyle = "rgba(252, 252, 252, 1)"
                    c.font = "12px serif"
                    c.fillText((i+1), x + 35, 720)
                    
             
                    c.font = "11px serif"
                    c.fillText(historicoAtual[i].toFixed(1), x + 20, y - 5)
                }
            } else {
                c.fillStyle = "rgba(150, 150, 150, 1)"
                c.font = "20px serif"
                c.fillText("Colete dados iniciando a simulação", 300, 400)
            }
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
               

                if(Dificuldade == 0.5){
                    c.fillText(" Fácil",430,380)
                }
                if(Dificuldade == 1){
                    c.fillText(" Medio",430,380)
                }
                if(Dificuldade == 2){
                    c.fillText(" Difícil",430,380)
                }
            


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
    setTimeout(main,velocidade) 

}

canvas.addEventListener("click",function(){

    if(tela == 3){

        if(event.offsetX > 20 && event.offsetX < 20+100 && event.offsetY > 20 && event.offsetY < 20+30){
            tela = 2
        }

       
        graficoAtual = (graficoAtual + 1) % 9
    }

    if(tela == 4){
        if(event.offsetX > 620 && event.offsetX < 620+32 && event.offsetY > 360 && event.offsetY < 360+32){
            if(Dificuldade == 0.5){ Dificuldade = 1}
            else if(Dificuldade == 1){ Dificuldade = 2}
            else if(Dificuldade == 2){ Dificuldade = 0.5}
        }
        if(event.offsetX > 310 && event.offsetX < 310+32 && event.offsetY > 360 && event.offsetY < 360+32){
            if(Dificuldade == 0.5){ Dificuldade = 2}
            else if(Dificuldade == 1){ Dificuldade = 0.5}
            else if(Dificuldade == 2){ Dificuldade = 1}
        }
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
            if(bioma == 1){
                testtree2.src = "sprites/natural/arbusto.png"

                 grass.src = "sprites/natural/sand.png"
            }
            if(bioma == 0){
                testtree2.src = "sprites/natural/arv2.png"

                 grass.src = "sprites/natural/grass.png"
            }
        }
        if(event.offsetX > 310 && event.offsetX < 310+32 && event.offsetY > 260 && event.offsetY < 260+32){
            bioma-=1
            if(bioma < 0){
                bioma = 1
            }
            if(bioma == 1){
                testtree2.src = "sprites/natural/arbusto.png"

                 grass.src = "sprites/natural/sand.png"
            }
            if(bioma == 0){
                testtree2.src = "sprites/natural/arv2.png"

                 grass.src = "sprites/natural/grass.png"
            }
        }

        //c.drawImage(sele, 620, 260,32,32);
        //c.drawImage(sele2, 310, 260,32,32);




        if(event.offsetX > 525 && event.offsetX < 525+140 && event.offsetY > 700 && event.offsetY < 700+50){
            tela = 2
       
            historicoVelocidade = []
            historicoTamanho = []
            historicoEnergia = []
            historicoMaxenergia = []
            historicoCor = []
            historicoBonito = []
            historicoReproducoolmax = []
            historicoIdademax = []
            historicoFalante = []
            ultimoDiaGrafico = 0
            graficoAtual = 0
            for(c2=0;c2 < quantidadeini ;c2++){ 
    grupo[c2] = Object.create(animal)
    grupo[c2].tamanho += (Math.ceil(Math.random()*14))/10
    grupo[c2].cor = Math.floor(Math.random() * 255);
    grupo[c2].falante = Math.floor(Math.random() * 4000);
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
        if(event.offsetX > 10 && event.offsetX < 10+100 && event.offsetY > 100 && event.offsetY < 630+30){
            tela = 3
        }
        //c.fillRect(10,100,100,30)


         if(!(event.offsetX > 930 && event.offsetX < 930+352 && event.offsetY > 50 && event.offsetY < 50+688) && drawfabrica == true){
        fabricas[fabricas.length] = Object.create(fabrica)
        fabricas[fabricas.length-1].x = event.offsetX-64
        fabricas[fabricas.length-1].y = event.offsetY-64
    }
        if(event.offsetX > 1040 && event.offsetX < 1040+80 && event.offsetY > 540 && event.offsetY < 540+80 && menu == 1){
            drawtoca = !drawtoca
            remov = false
            drawarvore = false
            drawfabrica = false
        }
        if(!(event.offsetX > 930 && event.offsetX < 930+352 && event.offsetY > 50 && event.offsetY < 50+688) && drawtoca == true){
        tocas[0] = Object.create(toca)
        tocas[0].x = event.offsetX-32
        tocas[0].y = event.offsetY-32
        tocas[0].cooldown = 4000*(1/Dificuldade)
        tocas[0].cooldownmax = 4000*(1/Dificuldade)     
    }
        if(event.offsetX > 950 && event.offsetX < 950+80 && event.offsetY > 540 && event.offsetY < 540+80 && menu == 1){
            
            drawfabrica = !drawfabrica
            remov = false
            drawarvore = false
            drawtoca = false
        }
           
        if(event.offsetX > 950 && event.offsetX < 950+130 && event.offsetY > 200 && event.offsetY < 200+40 && menu == 1){
                    grupo = [];
                    arv = [];
                    fabricas = [];
                    tocas = [];
                    predadores = [];
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
            drawfabrica = false
            drawtoca = false
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
              for(c40 = 0;c40<fabricas.length;c40++){
                if(mx > fabricas[c40].x && mx < fabricas[c40].x+128 && my > fabricas[c40].y && my < fabricas[c40].y+128){
                    fabricas.splice(c40,1)

                }
                
              }
              for(c40 = 0;c40<tocas.length;c40++){
                if(mx > tocas[c40].x && mx < tocas[c40].x+64 && my > tocas[c40].y && my < tocas[c40].y+64){
                    tocas.splice(c40,1)
                    if((predadores[c40] == null || predadores[c40] == undefined) == false){
                    predadores.splice(c40,1)
                    }
                    
                }
                }
            
        


        }

        
       
        
         if( event.offsetX > 10 && event.offsetX < 10+100 && event.offsetY > 60 && event.offsetY < 60+30 ){
        switch(velocidadeswitch){
            case 1: 
                    velocidade = 5
                    velocidadeswitch = 2
                    
                    break;
            case 2:
                velocidade = 0
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
                drawfabrica = false
                drawtoca = false

             }
            
                    if( !(event.offsetX > 930 && event.offsetX < 930+352 && event.offsetY > 50 && event.offsetY < 50+688) && tela == 2 && drawarvore == true){
                arv[arv.length] = Object.create(arvore)
                 arv[arv.length-1].x = event.offsetX-32
                 arv[arv.length-1].y = event.offsetY-32
                }
               
                


                
    }
    if(tela == 1){
         tela = 4
    
    }

   
   
   

    

    
})
document.addEventListener("keyup", function(){



    if(event.keyCode === 13 && tela == 4){
    tela = 2
    historicoVelocidade = []
    historicoTamanho = []
    historicoEnergia = []
    historicoMaxenergia = []
    historicoCor = []
    historicoBonito = []
    historicoReproducoolmax = []
    historicoIdademax = []
    historicoFalante = []
    ultimoDiaGrafico = 0
    graficoAtual = 0
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
document.addEventListener("mousemove", function(){
    if(tela == 2){


        try{for(c1=0;c1 < grupo.length ;c1++){
            if(event.offsetX > grupo[c1].x && event.offsetX < grupo[c1].x+40 && event.offsetY > grupo[c1].y && event.offsetY < grupo[c1].y+40){
                mostrarinfo = c1

            }else{
                if(mostrarinfo == c1){
                    mostrarinfo = -1
                }
            }
        }}
        catch{}
    }
})



grass.onload = () => {
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;

        const pattern = bgCtx.createPattern(grass, "repeat");
        bgCtx.fillStyle = pattern;


        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        if (!mainStarted) { mainStarted = true; main(); }

}


