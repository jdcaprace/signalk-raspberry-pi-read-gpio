/*
 * Copyright 2022 Jean-David Caprace <jd.caprace@gmail.com>
 *
 * Add the MIT license
 */

const rpio = require('rpio')
//https://github.com/jperkin/node-rpio

module.exports = function (app) {
  let timer = null
  let plugin = {}

  plugin.id = 'signalk-raspberry-pi-read-gpio'
  plugin.name = 'Raspberry-Pi gpio'
  plugin.description = 'Raspberry-Pi gpio reader'

  plugin.schema = {
    type: 'object',
    properties: {
      rate: {
        title: "Sample Rate (in seconds)",
        type: 'number',
        default: 60
      },
      params: {
        type: "array",
        title: "SignalK path and Raspberry Pi gpio pins",
        description: 'Path to store the data from the rpi gpio',
        items: {
          type: "object",
          required: ['enable','pin','skpath'],
          properties: {
            enable: {
              type: 'boolean',
              title: 'Enable the reading of this gpio pin',
              default: false
            },
            pin:{
              type: 'number',
              title: 'Number of the pin of the raspberry pi.',
              description: "Be carreful it is the physical number of the pin, not the GPIO number!",
              enum: [7,11,13,15,16,18,22,29,31,32,33,35,36,37,38,40],
              default: 40
              /*
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
              */
            },
            skpath: {
              type: 'string',
              title: 'SignalK path',
              description: 'This is used to store the value of the rpi gpio status.',
              default: 'environment.rpi.gpio.pin40'
            }
          }
        },
      },
    }
  }


  plugin.start = function (options) {

    function createDeltaMessage(pinvalue, path) {
      app.debug('Create Delta Message for path: ', path);
      values = [
        {
          'path': path,
          'value': pinvalue
        }
      ];
 
      return {
        'context': 'vessels.' + app.selfId,
        'updates': [
          {
            'source': {
              'label': plugin.id
            },
            'timestamp': (new Date()).toISOString(),
            'values': values
          }
        ]
      }
    }

	  // Read raspberry pi GPIO pin values (high or low)
    function readrpigpio() {
      //If they are some pins configured
      if (options.params && options.params.length > 0){ 
        options.params.forEach( param => {
	      app.debug('param: ',param);
	      if (param.enable == true) {
	      
          //To configure the rpio pin
          //https://github.com/jperkin/node-rpio
          rpio.open(param.pin, rpio.INPUT);
          var pinstatus = rpio.read(param.pin);
          app.debug('pin: ',param.pin,'; pinstatus: ',pinstatus);
          var path = param.skpath;
          app.debug('skpath: ',path);

          // create message
          var delta = createDeltaMessage(pinstatus, path);
          // send data
          app.handleMessage(plugin.id, delta);
	      }
        })
        }
        
      }//End of readpigpio
      
    timer = setInterval(readrpigpio, options.rate * 1000);
  }//End plugin.start

  plugin.stop = function () {
    if(timer){
      clearInterval(timer);
      timeout = null;
    }
  }

  return plugin
}


