import StartScene from '../scenes/StartScene';
import CarScene from '../scenes/CarScene';

export const gameState = {
  score: 0,
};

export default {
  score: 0,
  type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
  // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 970, // Game width in pixels  (NOTE: ==> was originally 800)
  height: 775, // Game height in pixels  (NOTE: ==> was originally 600)

  // This option is to turn off the default behavior of images being automatically sharpened.
  // Since we'll be using pixel art, we want every beautiful pixel untouched!
  render: {
    pixelArt: true,
  },
  //  We will be expanding physics later
  physics: {
    // Specify physics engine and configuration
    default: 'arcade', // A simple and performant physics engine
    arcade: {
      gravity: { y: 50 }, // Game objects will be pulled down along the y-axis
      // The number 1500 is arbitrary. The higher, the stronger the pull.
      // A negative value will pull game objects up along the y-axis
      debug: true, // Whether physics engine should run in debug mode  (setting to true will places references boxes around our on screen objects)
    },
    // scene: [StartScene, CarScene],
  },
};

// export default {
//   // ...
//   physics: {    // Specify physics engine and configuration
//     default: 'arcade',  // A simple and performant physics engine
//     arcade: {
//       gravity: { y: 1500 },  // Game objects will be pulled down along the y-axis
//                         // The number 1500 is arbitrary. The higher, the stronger the pull.
//                         // A negative value will pull game objects up along the y-axis
//       debug: false,     // Whether physics engine should run in debug mode
//     }
//   }
