// var five = require("johnny-five");
// var board = new five.Board();

// board.on("ready", function() {
//   var button = new five.Button(2);

//   button.on("press", function() {
//     console.log("Button Pressed!");
//   });
//   button.on("release", function() {
//     console.log("Button Released!");
//   });
// });
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(11);
  var button = new five.Button(2);

  button.on("press", function() {
    led.on();
  });

  button.on("hold", function() {
    led.blink(50);
  });

  button.on("release", function() {
    led.stop().off();
  });
});