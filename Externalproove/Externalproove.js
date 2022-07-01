/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Externalproove extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("4 (2)", "./Externalproove/costumes/4 (2).png", {
        x: 480,
        y: 277
      })
    ];

    this.sounds = [
      new Sound("pop", "./Externalproove/sounds/pop.wav"),
      new Sound("External", "./Externalproove/sounds/External.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ExternalResponse" },
        this.whenIReceiveExternalresponse
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveExternalresponse() {
    this.goto(0, 0);
    this.size = 100;
    this.visible = true;
    yield* this.playSoundUntilDone("External");
    this.visible = false;
  }
}
