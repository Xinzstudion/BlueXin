import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Gameid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("NOGame", "./Gameid/costumes/NOGame.png", { x: 412, y: -115 })
    ];

    this.sounds = [new Sound("pop", "./Gameid/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "NoGameFound" },
        this.whenIReceiveNogamefound
      )
    ];
  }

  *whenIReceiveNogamefound() {
    this.costume = "NOGame";
    this.effects.clear();
    this.visible = true;
    this.size = 101.1;
    this.goto(1099, 0);
    yield* this.glide(0.301, 0, 0);
    yield* this.wait(2);
    this.visible = false;
  }
}
