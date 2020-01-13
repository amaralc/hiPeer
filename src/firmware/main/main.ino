/*
  LEDs

  Turn 12 LEDs on with the push of a button

  Created 12 Jan 2020
  by Calil Amaral
*/

// pino que aciona o rele dos LEDs
const int ledButton = 53; 

// variavel de estado do ledButton
int ledButtonState = LOW;

// define pino que envia sinal para LEDs
const int ledSignal = 52;


// the setup function runs once when you press reset or power the board
void setup() {

  // inicializa comunicacao serial a 9600 bits por segundo
  Serial.begin(9600);
  
  // inicializa pino digital ledButton como input
  pinMode(ledButton, INPUT);

  // inicializa pino digital ledSignal como output
  pinMode(ledSignal, OUTPUT);
  
}

// the loop function runs over and over again forever
void loop() {


  // faz leitura do ledButton
  ledButtonState = digitalRead(ledButton);
  



  // if ledButton active
  if (ledButtonState == HIGH){

    // set ledSignal to high
    digitalWrite(ledSignal, HIGH);

    // print out the state of the button:
    Serial.println(ledButtonState);

    // delay in between reads for stability
    delay(1);        
    
  } else {

    // set ledSignal to low
    digitalWrite(ledSignal, LOW); 

    // delay in between reads for stability
    delay(1);   
  }
  



  /*
  digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
  digitalWrite(ledSignal, HIGH);    // turn LEDs on
  
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
  digitalWrite(ledSignal, LOW);     // turn LEDs on  
  delay(1000);   
  // wait for a second

  */
  

 
}
