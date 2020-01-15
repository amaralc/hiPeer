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
int ledSignal = 52;

// define estado do container;
int containerState = 0;

// string to hold input
String inputString = "";    

// define array with container pins
int containerPins[12] = {28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50};

// define variable to hold container pin number
int containerPin;

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

  

  if (containerState == 1){
    digitalWrite(containerPin,HIGH);  
    delay(100);
    digitalWrite(containerPin, LOW); 
    delay(100);
    containerState = 0;
  } 

  // Read serial input:
  while (Serial.available() > 0) {
    int inputChar = Serial.read();
    if (isDigit(inputChar)) {
      // convert the incoming byte to a char and add it to the string:
      inputString += (char)inputChar;
    }
    // if you get a newline, print the string, then the string's value:
    if (inputChar == '\n') {
      Serial.print("Value:");
      Serial.println(inputString.toInt());

      // define 'containerPin' according to user input
      containerPin = containerPins[inputString.toInt() - 1];
      Serial.print("Container pin number:");
      Serial.println(containerPin);
      pinMode(containerPin, OUTPUT);
      containerState = 1;
            
      // clear the string for new input:
      inputString = "";
    }
  }

  // faz leitura do ledButton e aguarda para manter estabilidade
  ledButtonState = digitalRead(ledButton);  
  delay(300);

  // if ledButton active
  if (ledButtonState == HIGH){

    if (containerState == 0){
      containerState = 1;
    } else {
      containerState = 0;    
    }      

    

    // set ledSignal to high
    //digitalWrite(ledSignal, HIGH);

    // print out the state of the button:
    // Serial.println(ledButtonState);

    // delay in between reads for stability
    delay(1);        
    
  } else {

    // set ledSignal to low
    // digitalWrite(ledSignal, LOW); 

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
