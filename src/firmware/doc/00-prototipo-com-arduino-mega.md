## Keypad input

  Objetivo: configurar VS Code para usar com arduino e adaptar codigo para ler input de keypad.

  * Configura VS Code para usar com arduino;
    * ref: https://cuneyt.aliustaoglu.biz/en/enabling-arduino-intellisense-with-visual-studio-code/

    * (VS Code) Abre 'settings.json' e adiciona os atributos:

    ```javascript
    {
      "arduino.path": "C:\\Program Files (x86)\\Arduino",
      "arduino.additionalUrls": [
        "http://arduino.esp8266.com/stable/package_esp8266com_index.json"
      ],
      "arduino.logLevel":"info",
      "arduino.enableUSBDetection": true,
      "C_Cpp.intelliSenseEngine": "Tag Parser"
    }

    ```

    * (VS Code) Abre C/C++: Edit Configurations (JSON) e atualiza para:

    ```javascript
    {
      "configurations": [
          {
              "name": "Win32",
              "includePath": [
                  "C:\\Users\\Avell\\AppData\\Local\\Arduino15\\packages\\esp8266\\tools\\**",
                  "C:\\Users\\Avell\\AppData\\Local\\Arduino15\\packages\\esp8266\\hardware\\esp8266\\2.6.3\\**",
                  "C:\\Program Files (x86)\\Arduino\\tools\\**",
                  "C:\\Program Files (x86)\\Arduino\\hardware\\arduino\\avr\\**",
                  "${workspaceFolder}/**",
                  "C:\\Users\\Avell\\Documents\\Arduino\\libraries\\Keypad\\src"
              ],
              "browse": {
                  "limitSymbolsToIncludedHeaders": false,
                  "path": [
                      "C:\\Program Files (x86)\\Arduino\\hardware\tools\\avr\\avr\\include",
                      "C:\\Users\\Avell\\Documents\\Arduino\\libraries\\Keypad\\src",
                      "${workspaceRoot}"
                  ]
              },
              "defines": [
                  "_DEBUG",
                  "UNICODE",
                  "_UNICODE"
              ],
              "compilerPath": "/usr/bin/gcc",
              "cStandard": "c11",
              "cppStandard": "c++17",
              "intelliSenseMode": "msvc-x64",
              "forcedInclude": [
                  "C:\\Program Files (x86)\\Arduino\\hardware\\arduino\\avr\\cores\\arduino\\Arduino.h"
              ]
          }
      ],
      "version": 4
    }

    ```

  * Adiciona codigo para ler entradas do keypad
    * Ref: https://playground.arduino.cc/Main/KeypadTutorial/
  * Cria esquema de ligacao simplificado usando Fritzing Software;
  * Salva imagem do esquema de ligacao com nome 'schematics' na pasta 'firmware/doc';

## RFID Validation

  Objetivo: substituir push button por leitor RFID para validacao do usuario.

  * Libera pinos 50, 51, 53 (pinos padrao para leitor RFID):
    * Readapta pinos e cria novo schematics;
  
  * Testa codigo simples conforme tutorial:
    * https://www.instructables.com/id/Interfacing-RFID-RC522-With-Arduino-MEGA-a-Simple-/

    ```c++
    /*
    PINOUT:
    RC522 MODULE    Uno/Nano     MEGA
    SDA             D10          D9
    SCK             D13          D52
    MOSI            D11          D51
    MISO            D12          D50
    IRQ             N/A          N/A
    GND             GND          GND
    RST             D9           D8
    3.3V            3.3V         3.3V
    */
    /* Include the standard Arduino SPI library */
    #include <SPI.h>
    /* Include the RFID library */
    #include <RFID.h>

    /* Define the DIO used for the SDA (SS) and RST (reset) pins. */
    #define SDA_DIO 9
    #define RESET_DIO 8
    /* Create an instance of the RFID library */
    RFID RC522(SDA_DIO, RESET_DIO); 

    void setup()
    { 
      Serial.begin(9600);
      /* Enable the SPI interface */
      SPI.begin(); 
      /* Initialise the RFID reader */
      RC522.init();
    }

    void loop()
    {
      /* Has a card been detected? */
      if (RC522.isCard())
      {
        /* If so then get its serial number */
        RC522.readCardSerial();
        Serial.println("Card detected:");
        for(int i=0;i<5;i++)
        {
        Serial.print(RC522.serNum[i],DEC);
        //Serial.print(RC522.serNum[i],HEX); //to print card detail in Hexa Decimal format
        }
        Serial.println();
        Serial.println();
      }
      delay(200);
    }

    ```

  * Adapta partes do codigo acima ao main.ino e testa funcionalidades separadamente sem excluir funcionalidade do botao;

  * Substitui funcionalidade do push button por isCard do RFID.
    * Se cartao lido -> buttonState = HIGH

  


     
