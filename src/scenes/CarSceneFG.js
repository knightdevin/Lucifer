import 'phaser';
import CarSceneBG from './CarSceneBG';
import gameConfig from '../config/config';
import { SplitChunksPlugin } from 'webpack';
import config from '../config/config';

export default class CarSceneFG extends Phaser.Scene {
  constructor() {
    console.log('car foreground scene');
    super();
    // this.scene.add('CarSceneBG', CarSceneBG);
  }

  preload() {
    // <<<<  LOAD BACKGROUND FOR ROAD  >>>>
    this.load.image('highway', 'assets/backgrounds/road.png');

    // <<<<  LOAD CARS  >>>>
    this.load.image(
      'taxi',
      '../../public/assets/sprites/cars/Topdown_vehicle_sprites_pack/taxi.png'
      // public/assets/sprites/cars/Topdown_vehicle_sprites_pack/taxi.png
    );
    this.load.image(
      'audi',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Audi.png'
    );
    this.load.image(
      'pickUp',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Mini_truck.png'
    );
    this.load.image(
      'cop',
      'assets/sprites/cars/Topdown_vehicle_sprites_pack/Police_animation/1.png'
    );
    // public/assets/sprites/cars/Topdown_vehicle_sprites_pack/Police_animation/1.png
  }

  create() {
    // <<<<  CREATE BACKGROUND HERE  >>>>
    this.highway = this.add.image(0, 0, 'highway');
    this.highway.setOrigin(0, 0);

    this.add.text(20, 20, 'CAR SCENE FOREGROUND...');

    this.add.text(350, 675, 'SCENE - IN PROGRESS', {
      fill: '#C0C0C0',
      fontSize: '30px',
    });

    // <<<< START the BACKGROUND for this scene >>>>
    // this.scene.start(CarSceneBG);

    // <<<<  CREATE CARS HERE  >>>>
    this.taxi = this.add.image(
      gameConfig.width / 2 - 200,
      gameConfig.height / 2,
      'taxi'
    );

    this.audi = this.add.image(
      gameConfig.width / 2 - 75,
      gameConfig.height / 2,
      'audi'
    );
    this.pickUp = this.add.image(
      gameConfig.width / 2 + 50,
      gameConfig.height / 2,
      'pickUp'
    );
    this.cop = this.add.image(
      gameConfig.width / 2 + 150,
      gameConfig.height / 2,
      'cop'
    );
  }

  // moveCar(car, speed) {
  //   car.y += speed;
  //   if (car.y > config.height) {
  //     this.resetCarPosition(car);
  //   }
  // }

  // resetCarPosition(car) {
  //   car.y = 0;
  //   // let randomX = Phaser.Math.Between(0, config.width);
  //   // car.x = randomX;
  // }

  // update() {
  //   this.moveCar(this.taxi, 1);
  //   this.moveCar(this.audi, 2);
  //   this.moveCar(this.pickUp, 3);
  //   this.moveCar(this.cop, 4);
  // }
}
