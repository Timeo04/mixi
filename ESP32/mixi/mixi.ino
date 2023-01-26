#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>

// LED Constants
#define LED_PIN 32
#define LED_NUMPIXELS 300
#define LED_INTERNALLED 2

// Status LED Constants
#define STATUSLED_PIN 33
#define STATUSLED_NUMPIXELS 33
#define STATUSLED_BRIGHTNESS 20

// Motor Constants
#define MOTOR_SPEED 25
#define MOTOR_PWMFREQ 50
#define MOTOR_PWMRESOLUTION 8
const int motor_count = 5;
const int motor_pins[] = { 12, 14, 27, 26, 25 };

unsigned long motor_times[motor_count];
bool motor_active = false;

#define CLEAN_DURATION 20000
#define CLEAN_SPEED 10

#define LOAD_DURATION 20000


Adafruit_NeoPixel pixels(LED_NUMPIXELS, LED_PIN);
bool strip_on = true;
bool strip_rainbow = false;
uint16_t strip_rainbow_speed = 0;
uint16_t strip_rainbow_state = 0;
uint32_t strip_color;

Adafruit_NeoPixel status(STATUSLED_NUMPIXELS, STATUSLED_PIN);
String status_mode = "off";
unsigned long status_start;
unsigned long status_end;
unsigned long finished_end;
#define FINISHED_DURATION 5000;
//String status_after = "off";
//uint32_t status_red;
//uint32_t status_green;
uint32_t status_color;

unsigned long currentMillis;

String message;
void setup() {
  currentMillis = millis();

  // setup LEDs
  pinMode(LED_INTERNALLED, OUTPUT);
  pixels.begin();
  Serial.begin(115200);
  pixels.clear();
  //load default color
  strip_color = status.Color(221, 66, 0);

  // setup statusLEDs
  status.begin();
  status.setBrightness(STATUSLED_BRIGHTNESS);
  // status_red = status.Color(255, 0, 0);
  // status_green = status.Color(0, 255, 0);
  // status_yellow = status.Color(221, 66, 0);
  status_color = status.Color(0, 255, 0);

  // setup Motors
  for (int i = 0; i < motor_count; i++) {
    ledcSetup(i, MOTOR_PWMFREQ, MOTOR_PWMRESOLUTION);
    /* Attach the LED PWM Channel to the GPIO Pin */
    ledcAttachPin(motor_pins[i], i);
    ledcWrite(i, 0);
    motor_times[i] = millis();
  }
}

void loop() {
  currentMillis = millis();

  //Check for Serial message
  if (Serial.available() > 0) {
    //read all chars
    char incomingChar = Serial.read();
    if (incomingChar != '\n') {
      message += String(incomingChar);
    } else {
      //when reading is finished
      //handle Message and reset
      handleMessage(message);
      message = "";
    }
  }

  // check if Motor has to be turned off
  if (motor_active) {
    checkMotors();
  }

  // show LED-Strip
  showStrip();
  showStatus();
}

void handleMessage(String message) {
  if (message.startsWith("led_")) {
    handleLedMessage(message.substring(4));
  } else if (message.startsWith("poweroff")) {
    powerOff();
  } else if (message.startsWith("motor_")) {
    handleMotorMessage(message.substring(6));
  } else if (message.startsWith("statusled_")) {
    handleStatusLedMessage(message.substring(10));
  } else if (message == "get_status") {
    sendStatus();
  }
}

void sendStatus() {
  // send JSON-Object with status of led and motors
  StaticJsonDocument<192> doc;

  JsonObject motor = doc.createNestedObject("motor");
  motor["active"] = motor_active;
  if (motor_active) {
    unsigned long maxVal;
    for (int j = 0; j < motor_count; j++) {
      maxVal = max(motor_times[j], maxVal);
    }
    motor["remainingTime"] = maxVal - millis();
  }

  JsonObject led = doc.createNestedObject("led");
  led["on"] = strip_on;
  String colorString = String(strip_color, HEX);
  while (colorString.length() < 6) {
    colorString = "0" + colorString;
  }
  led["color"] = "#" + colorString;

  JsonObject led_rainbow = led.createNestedObject("rainbow");
  led_rainbow["on"] = strip_rainbow;
  led_rainbow["speed"] = strip_rainbow_speed;

  serializeJson(doc, Serial);
  Serial.println();
}

// Handle Motor Message
void handleMotorMessage(String message) {
  if (message.startsWith("clean")) {
    clean();
    setStatus(CLEAN_DURATION);
  } else if (message.startsWith("flush_")) {
    flush(message.substring(6).toInt());
    setStatus(CLEAN_DURATION);
  } else if (message.startsWith("flush")) {
    flush(NULL);
    setStatus(CLEAN_DURATION);
  } else if (message.startsWith("load_")) {
    load(message.substring(5).toInt());
    setStatus(LOAD_DURATION);
  } else if (message.startsWith("load")) {
    load(NULL);
    setStatus(LOAD_DURATION);
  } else {
    String commands = message;
    while (commands.length() > 1) {
      if (commands.indexOf(":") > 0) {
        int port = commands.substring(0, commands.indexOf(":")).toInt();
        int duration;
        if (commands.indexOf("_") > 0) {
          // Serial.println("hallo");
          duration = commands.substring(commands.indexOf(":") + 1, commands.indexOf("_")).toInt();  //... joa
          commands = commands.substring(commands.indexOf("_") + 1);
        } else {
          // Serial.println("hallo2");
          duration = commands.substring(commands.indexOf(":") + 1).toInt();
          commands = "";
        }
        ledcWrite(port, MOTOR_SPEED);
        motor_times[port] = currentMillis + duration;
        setStatus(duration);
        motor_active = true;
      } else {
        break;
      }
    }
  }
}

