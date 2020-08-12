console.log('TESTING START SCENE!');

import 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    // << LOAD BACKGROUNDS & SPRITES HERE >>
    this.load.image(
      'openPhoto',
      'assets/Test-Images/lucifer-lede-1-1300x731.jpg'
    );

    // << LOAD SOUNDS HERE >>
    this.load.audio('music', 'assets/music/Night Out (Free Download).mp3');
  }

  create() {
    // << IMAGES & BACKGROUNDS CREATED HERE >>
    // this is the background image / setting
    this.add.image(0, 5, 'openPhoto').setOrigin(0, 0);

    // << TEXTS CREATED HERE >>
    this.add.text(120, 80, 'Lucifer', {
      fill: '#E12800',
      fontSize: '80px',
    });
    this.add.text(200, 675, 'Click to start a prodigal adventure. ', {
      fill: '#FFFFFF',
      fontSize: '25px',
    });

    // << SOUNDS CREATED HERE >>
    this.music = this.sound.add('music'); // this creates the music for our scene...(based on the preload above)

    // we configure the music sound here, and we store that in a music config variable.
    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };

    // ------>>>>>  UNCOMMENT THE BELOW LINE MUSIC WHEN READY TO TEST OR PLAY
    // Here we'll play the preloaded scene music based off the configuration we created just above
    this.music.play(musicConfig);

    this.input.on('pointerdown', () => {
      this.scene.stop('StarScene'); // here we stop the intro scene when the mouse is clicked
      this.music.stop(musicConfig); // here we stop the intro music when the mouse is clicked
      this.scene.start('CarScene'); // ...finally, here we start the next scene when the mouse is clicked
    });
  }
}
