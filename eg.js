var five = require("johnny-five");
var keypress = require("keypress");
var board = new five.Board();


board.on("ready", function() {
  var speed, commands, motors;

  speed = 100;
  commands = null;
  motors = new five.Motors([
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
  ]);

  this.repl.inject({
    motors: motors
  });




  var led = new five.Led(11);

  this.repl.inject({
    led: led
  });

  function controller(ch, key) {
    if (key) {
      if (key.name === 'up') {
        motors[0].fwd(speed * 3);
        motors[1].fwd(speed * 3);
      }
      if (key.name === 'down') {
        motors[0].rev(speed * 3);
        motors[1].rev(speed * 3);
      }
      if (key.name === "space") {
        motors[0].stop();
        motors[1].stop();
      }
      if (key.name === "w") {
        motors[0].fwd(speed);
        motors[1].fwd(speed);
      }
      if (key.name === "s") {
        motors[0].rev(speed);
        motors[1].rev(speed);
      }
      if (key.name === "right") {
        motors[0].rev(speed * .75);
        motors[1].fwd(speed * 2);
      }
      if (key.name === "left") {
        motors[0].fwd(speed * 2);
        motors[1].rev(speed * .75);
      }

      commands = [].slice.call(arguments);
    } else {
      if (ch >= 1 && ch <= 9) {
        speed = five.Fn.scale(ch, 1, 9, 0, 255);
        controller.apply(null, commands);
      }
    }
  }


  keypress(process.stdin);

  process.stdin.on("keypress", controller);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