void flush(int port) {
  if (port != NULL) {
    ledcWrite(port, MOTOR_SPEED);
    motor_times[port] = currentMillis + CLEAN_DURATION;
  } else {
    for (int j = 0; j < motor_count; j++) {
      ledcWrite(j, MOTOR_SPEED);
      motor_times[j] = currentMillis + CLEAN_DURATION;
    }
    motor_active = true;
  }
  motor_active = true;
}

void load(int port) {
  if (port != NULL) {
    ledcWrite(port, MOTOR_SPEED);
    motor_times[port] = currentMillis + LOAD_DURATION;
    motor_active = true;
  } else {
    for (int j = 0; j < motor_count; j++) {
      ledcWrite(j, MOTOR_SPEED);
      motor_times[j] = currentMillis + LOAD_DURATION;
    }
    motor_active = true;
  }
}

void clean() {
  motorPull();
}

void motorPull() {
  //Serial.println("cleaning...");
  for (int j = 0; j < motor_count; j++) {
    ledcWrite(j, CLEAN_SPEED);
    motor_times[j] = currentMillis + CLEAN_DURATION;
  }
  motor_active = true;
}

void powerOff() {
  status_color = status.Color(255, 0, 0);
  setStatus(CLEAN_DURATION);
  strip_on = false;
  motorPull();
  // Serial.println("powering off...");
}

// Handle LED Message
void handleLedMessage(String message) {
  if (message == "on") {
    strip_on = true;
    digitalWrite(LED_INTERNALLED, HIGH);
  } else if (message == "off") {
    strip_on = false;
    digitalWrite(LED_INTERNALLED, LOW);
  } else if (message.startsWith("color_")) {
    setStripColor(message.substring(6));
  } else if (message == "rainbow_on") {
    setStripRainbow(true);
  } else if (message == "rainbow_off") {
    setStripRainbow(false);
  } else if (message.startsWith("rainbow_speed_")) {
    setStripRainbowSpeed(message.substring(14).toInt());
  }
}

void setStripColor(String hexval1) {
  strip_color = (uint32_t)strtol(hexval1.c_str(), NULL, 16);
}

void setStripRainbow(bool b) {
  strip_rainbow = b;
}

void setStripRainbowSpeed(int speed) {
  strip_rainbow_speed = (uint16_t)speed;
}


// Run and stop Motors
void checkMotors() {
  motor_active = false;
  for (int i = 0; i < motor_count; i++) {
    if (motor_times[i] == NULL) {

    } else if (currentMillis > motor_times[i]) {
      ledcWrite(i, 0);
      motor_times[i] = NULL;
    } else {
      motor_active = true;
    }
  }
}

// show strip
void showStrip() {
  if (strip_on) {
    pixels.clear();
    if (strip_rainbow) {
      strip_rainbow_state += strip_rainbow_speed;
      strip_rainbow_state %= 65535;
      pixels.rainbow(strip_rainbow_state, 10);
    } else {
      pixels.fill(strip_color);
    }
  } else {
    pixels.clear();
  }
  pixels.show();
}

// status LEDs
void handleStatusLedMessage(String message) {
  /*if (message.startsWith("setmode_")) {
    //Serial.print("SetMode");
    setStatusMode(message.substring(8));
  } else*/
  if (message.startsWith("start_")) {
    String command = message.substring(6);
    //Serial.print("Command: ");
    //Serial.println(command);
    setStatus(command.toInt());
  }
}

void setStatus(int duration) {
  status_mode = "statusbar";
  status_start = currentMillis - 1;
  if (currentMillis + duration > status_end) {
    status_end = currentMillis + duration;
  }
  //Serial.println(status_mode);
  // if (mode_after != "") {
  //   status_after = mode_after;
  // }
}

/*void setStatusMode(String mode) {
  Serial.println(mode);
  if (mode.startsWith("red")) {
    status_mode = "red";
  } else if (mode.startsWith("green")) {
    status_mode = "green";
  } else if (mode.startsWith("off")) {
    status_mode = "off";
  } else if (mode.startsWith("statusbar")) {
    status_mode = "statusbar";
  }
}*/

void showStatus() {
  status.clear();
  if (status_mode != "finished") {
    if (strip_on) {
      if (strip_rainbow) {
        status.rainbow();
      } else {
        status.fill(strip_color);
      }
    }

    if (status_mode.startsWith("statusbar")) {
      if (currentMillis > status_end) {
        finished_end = currentMillis + FINISHED_DURATION;
        status_mode = "finished";
        status.fill(status_color);
        Serial.println("finished");
      } else {
        if (currentMillis == status_start) {

        } else {
          unsigned long val = STATUSLED_NUMPIXELS * (currentMillis - status_start) / (status_end - status_start);
          int intval = val;
          if (intval != 0) {
            status.fill(status_color, 0, intval);
          }
        }
      }
    }
  }
  if (status_mode == "finished") {
    status.fill(status_color);
    if (currentMillis > finished_end) {
      status_mode = "off";
    }
  }
  //status.fill(status_color);
  /*if (status_mode.startsWith("red")) {
    status.fill(status_red);
  } else if (status_mode.startsWith("green")) {
    status.fill(status_green);
  } else if (status_mode.startsWith("statusbar")) {
    if (currentMillis > status_end) {
      status_mode = status_after;
      status.fill(status_color);
      Serial.println("finished");
    } else {
      unsigned long val = STATUSLED_NUMPIXELS * (currentMillis - status_start) / (status_end - status_start);
      int intval = val;
      status.fill(status_color, 0, intval);
    }
  }*/

  status.show();
}