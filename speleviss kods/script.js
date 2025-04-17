const myCanvas = document.getElementById("myCanvas")

var ctx = myCanvas.getContext("2d");
//Šis kods ļauj pārvietot viesmīli pa kreisi un pa labi, izmantojot bulttaustiņus, bet neļauj tam iziet ārpus kanvas malām.
 function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37 && Waiter_x > 0) {Waiter_x = Waiter_x - 10};  
   if (MyEvent.keyCode == 39 && Waiter_x+WaiterImg.width < myCanvas.width)
            {Waiter_x = Waiter_x+10};
   }

 addEventListener("keydown", MyKeyDownHandler); 
//tiek izveidoti mainigie lai varetu parvietot objektu
 var Waiter_x = 0;
 var Waiter_y = 0;
 var WaiterImg = new Image();
 WaiterImg.src = "https://s2js.com/dzenitis/waiter.png";
//tiek izveidoti mainigie lai varetu parvietot objektu
 var Pizza_x = 0;
 var Pizza_y = 0;
 var PizzaImg = new Image();
 PizzaImg.src = "https://s2js.com/dzenitis/PIZZASLICE_3.png";

 var score = 0;
//Kodā pārbauda, vai divi attēli pārklājas. Ja nē, atgriež `false`, ja jā, tad `true`.
 function ImagesTouching(x1, y1, img1, x2, y2, img2) {
          if (x1 >= x2+img2.width || x1+img1.width <= x2) return false;   
          if (y1 >= y2+img2.height || y1+img1.height <= y2) return false; 
          return true;                                                       
          }
 var time_remaining = 20;//speles ilgums


 function Do_a_Frame () {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//krasa fonts punktu skaits
    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);
//Šis kods zīmē attēlu uz kanvas un rāda atlikušo laiku. Attēls tiek novietots kanvas apakšā, bet laika skaitīšana tiek parādīta kreisajā augšējā stūrī.
    Waiter_y = myCanvas.height - WaiterImg.height;
    ctx.drawImage(WaiterImg, Waiter_x, Waiter_y);
     ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45);
//Kad laiks beidzas, tiek parādīts sarkans "Game Over" teksts kanvas centrā.
    if (time_remaining <= 0) {
          ctx.fillStyle= "red";
          ctx.font = "bold 50px Arial";
          ctx.textAlign="center";
          ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);
          ctx.textAlign="left";
          }
    else {//laika atlikums
          time_remaining = time_remaining - 1/40;
//Pica pārvietojas uz leju, un, kad tā iznāk no apakšas, tā tiek novietota atpakaļ augšpusē ar nejaušu horizontālo pozīciju.
          Pizza_y = Pizza_y + 3;
          if (Pizza_y > myCanvas.height) {
              Pizza_y= 0;
              Pizza_x= Math.random() * (myCanvas.width - PizzaImg.width);
              }   
          }
    ctx.drawImage(PizzaImg, Pizza_x, Pizza_y);
//ja picu noķer pienak klat punkts
    if (ImagesTouching(Waiter_x, Waiter_y, WaiterImg, Pizza_x, Pizza_y, PizzaImg)) {
        score= score + 1;
        Pizza_x= -PizzaImg.width;
        }
    } 
     setInterval(Do_a_Frame, 25);
