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

  private alphaState: "boy" | "girl";
  private ticker: Ticker;
  private elapsedTime: number;

  private initialBoyScale: number = 1;
  private initialGirlScale: number = 1;

  constructor(app: Application, texture: LoadedData) {
    super();
    this.application = app;

    // Enable sorting by zIndex
    this.sortableChildren = true;

    // SPRITE SHEET FOR BACK_GROUND
    this.desktop = Sprite.from(texture.back.desktop);

    this.spine = new Spine(texture.background.land.spineData);
    this.spine.autoUpdate = true;
    this.spine.state.setAnimation(0, "animation", true);

    // Initialize characters
    this.boy = new Boy(app, texture);
    this.girl = new Girl(app, texture);

    // Scale and position the sprite
    this.updateSpriteScaleAndPosition();

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

  private handleResize(texture: LoadedData) {
    const { width: canvasWidth, height: canvasHeight } =
      this.application.renderer;

    // Check for small screen size
    // if (canvasWidth <= 730) {
    //   const newDesktop = Sprite.from(texture.back.sm_mob);

    //   // Replace the current desktop sprite
    //   this.replaceDesktopSprite(newDesktop);
    // } else {
    const newDesktop = Sprite.from(texture.back.desktop);

    // Replace the current desktop sprite
    // this.replaceDesktopSprite(newDesktop);
    // }

    // Update scale and position
    this.updateSpriteScaleAndPosition();

    // BOY RESIZE
    this.boy.updateScaleAndPosition(canvasWidth, canvasHeight);

    // GIRL RESIZE
    this.girl.updateScaleAndPosition(canvasWidth, canvasHeight);
  }

  private replaceDesktopSprite() {
    // Remove the current desktop sprite
    // if (this.desktop.parent) {
    //   this.removeChild(this.desktop);
    // }
    // // Set the new sprite as the desktop and add it to the container
    // this.desktop = newSprite;
    // this.desktop.zIndex = 0; // Ensure it stays behind other elements
    // this.addChildAt(this.desktop, 0); // Add at the lowest index
  }

  private updateSpriteScaleAndPosition(): void {
    const { width: canvasWidth, height: canvasHeight } =
      this.application.renderer;

    // Determine scale factors
    const scaleX = canvasWidth / this.desktop.texture.width;
    const scaleY = canvasHeight / this.desktop.texture.height;

    // Use the larger scale to ensure the sprite covers the entire canvas
    const scale = Math.max(scaleX, scaleY);

    // Apply the scale to the sprite
    this.desktop.scale.set(scale);
    this.spine.scale.set(scale);

    // Center the sprite in the canvas
    this.desktop.x = (canvasWidth - this.desktop.width) / 2;
    this.desktop.y = (canvasHeight - this.desktop.height) / 2;
    this.spine.x = (canvasWidth - this.desktop.width) / 2;
    this.spine.y = (canvasHeight - this.desktop.height) / 2;
  }

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
    if (selected === "boy") {
      // Remove Girl if it exists
      if (this.children.includes(this.girl)) {
        this.removeChild(this.girl);
        this.boy.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      this.boy.setScale(1);

      gsap.to(this.boy, {
        x: this.boy.x + 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.boy.interactive = false;
    } else if (selected === "girl") {
      // Remove Boy if it exists
      if (this.children.includes(this.boy)) {
        this.removeChild(this.boy);
        this.girl.alpha = 1.0;
        Ticker.shared.remove(this.animateScale);
      }

      // Reset Girl's scale to the original scale before ticker started
      this.girl.setScale(1); // Reset to 1, but it'll maintain the original scale internally

      gsap.to(this.girl, {
        x: this.girl.x - 40,
        duration: 1.0,
        ease: "power2.out",
      });

      this.girl.interactive = false;
    }
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

    if (this.elapsedTime >= 1) {
      if (this.alphaState === "boy") {
        // Scale boy and bring to the top
        this.boy.setScale(1.3);
        this.boy.alpha = 1.0; // Full opacity
        this.girl.setScale(1.0);
        this.girl.alpha = 0.85; // Reduced opacity

        this.boy.zIndex = 2; // Higher index
        this.girl.zIndex = 1; // Lower index

        this.alphaState = "girl";
      } else {
        // Scale girl and bring to the top
        this.girl.setScale(1.3);
        this.girl.alpha = 1.0;

        this.boy.setScale(1.0);
        this.boy.alpha = 0.85;

        this.girl.zIndex = 2;
        this.boy.zIndex = 1;

        this.alphaState = "boy";
      }

      // Sort children to apply the updated zIndex
      this.sortChildren();

      this.elapsedTime = 0;
    }
  }
}
