import { Spine } from "pixi-spine";
import { Application, Container } from "pixi.js";
import { LoadedData } from "../canvas";

export class Girl extends Container {
  public spine: Spine;
  private originalScale: number = 0.2;
  private direction: number = 40;

  constructor(app: Application, texture: LoadedData) {
    super();

    this.spine = new Spine(texture.characters.spineData);
    this.spine.skeleton.setSkinByName("girl");
    this.spine.autoUpdate = true;
    // this.spine.state.setAnimation(0, "glitch", true);

    // Initial setup
    this.addChild(this.spine);
    this.updateScaleAndPosition(app.view.width, app.view.height);
  }

  public updateScaleAndPosition(
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (canvasWidth <= 320 && canvasHeight <= 568) {
      this.originalScale = 0.2;
      this.direction = 40;
    }

    if (canvasWidth >= 768 && canvasWidth <= 834) {
      this.originalScale = 0.4;
      this.direction = 100;
    }

    if (canvasWidth > 1280) {
      this.originalScale = 0.35;
      this.direction = 90;
    }
    if (canvasWidth >= 1500) {
      this.originalScale = 0.25;
      this.direction = 45;
    }
    if (canvasWidth > 1536) {
      this.originalScale = 0.35;
      this.direction = 90;
    }

    this.spine.scale.set(this.originalScale, this.originalScale); // No flip for the girl
    const bounds = this.spine.getBounds();
    const positionX =
      canvasWidth / 2 -
      (bounds.width / 2) * this.originalScale +
      this.direction;
    const positionY =
      canvasHeight / 2 - (bounds.height / 2) * this.originalScale;
    this.spine.position.set(positionX, positionY);
  }

  // Dynamically set scale
  public setScale(scale: number): void {
    const baseScale = 0.23;
    this.spine.scale.set(
      this.originalScale * scale,
      this.originalScale * scale
    );
  }

  public changeAnimation(value: string) {
    this.spine.state.setAnimation(0, value, true);
  }
}
