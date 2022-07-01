/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LeavingRoom extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Molli", "./LeavingRoom/costumes/Molli.png", {
        x: 480,
        y: 322
      })
    ];

    this.sounds = [
      new Sound("pop", "./LeavingRoom/sounds/pop.wav"),
      new Sound("L", "./LeavingRoom/sounds/L.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "LeavingRoom" },
        this.whenIReceiveLeavingroom
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveLeavingroom() {
    this.goto(0, -800);
    this.size = 100;
    this.visible = true;
    yield* this.glide(0.55, 0, 0);
    yield* this.playSoundUntilDone("L");
    yield* this.glide(0.55, 0, -800);
    this.visible = false;
  }
}
