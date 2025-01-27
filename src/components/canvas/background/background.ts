import { gsap } from "gsap";
import { Spine } from "pixi-spine";
import { Application, Container, Sprite, Ticker } from "pixi.js";
import { LoadedData } from "../canvas";
import { Boy } from "../character/boy";
import { Girl } from "../character/girl";

export function debounce(func: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export class BackGround extends Container {
  private application: Application;
  private desktop: Sprite;
  private boy: Boy;
  private girl: Girl;
  private spine: Spine;

  public alphaState: "boy" | "girl";
  private ticker: Ticker;
  private elapsedTime: number;

  private initialBoyScale: number = 1;
  private initialGirlScale: number = 1;

  private setCurrentPlayer: (value: string) => void;

  constructor(
    app: Application,
    texture: LoadedData,
    setCurrentPlayer: (value: string) => void
  ) {
    super();
    this.application = app;
    this.setCurrentPlayer = setCurrentPlayer;

    // Enable sorting by zIndex
    this.sortableChildren = true;

    // SPRITE SHEET FOR BACK_GROUND
    // this.desktop = Sprite.from(texture.back.desktop);

    // this.spine = new Spine(texture.background.land.spineData);
    // this.spine.autoUpdate = true;
    // this.spine.state.setAnimation(0, "animation", true);

    // Initialize characters
    this.boy = new Boy(app, texture);
    this.girl = new Girl(app, texture);

    const { width: canvasWidth } = this.application.renderer;
    this.desktop =
      canvasWidth < 500
        ? Sprite.from(texture.back.md_mob)
        : Sprite.from(texture.back.desktop);

    // Initialize spine based on screen width
    this.spine = new Spine(
      canvasWidth < 500
        ? texture.background.portrait.spineData
        : texture.background.land.spineData
    );

    this.spine.autoUpdate = true;
    this.spine.state.setAnimation(0, "animation", true);

    // Scale and position the sprite
    this.handleResize(texture);
    if (canvasWidth < 500) {
      this.updateSpriteScaleAndPositionSM();
    } else {
      this.updateSpriteScaleAndPosition();
    }

    // Add the sprite to the container
    this.addChild(this.desktop);
    this.addChild(this.spine);
    this.addChild(this.boy);
    this.addChild(this.girl);

    this.boy.zIndex = 1; // Boy starts above the background
    this.girl.zIndex = 1; // Same as boy initially

    // Store the initial scale of Boy and Girl before any animation happens
    this.initialBoyScale = this.boy.scale.x;
    this.initialGirlScale = this.girl.scale.x;

    // Enable interaction for both characters
    this.enableInteraction();

    // // Call scale function
    // this.scaleSpineFunc = this.scaleSpine.bind(this, app);
    // // @ts-ignore
    // this.scaleSpineFunc();

    this.alphaState = "boy"; // Start with boy
    this.elapsedTime = 0;

    // Initialize the ticker for scale animation
    this.ticker = Ticker.shared;
    this.ticker.add(this.animateScale.bind(this));

    // Listen to resize events
    window.addEventListener(
      "resize",
      debounce(() => this.handleResize(texture), 100)
    );
  }

  public getAlphaState(): "boy" | "girl" {
    return this.alphaState;
  }

  public changeAnimation(chacrater: string, value: string) {
    if (chacrater === "boy") this.boy.changeAnimation(value);

    if (chacrater === "girl") this.girl.changeAnimation(value);
  }

  public switchCharacter(character: "boy" | "girl") {
    if (character === "boy") {
      if (this.children.includes(this.girl)) {
        this.removeChild(this.girl);
      }
      if (!this.children.includes(this.boy)) {
        this.addChild(this.boy);
      }

      this.boy.setScale(this.initialBoyScale);
      this.girl.setScale(this.initialGirlScale);

      this.boy.alpha = 1.0;
      this.boy.zIndex = 2;
      this.boy.x = this.girl.x + 80;
      this.boy.changeAnimation("idle");

      this.girl.alpha = 0.85;
      this.girl.zIndex = 1;

      this.alphaState = "boy";
      this.sortChildren();
    } else if (character === "girl") {
      if (this.children.includes(this.boy)) {
        this.removeChild(this.boy);
      }
      if (!this.children.includes(this.girl)) {
        this.addChild(this.girl);
      }

      this.girl.setScale(this.initialGirlScale);
      this.boy.setScale(this.initialBoyScale);

      this.girl.alpha = 1.0;
      this.girl.zIndex = 2;
      this.girl.x = this.boy.x - 80;
      this.girl.changeAnimation("idle");

      this.boy.alpha = 0.85;
      this.boy.zIndex = 1;

      this.alphaState = "girl";
      this.sortChildren();
    }

    this.setCurrentPlayer(character.toLowerCase());
  }

  private handleResize(texture: LoadedData) {
    const { width: canvasWidth, height: canvasHeight } =
      this.application.renderer;

    // Check if screen width is less than 500px and update desktop sprite
    const newDesktop =
      canvasWidth < 500
        ? Sprite.from(texture.back.sm_mob)
        : Sprite.from(texture.back.desktop);

    if (this.desktop.texture !== newDesktop.texture) {
      this.removeChild(this.desktop);
      this.desktop = newDesktop;
      this.addChildAt(this.desktop, 0); // Ensure it is behind other elements
    }

    // Update spine based on screen width
    const newSpineData =
      canvasWidth < 500
        ? texture.background.portrait.spineData
        : texture.background.land.spineData;

    this.changeSpine(newSpineData);

    // Update scale and position

    if (canvasWidth < 500) {
      this.updateSpriteScaleAndPositionSM();
    } else {
      this.updateSpriteScaleAndPosition();
    }
    // BOY RESIZE
    this.boy.updateScaleAndPosition(canvasWidth, canvasHeight);

    // GIRL RESIZE
    this.girl.updateScaleAndPosition(canvasWidth, canvasHeight);
  }

  private changeSpine(newSpineData: any): void {
    // Remove the current spine if it exists
    if (this.spine && this.spine.parent) {
      this.removeChild(this.spine);
    }

    // Create a new Spine object with the new data
    this.spine = new Spine(newSpineData);
    this.spine.autoUpdate = true;

    // Set animation for the new spine
    this.spine.state.setAnimation(0, "animation", true);

    // Re-add the spine to the container
    this.addChild(this.spine);

    // Update its scale and position
    this.updateSpriteScaleAndPosition();
  }

  private updateSpriteScaleAndPositionSM(): void {
    const { width: canvasWidth, height: canvasHeight } =
      this.application.renderer;

    // Determine scale factors
    const scaleX = canvasWidth / this.desktop.texture.width;
    const scaleY = canvasHeight / this.desktop.texture.height;

    // Use the larger scale to ensure the sprite covers the entire canvas
    const scale = Math.max(scaleX, scaleY);

    // Apply the scale to the sprite
    this.desktop.scale.set(scale);
    this.spine.scale.set(scale * 0.75);

    // Center the sprite in the canvas
    this.desktop.x = (canvasWidth - this.desktop.width) / 2;
    this.desktop.y = (canvasHeight - this.desktop.height) / 2;
    this.spine.x = (canvasWidth - this.desktop.width) / 2 - 20;
    this.spine.y = (canvasHeight - this.desktop.height) / 2 - 100;
  }

  private updateSpriteScaleAndPosition(
    scaleXFactor: number = 1.125,
    scaleYFactor: number = 1.125,
    offsetX: number = -40,
    offsetY: number = -0 // its valid for greater then 500px width then need to chnage the spine element and position
  ): void {
    const { width: canvasWidth, height: canvasHeight } =
      this.application.renderer;

    // Determine base scale factors
    const baseScaleX = canvasWidth / this.desktop.texture.width;
    const baseScaleY = canvasHeight / this.desktop.texture.height;

    // Apply custom scaling factors for x and y axes
    const scaledX = baseScaleX * scaleXFactor;
    const scaledY = baseScaleY * scaleYFactor;

    // Use the larger scale to ensure the sprite overflows both dimensions
    const finalScale = Math.max(scaledX, scaledY);

    // Apply the calculated scale to the desktop and spine
    this.desktop.scale.set(finalScale, finalScale);
    this.spine.scale.set(finalScale, finalScale);

    // Center the desktop image in the canvas
    this.desktop.x = (canvasWidth - this.desktop.width) / 2;
    this.desktop.y = (canvasHeight - this.desktop.height) / 2;

    // Adjust spine position with offsets
    this.spine.x = (canvasWidth - this.desktop.width) / 2 + offsetX;
    this.spine.y = (canvasHeight - this.desktop.height) / 2 + offsetY;
  }

  // private updateSpriteScaleAndPosition(): void {
  //   const { width: canvasWidth, height: canvasHeight } =
  //     this.application.renderer;

  //   // Determine scale factors
  //   const scaleX = canvasWidth / this.desktop.texture.width;
  //   const scaleY = canvasHeight / this.desktop.texture.height;

  //   // Use the larger scale to ensure the sprite covers the entire canvas
  //   const scale = Math.max(scaleX, scaleY);

  //   // Apply the scale to the sprite
  //   this.desktop.scale.set(scale);
  //   this.spine.scale.set(scale);

  //   // Center the sprite in the canvas
  //   this.desktop.x = (canvasWidth - this.desktop.width) / 2;
  //   this.desktop.y = (canvasHeight - this.desktop.height) / 2;
  //   this.spine.x = (canvasWidth - this.desktop.width) / 2;
  //   this.spine.y = (canvasHeight - this.desktop.height) / 2;
  // }

  private enableInteraction() {
    // Enable interaction on Boy
    this.boy.interactive = true;
    this.boy.cursor = "pointer";
    this.boy.on("pointerdown", () => this.handleClick("boy"));

    // Enable interaction on Girl
    this.girl.interactive = true;
    this.girl.cursor = "pointer";
    this.girl.on("pointerdown", () => this.handleClick("girl"));
  }

  private handleClick(selected: "boy" | "girl") {
    const { width: canvasWidth } = this.application.renderer;

    if (selected === "boy") {
      if (this.children.includes(this.girl)) {
        this.removeChild(this.girl);
        this.boy.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      // Reset scales
      this.boy.setScale(this.initialBoyScale); // Use stored initial scale
      this.girl.setScale(this.initialGirlScale); // Reset girl even if removed

      this.boy.changeAnimation("idle");
      gsap.to(this.boy, {
        x: this.boy.x + 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.boy.interactive = false;
      this.girl.interactive = false;
    } else if (selected === "girl") {
      if (this.children.includes(this.boy)) {
        this.removeChild(this.boy);
        this.girl.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      // Reset scales
      this.girl.setScale(this.initialGirlScale);
      this.boy.setScale(this.initialBoyScale);

      this.girl.changeAnimation("idle");

      gsap.to(this.girl, {
        x: this.girl.x - 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.girl.interactive = false;
      this.boy.interactive = false;
    }

    this.setCurrentPlayer(selected.toString().toLowerCase());
  }

  private animateScale(delta: number) {
    this.elapsedTime += delta / 60;

    if (
      !this.children.includes(this.boy) ||
      !this.children.includes(this.girl)
    ) {
      // Stop scaling if one of the spines is missing
      Ticker.shared.remove(this.animateScale);
      return;
    }

    if (this.elapsedTime >= 1.8) {
      if (this.alphaState === "boy") {
        // Scale boy and bring to the top
        this.boy.setScale(1.18);
        // this.boy.alpha = 1.0; // Full opacity
        this.boy.changeAnimation("glitch"); // Apply glitch animation
        this.girl.setScale(1.0);
        // this.girl.alpha = 0.85; // Reduced opacity
        // this.girl.changeAnimation("idle"); // Reset to idle animation
        this.girl.changeAnimation("inactive");

        this.boy.zIndex = 2; // Higher index
        this.girl.zIndex = 1; // Lower index

        this.alphaState = "girl";
      } else {
        // Scale girl and bring to the top
        this.girl.setScale(1.18);
        // this.girl.alpha = 1.0;
        this.girl.changeAnimation("glitch");
        this.boy.setScale(1.0);
        // this.boy.alpha = 0.85;
        // this.boy.changeAnimation("idle");
        this.boy.changeAnimation("inactive");

        this.girl.zIndex = 2;
        this.boy.zIndex = 1;

        this.alphaState = "boy";
      }

      // Sort children to apply the updated zIndex
      this.sortChildren();

      this.elapsedTime = 0;
    }
  }

  public getCharacter() {
    // Check which character has the larger scale
    const boyScale = this.boy.scale.x; // Assuming uniform scaling (x = y)
    const girlScale = this.girl.scale.x;

    // Determine the current dominant character
    if (
      boyScale > girlScale ||
      (boyScale === girlScale && this.boy.zIndex > this.girl.zIndex)
    ) {
      // Remove Girl if it exists
      if (this.children.includes(this.girl)) {
        this.removeChild(this.girl);
        this.boy.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      this.boy.setScale(1);
      this.boy.changeAnimation("1_easy");

      gsap.to(this.boy, {
        x: this.boy.x + 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.boy.interactive = false;
      this.girl.interactive = false;
      this.setCurrentPlayer("boy");
    } else {
      // Remove Boy if it exists
      if (this.children.includes(this.boy)) {
        this.removeChild(this.boy);
        this.girl.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      this.girl.setScale(1);
      this.girl.changeAnimation("1_easy");

      gsap.to(this.girl, {
        x: this.girl.x - 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.girl.interactive = false;
      this.boy.interactive = false;
      this.setCurrentPlayer("girl");
    }
  }
}
