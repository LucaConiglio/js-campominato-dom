
// dichiaro il bottone fuori la funzione
const bottone = document.getElementById("bottone");
let bombs;

let bombaEsplosa = false;
let totGriglie;

//creo la funzione al click
bottone.addEventListener ( "click", function () {

    
    //collego opzioni all id griglie
    const opzioni = document.getElementById("griglie");
    

    // prendo il valore di opzioni e lo trasformo in numero con parseint
    let griglie = parseInt(opzioni.value);

    // moltiplico per lo stesso numero per avere il totale delle celle
    let totGriglie = griglie * griglie;

    bombs = generateBombsList( totGriglie );

    

    console.log("le griglie da creare sono", totGriglie);

    console.log("le righe saranno di",griglie);

    //collego il container griglie ad una variabile
    const containerGriglie = document.querySelector (".container-griglie");

        containerGriglie.classList.add("class-griglie");

        //ripulisco il container ogni volta che clicco di nuovo start altrimenti
        //ogni volta che premo start creerebbe altri div
        containerGriglie.innerHTML = "";

        //creo un ciclo per creare i div
        for (let i = 1; i <= totGriglie; i++) {
            //creo elemento div 
            const nuovaCella = document.createElement ("div");
            //inserisco la classe al div creato
            nuovaCella.classList.add("celle");
            //do la width con lo stile inline sarebbe calc 100% / valore delle griglie
            nuovaCella.style.width = `calc(100% / ${griglie})`

            //aggiungo del testo dentro le celle
            nuovaCella.textContent = i;

            //dentro la cella scrivo il numero
            nuovaCella.dataset.numCella = i;

            //metto in ascolto il pulsante
            nuovaCella.addEventListener( "click", onCellClick );

            //con append appendo nuovaCella al containerGriglie
            containerGriglie.append ( nuovaCella );

        }

        let counter = 0
        

            // al click del div nuovaCella
            function onCellClick() {
              //se bomba é uguale a true blocca tutto
                if(bombaEsplosa === true){
                  return
                }
                const numCella = +this.dataset.numCella;
                //creo una variabile e collego il conta
                let conta = document.querySelector(".conta");
                if (this.classList.contains("bg-cella") ){

                  return
                }

                if (this.classList.contains("danger")){
                  
                  return
                }

                counter ++
                
                let allBombs
                if ( bombs.includes( numCella ) ) {
                    // se si, BOOM!
                    alert( "Hai trovato una bomba!!! Game Over!" );
                    
                    
                    
                    this.classList.add( "danger");
                    conta.classList.add( "position","bg" );
                    console.log("di this",this);
                    conta.innerHTML = "il tuo punteggio é di " + (counter - 1) ;
                    console.log("bombs",bombs);
                    bombaEsplosa = true
                    //creiamo un ciclo per andare a prendere tutti i numeri dentro array bombs
                     for (i = 0; i<bombs.length; i++) {
                      //prendo con il selettore ad ogni passaggio del ciclo l'elemento con indice di i
                      allBombs = document.querySelector(`.container-griglie :nth-child(${bombs[i]})`);
                      //ad ogni passaggio del ciclo applico la classe danger
                      allBombs.classList.add("danger")
                     };
                     
                    
                  
                    
                    
                    console.log("numCella", numCella);
                    
                  } else {
                    this.classList.toggle( "bg-cella" );
                    conta.classList.add( "position" );
                    conta.innerHTML = "l'utente ha cliccato " + counter + " volte"; 
                    console.log(counter);
                    if (counter === (totGriglie - 16)){
                      conta.classList.add( "position","bg" );
                      conta.innerHTML = "VITTORIA hai cliccato le celle n. " + counter  + " volte"; 
                      alert("Hai vinto!!!!")
                    }
                    
                  }
                //cambiamo con toggle il background se ce l'ha lo togliamo e viceversa
            }

            //funzione per numero random
            function generateRandomNumber ( min, max ) {
                return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
              }


              function generateBombsList ( totGriglie ) {

                //creo un array vuota dove successivamente andremo ad aggiungere gli elementi
                const bombsList = [];
              
                //faccio un log dell'array 
                console.log(bombsList);

                 // creo un ciclo fino a quando l'array non raggiunge 16 numeri
                 while ( bombsList.length < 16 ) {
                   // genero un numero random
                   const num = generateRandomNumber( 1, totGriglie );
          
                   // se bombsList noncontiene num
                   if ( !bombsList.includes( num ) ) {
                     // aggiungo il numero  all array bombsList
                     bombsList.push( num );
                
                   }
                 }
              
                return bombsList;
              }

})






