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



