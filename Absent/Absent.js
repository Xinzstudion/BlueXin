/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Absent extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("PlayerLeft", "./Absent/costumes/PlayerLeft.png", {
        x: 480,
        y: 234
      })
    ];

    this.sounds = [new Sound("PlayerLeft", "./Absent/sounds/PlayerLeft.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Absent" },
        this.whenIReceiveAbsent
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveAbsent() {
    this.visible = true;
    this.goto(0, 0);
    this.costume = "PlayerLeft";
    yield* this.playSoundUntilDone("PlayerLeft");
    this.visible = false;
  }
}
