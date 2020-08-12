import 'phaser';

export default class Taxi extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingUp) {
    if (x < 200) {
      x = 200;
      // console.log('x was reset to lowest NUM!');
    } else if (x > 800) {
      x = 800;
    }
    super(scene, x, y, spriteKey);
    // console.log('X from INSIDE TAXI CLASS: ', x);

    if (x <= 497) {
      // turn the taxi to face the bottom of screen
      // console.log('Taxi has been FLIPPED');
      facingUp = false;
      this.flipY = !this.flipY; // allows us to flip the taxi sprite by toggling (faces taxi toward player)
      // console.log('Taxi FACING UP:', facingUp);
    }

    // incorporate the scene passed to the constructor and our enemy to the scene
    this.scene = scene;
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this); // Enable physics on this entity
    if (!facingUp) {
      // console.log('SETTING Y VELOCITY ON TAXI');
      this.setVelocityY(375);
    } else {
      this.setVelocityY(25);
    }

    // this.playedSound = false; // we add a prop of played sound for our scream and set it to false as default
  }

  update() {
    // // if the enemy's x axis is greater than 600...then flip the taxi sprite (will look like they're heading in opposite direction on road)
    // if (this.y > 600 && !this.playedSound) {
    //   // this.playedSound = true; // we'll reset the played sound to true
    // }
  }
}
