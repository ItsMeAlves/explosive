//Leitura do sensor capacitivo, usando ciclos de leitura no endereço de memória do processador

uint8_t readCapacitivePin(int pinToMeasure) {
    pinMode(pinToMeasure, OUTPUT);
    digitalWrite(pinToMeasure, LOW);

    delay(1);

    // Prevent the timer IRQ from disturbing our measurement
    noInterrupts();

    // Make the pin an input with the internal pull-up on
    pinMode(pinToMeasure, INPUT_PULLUP);

    // Now see how long the pin to get pulled up. This manual unrolling of the loop
    // decreases the number of hardware cycles between each read of the pin,
    // thus increasing sensitivity.

    uint8_t cycles = 17;
    if (digitalRead(pinToMeasure)) { cycles =  0;}
    else if (digitalRead(pinToMeasure)) { cycles =  1;}
    else if (digitalRead(pinToMeasure)) { cycles =  2;}
    else if (digitalRead(pinToMeasure)) { cycles =  3;}
    else if (digitalRead(pinToMeasure)) { cycles =  4;}
    else if (digitalRead(pinToMeasure)) { cycles =  5;}
    else if (digitalRead(pinToMeasure)) { cycles =  6;}
    else if (digitalRead(pinToMeasure)) { cycles =  7;}
    else if (digitalRead(pinToMeasure)) { cycles =  8;}
    else if (digitalRead(pinToMeasure)) { cycles =  9;}
    else if (digitalRead(pinToMeasure)) { cycles = 10;}
    else if (digitalRead(pinToMeasure)) { cycles = 11;}
    else if (digitalRead(pinToMeasure)) { cycles = 12;}
    else if (digitalRead(pinToMeasure)) { cycles = 13;}
    else if (digitalRead(pinToMeasure)) { cycles = 14;}
    else if (digitalRead(pinToMeasure)) { cycles = 15;}
    else if (digitalRead(pinToMeasure)) { cycles = 16;}

    // End of timing-critical section
    interrupts();

    // Discharge the pin again by setting it low and output
    //  It's important to leave the pins low if you want to
    //  be able to touch more than 1 sensor at a time - if
    //  the sensor is left pulled high, when you touch
    //  two sensors, your body will transfer the charge between
    //  sensors.

    digitalWrite(pinToMeasure, LOW);
    pinMode(pinToMeasure, OUTPUT);
    return cycles;
}


int capValue(int pin, int times) {
    long av = 0;
    for(int x = 0; x < times; x++){
        av += readCapacitivePin(pin); 
    }
    av /= times;
    return (int)av;
}

int base_frequency = 523;
int frequencies[4];
int motorPin = 13;
int states[4] = {0, 0, 0, 0};
int stateFlags[4] = {0, 0, 0, 0};
int timers[4] = {0, 0, 0, 0};
bool driveFlag = false;
int ports[4] = {8, 9, 10, 11}; //Portas especificadas que serão usadas para tpcar
int notes[4] = {1, 2, 4, 8}; //As notas existentes em ordem
int change_value = 0;
unsigned int timestamps[4] = {0, 0, 0, 0};

//Configuração da frequência de comunicação serial e do comportamento dos sensores
void setup() {
    Serial.begin(57600);
    pinMode(motorPin, OUTPUT);

    for(int x = 0; x < 4; x++) {
        frequencies[x] = (x + 1) * base_frequency;
        timers[x] = (int) frequencies[3 - x] / 2;
    }
}

void loop(){
    int sum = 0;
    for(int x = 0; x < 4; x++){
        int val = capValue(ports[x], 55);
        
        if(val > change_value) {
            states[x] = 1;
            sum += notes[x];
        }
        else {
            states[x] = 0;
        }
    }

    Serial.write(sum);

    for(int x = 0; x < 4; x++) {
        if(states[x]) {
            if(millis() - timestamps[x] > timers[x]) {
                digitalWrite(motorPin, driveFlag);
                driveFlag = !driveFlag;
                timestamps[x] = millis();
            }
            break;
        }
    };
}