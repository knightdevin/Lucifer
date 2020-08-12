import 'phaser';

export default class PoliceCar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingUp = true) {
    if (x < 200) {
      x = 200;
    } else if (x > 800) {
      x = 800;
    }
    super(scene, x, y, spriteKey);

    if (x <= 495) {
      // turn the audi to face the bottom of screen
      facingUp = false;
      this.flipY = !this.flipY; // flips the police car sprite by toggling boolean
    }

    // incorporate the scene passed to the constructor and our enemy to the scene
    this.scene = scene;
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this); // Enable physics on this entity
    if (!facingUp) {
      this.setVelocityY(450);
    } else {
      this.setVelocityY(-5);
    }

    // this.playedSound = false; // we add a prop of played sound for our scream and set it to false as default
  }

  update() {}
}
