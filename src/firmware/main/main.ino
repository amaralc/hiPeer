/*

  hiPeer

  Turn specificied LEDs ON and OFF

  Created 13 Jan 2020 by Calil Amaral
  Updated 15 Jan 2020 by Calil Amaral

*/

// User info
const int ledButton = 53; // user validation pin (when pressed, change userStatus to 1)
int ledButtonState = LOW; // store initial state of 'ledButton' to LOW
int userState = 0;        // store user status (1 - valid, 0 - invalid)
String inputString = "";  // string to hold user input  
int inputInteger = 0;     // integer to hold converted user input

// Container info
const int clusterSize = 12;
int containerPins[clusterSize] = {28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50}; // define array with container pins
int containerSignalPin = 28;                                              // define pino que envia sinal para LEDs (default = 28);
int containerState = 0;                                                   // define estado do container;
int containerPin;                                                         // define variable to hold container pin number

// the setup function runs once when you press reset or power the board
void setup() {

  // start serial communications at 9600 bits per second
  Serial.begin(9600);
  
  // start digital pin 'ledButton' as input
  pinMode(ledButton, INPUT);

  // start 'LED_BUILTIN' as output
  pinMode(LED_BUILTIN, OUTPUT);

  // initiate 'containerPins' as output and blink each container once for visual confirmation
  for (int i = 0; i <= clusterSize - 1; i++) {

    // initiate containerPin as output
    pinMode(containerPins[i], OUTPUT);

    // blink 'LED_BUILTIN' and container
    digitalWrite(LED_BUILTIN, HIGH);
    digitalWrite(containerPins[i], HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(containerPins[i], LOW);
    
  }
  
  // message user to validate session
  Serial.println("Click the button to validate new session");
  
}

// the loop function runs over and over again forever
void loop() {

  // read ledButton and store result in 'ledButtonState'
  ledButtonState = digitalRead(ledButton);

  // if ledButton active
  if (ledButtonState == HIGH){

    // switch userState to 1 (valid)
    userState = 1;
    Serial.print("User state: ");
    Serial.println(userState); 
    Serial.println("Valid user");
    Serial.println();
    Serial.println("Type the number of the container you wish to open :");    
    delay(200);                    
    
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

        // if user is valid
        if(userState == 1){

          // convert input to integer
          inputInteger = inputString.toInt();
  
          // if number is out of range
          if ((inputInteger < 1) || (inputInteger > 12)){

            // print selected number
            Serial.print("Selected container:");
            Serial.println(inputInteger);
            
            // print error message
            Serial.println("Error: Number of container must be an integer between 1 and 12"); 
            Serial.println("Type the number of the container you wish to open :"); 
            inputString = ""; 
  
          // else, if number is within the range
          } else {       
  
            Serial.print("Selected container:");
            Serial.println(inputInteger);
    
            // define 'containerPin' according to user input
            containerPin = containerPins[inputInteger - 1];
            Serial.print("Container pin number:");
            Serial.println(containerPin);
  
            // open container
            containerState = 1; ////////////// VALIDATE USER AND CONTAINER HERE!
            inputString = ""; 
  
          }       

        // else, if user is not valid  
        } else {

          // message user to validate session
          Serial.println("Click the button before selecting the container");
              
        }; 
        
      };           
      
    }  

    // if user is valid and 'containerState' is active
    if ((userState ==1)&&(containerState == 1)){

      // activate container
      digitalWrite(containerPin, HIGH);  //////////////////// OPEN CONTAINER HERE!
      
      // message user about countdown time
      Serial.println("The selected container will be opened for 3 seconds. Hurry up!");
      delay(3000);

      // deactivate container
      digitalWrite(containerPin, LOW); 

      // reset 'containerState' and 'userState'
      containerState = 0;
      userState = 0;

      // message user to validate session
      Serial.println();
      Serial.println("Click button to validate new session");
    }   
  } 
