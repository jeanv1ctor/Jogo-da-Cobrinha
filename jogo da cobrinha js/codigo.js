

window.onload = function(){

    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');
    
    document.addEventListener("keydown", keyPush);

    setInterval(game, 100);//define o intervalo de vezes em que a função vai ser chamada

    const vel = 1; // velocidade da cobra
    var vx = vy = 0; //velocidade inicial x e y é igual a 0
    var px = py = 10; // define o ponto inicial x e y da cobra
    var lp = 20; //define o tamanho da peça
    var qp = 20; //define a quantidade de peças dentro do jogo
    var ax = ay = 15; //define a posição inicial da maça

    var trail = []; //define o rastro da cobra
    var tail = 5; //define o tamanho do rabo  


    function game(){//essencia do jogo
        
        px += vx;
        py += vy;

        if(px < 0){// caso a cobra chegue na borda esquerda
            px = qp-1;
        }
        if(px > qp-1){// em cima 
            px = 0;
        }
        if(py < 0){// caso a cobra chege na borda direita
            py= qp-1;
        }
        if(py > qp-1){//em baixo
            py=0;
        }


        ctx.fillStyle = 'black';// pintando o campo
        ctx.fillRect(0, 0, 400, 400);

        ctx.fillStyle = 'red';
        ctx.fillRect(ax*lp, ay*lp, lp, lp);//pintando a maça

        ctx.fillStyle = 'blue';
        for(var i=0; i<trail.length; i++){

            ctx.fillRect(trail[i].x*lp, trail[i].y*lp, lp-1, lp-1);//pintando a cobra

            if (trail[i].x == px && trail[i].y == py){//verifica se existe alguma posição sobreponto outra, ou seja a cobra está se comendo 
                vx = vy = 0; //para a cobra
                tail = 5;
                //window.alert('Game Over!');
            }
        }  

        trail.push({x:px, y:py});
        while (trail.length > tail){//função para atualizar o rastro da cobra
            trail.shift();//função para tirar a ultima posição do array
        }

        if(ax == px &&  ay == py){//verifica se a cobra comeu a maça, (mesma posição da maça) se sim, ela ira aumentar de tamanho
            tail++;// aumentando o rabo

            ax = Math.floor(Math.random()*qp); // reposicionando a maça para outro lugar do tabuleiro
            ay = Math.floor(Math.random()*qp);
        }

    }

    function keyPush(event){ // função para movimentar a cobra- dispara sempre que uma tecla for apertada 

        switch (event.keyCode) {
            case 37://esquerda
                vx = - vel;
                vy = 0;  
                break;
            case 38://pra cima 
                vx = 0;
                vy = -vel;  
                break;                
            case 39://direita
                vx = vel;
                vy = 0;  
                break;
            case 40://pra baixo
                vx = 0;
                vy = vel;  
                break;          
            default:
                break;
        }
    }


}


