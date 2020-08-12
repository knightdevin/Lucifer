import 'phaser';

export default class LuciferCar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>

    // Store reference of scene passed to constructor
    this.scene = scene;
    this.scene.add.existing(this);

    this.scene.physics.world.enable(this); // Enable physics on this entity
    this.setCollideWorldBounds(true);
  }

  // Check which controller button is being pushed and execute movement & animation
  update(cursors) {
    // NOTE: we added player sounds as parameters here to our update func.
    // << INSERT CODE HERE >>
    // this.updateMovement(cursors);
    // this.updateJump(cursors, engineSound); // <<--- Again, we passed down player sounds as parameters to our updateJump func
    // this.updateInAir(); // On update, check to see if Josh is in the air

    if (cursors.left.isDown) {
      this.setVelocityX(-360);
    }
  }

  updateMovement(cursors) {
    // if (cursors.left.isDown) {
    //   this.setVelocityX(-250); // if the left arrow is pressed down, then move car left by -250
    // } else if (this.cursors.right.isDown) {
    //   this.player.setVelocityX(250); // if the right arrow is pressed down, then move right by +250
    // } else if (this.cursors.up.isDown) {
    //   this.player.setVelocityY(-100); // if up is pressed, adjust velocity to -100 so car goes to top of screen
    // } else if (this.cursors.down.isDown) {
    //   this.player.setVelocityY(250);
    // } else {
    //   this.player.setVelocityX(0); // if no arrow is pressed, then keep car in place (on x axis)
    //   this.player.setVelocityY(50); // if no arrow is pressed, then slowly return to bottom of screen
    // }
  }
}
