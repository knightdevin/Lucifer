import 'phaser';

import LuciferCar from '../entity/LuciferCar';
import Taxi from '../entity/Taxi';
import PickUp from '../entity/PickUp';
import Audi from '../entity/Audi';
import PoliceCar from '../entity/PoliceCar';
import gameConfig from '../config/config';

// this will house our remaining time and our remaining life
const levelConfig = {
  timer: 5,
  life: 100,
};

export default class CarScene extends Phaser.Scene {
  constructor() {
    super('CarScene');
    // console.log('THIS WILL BECOME THE CAR LEVEL!');
    // console.log("the 'THIS' game object from constructor: ", this);
    // console.log('this.taxi (constructor) --> ', this.taxi);
    // console.log('this.audi (constructor) --> ', this.audi);
    // console.log('this.player (constructor) --> ', this.player);

    // bind callback functions to the scene object
    this.carCrash = this.carCrash.bind(this);
  }

  preload() {
    console.log('this.taxi (preload) --> ', this.taxi);
    console.log('this.audi (preload) --> ', this.audi);
    console.log('this.player (preload) --> ', this.player);

    // << PRELOAD THE LEVEL'S BACKGROUND HERE >>
    this.load.image('road', 'assets/backgrounds/road.png');

    // << PRELOAD THE LEVEL'S SPRITES HERE >>
    this.load.image(
      'muscleCar',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Car.png'
    );
    this.load.image(
      'cop',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Police.png'
    );
    this.load.image(
      'taxi',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/taxi.png'
    );
    this.load.image(
      'ambulance',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/ambulance_animation'
    );
    this.load.image(
      'audi',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Audi.png'
    );
    this.load.image(
      'pickUp',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Mini_truck.png'
    );
  }

  create() {
    console.log("the 'THIS' game object from create: ", this);
    console.log('this.taxi (create) --> ', this.taxi);
    console.log('this.audi (create) --> ', this.audi);
    console.log('this.player (create) --> ', this.player);

    // this creates the background of the road / driving scene
    this.road = this.add.tileSprite(0, 0, 1200, 1500, 'road');
    this.road.setOrigin(0, 0);

    // << OUR PLAYER'S MUSCLE CAR SPRITE IS CREATED HERE >>
    // this.player = this.physics.add.sprite(550, 450, 'muscleCar').setScale(0.75);
    this.player = new LuciferCar(this, 550, 450, 'muscleCar').setScale(0.75);
    this.time.addEvent({
      delay: 1000,
      callback: this.delayDone,
      callbackScope: this,
      loop: false,
    });

    // now we add cursors to our gameState object (will let us use the left/right/up/down/space/shift keys if we want...we just need to now assign what happens when each is pressed)
    this.cursors = this.input.keyboard.createCursorKeys();

    // this will create a group of our cars bound to the game physics (example: gravity, screen dimensions, etc.)
    const traffic = this.physics.add.group();

    // this.taxi = new Taxi(this, Math.random() * 1000, 200, 'taxi');

    // this function will generate taxi (will be recalled multiple times so we have endless traffic)
    function taxiGenerator() {
      let xCoord = Math.round(Math.random() * 1000);
      this.taxi = new Taxi(this, xCoord, -50, 'taxi', true).setScale(0.7);
      // traffic.create(xCoord, 10, 'taxi').setScale(0.7);
    }

    // this function will generate police car (will be recalled multiple times so we have endless traffic)
    function policeGenerator() {
      let xCoord = Math.round(Math.random() * 1000);

      this.police = new PoliceCar(this, xCoord, -50, 'cop').setScale(0.8);
      // traffic.create(xCoord, 10, 'cop').setScale(0.8);
    }

    // this function will generate an audi (will be recalled multiple times so we have endless traffic)
    function audiGenerator() {
      let xCoord = Math.round(Math.random() * 1000);
      this.audi = new Audi(this, xCoord, -50, 'audi').setScale(0.7);
      // traffic.create(xCoord, 10, 'audi').setScale(0.7);
    }

    // this function will generate a pickUp truck (will be recalled multiple times so we have endless traffic)
    function pickUpGenerator() {
      let xCoord = Math.round(Math.random() * 1000);
      this.pickUp = new PickUp(this, xCoord, -50, 'pickUp', true).setScale(
        0.85
      );
      // traffic.create(xCoord, 10, 'pickUp').setScale(0.85);
    }

    // << TRAFFIC IS CREATED HERE >>
    // here we create multiple events that recalls our various car generator functions in a loop (allows us to create an endless and randome flow of traffic)
    const taxiGenLoop = this.time.addEvent({
      delay: 5500,
      callback: taxiGenerator,
      callbackScope: this,
      loop: true,
    });

    const policeGenLoop = this.time.addEvent({
      delay: 8000,
      callback: policeGenerator,
      callbackScope: this,
      loop: true,
    });

    const audiGenLoop = this.time.addEvent({
      delay: 3200,
      callback: audiGenerator,
      callbackScope: this,
      loop: true,
    });

    const pickUpGenLoop = this.time.addEvent({
      delay: 2700,
      callback: pickUpGenerator,
      callbackScope: this,
      loop: true,
    });

    // << TEXTS CREATED HERE >>
    this.add.text(350, 675, 'SCENE - IN PROGRESS', {
      fill: '#FFFFFF',
      fontSize: '30px',
    });
    // << TEXTS CREATED HERE >>
    this.add.text(800, 675, 'X', {
      fill: '#FFFFFF',
      fontSize: '30px',
    });
    // add the time text to the screen and place a readout of the time on the upper left of screen
    this.timeText = this.add.text(15, 60, `Don't Crash on the Way`, {
      fill: '#FF0000',
      fontSize: '30px',
    });
    // add the score text to the screen and place a readout of the score on the upper right of screen
    this.scoreText = this.add.text(815, 60, `SCORE: ${gameConfig.score}`, {
      fill: '#FFFFFF',
      fontSize: '30px',
    });

    this.timeText.setText(
      `REMAINING TIME: ${this.countDown()}, ${levelConfig.timer}`
    );

    // << CREATE COLLISIONS FOR ALL ENTITIES HERE >>
    // sets the player to collide with the bounds of our game screen (now need to add individual colliders for more specifics)
    // this.player.setCollideWorldBounds(true); // <<--- has been moved into LuciferCar

    this.physics.add.overlap(this.player, this.taxi, this.carCrash, null, this);
  }

  delayDone() {
    this.player.body.setSize(this.player.width, this.player.height, true);
  }

  // Callback fn
  carCrash(player, taxi) {
    console.log(`Lucifer just hit a ${taxi}`);
  }

  // helper functions below:
  countDown() {
    setInterval(function () {
      if (levelConfig.timer <= 0) {
        console.log('OUT OF TIME!!');
        // this.scene.restart();
        // this.registry.destroy(); // destroy registry
        // this.events.off(); // disable all active events
        // this.scene.restart(); // restart current scene
      } else {
        levelConfig.timer -= 1;
      }
    }, 1000);
  }

  update() {
    this.road.tilePositionY -= 5;

    if (this.cursors.left.isDown) {
      // if the left arrow is pressed down, then move car left by -250
      this.player.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      // if the right arrow is pressed down, then move right by +250
      this.player.setVelocityX(250);
    } else if (this.cursors.up.isDown) {
      // if the up arrow is pressed down...then decrease velocity to -100 so car goes to top of screen
      this.player.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(250);
    } else {
      this.player.setVelocityX(0); // if no arrow is pressed, then keep car in place (on x axis)
      this.player.setVelocityY(50); // if no arrow is pressed, then slowly return to bottom of screen
    }
  }
}
