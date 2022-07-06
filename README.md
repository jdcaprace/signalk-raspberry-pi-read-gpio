
# signalk-raspberry-pi-read-gpio
This plugin read the gpio status [high (3.3V) or low (0V)] of a reaspberry pi to send it as information for SignalK (SK).

This plugin can be downloaded via the SignalK application.

## Getting Started
You will need a raspberry pi with SignalK installed along with a simple circuit to change the status of the gpio pin of the raspberry pi.

### Pins that can be used for this purpose
It should be noted that the plugin is designed to read the status of the General Purpose IO pins of the Raspberry Pi only, i.e., green pins of the below picture and in the interactive pinout of the Raspberry Pi available [here](https://pinout.xyz/pinout/).

![raspberrypinout](../main/Pictures/raspberrypinout.png)

The plugin is recommended to read the status [high (3.3V) or low (0V)] of the following pins:
* GPIO 4  - Pin 7
* GPIO 17 - Pin 11
* GPIO 27 - Pin 13
* GPIO 22 - Pin 15
* GPIO 5  - Pin 29
* GPIO 6  - Pin 31
* GPIO 13 - Pin 33
* GPIO 19 - Pin 35
* GPIO 26 - Pin 37
* GPIO 23 - Pin 16
* GPIO 24 - Pin 18
* GPIO 25 - Pin 22
* GPIO 12 - Pin 32
* GPIO 16 - Pin 36
* GPIO 20 - Pin 38
* GPIO 21 - Pin 40

### Using a protection to avoid damaging your Raspberry
The maximum voltage recommended for the GPIO pins is 3.3V.
If your circuit may present instabilities or unexpected overvoltage, please use a protection to avoid damages.

If you want to measure 12V signal, we suggest the use of a 12V to 3.3V Optocoupler Isolation Board Voltage Converter with an Isolated Module PLC Signal Level Board and NPN or PNP Output see example [here](https://www.amazon.com/Channel-Optocoupler-Isolation-Isolated-Converter/dp/B07PF4VHZQ). Similar modules are available for 24V too.

## Configuration
The configuration is straightforward, you just have to select the pin and the corresponding signalk path to store the information (high = 1, low = 0). The frequency to read the data is also an important parameter that can be defined in the plugin configuration.

## Authors
* **Jean-David Caprace** - *Author of this plugin*
