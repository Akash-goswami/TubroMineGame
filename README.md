# PumpedX Frontend

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://allproject.live/games/unity/pumpedX-frontend.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://allproject.live/games/unity/pumpedX-frontend/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name

Choose a self-explaining name for your project.

## Description

Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges

On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals

Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation

Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage

Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

<!--


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

  // private handleResize(texture: LoadedData) {
  //   const { width: canvasWidth, height: canvasHeight } =
  //     this.application.renderer;

  //   const newDesktop = Sprite.from(texture.back.desktop);

  //   // Update scale and position
  //   this.updateSpriteScaleAndPosition();

  //   // BOY RESIZE
  //   this.boy.updateScaleAndPosition(canvasWidth, canvasHeight);

  //   // GIRL RESIZE
  //   this.girl.updateScaleAndPosition(canvasWidth, canvasHeight);
  // }

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
    scaleXFactor: number = 1.31,
    scaleYFactor: number = 1.31,
    offsetX: number = -40,
    offsetY: number = -5 // its valid for greater then 500px width then need to chnage the spine element and position
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

    if (this.elapsedTime >= 1) {
      if (this.alphaState === "boy") {
        // Scale boy and bring to the top
        this.boy.setScale(1.18);
        this.boy.alpha = 1.0; // Full opacity
        this.girl.setScale(1.0);
        this.girl.alpha = 0.85; // Reduced opacity

        this.boy.zIndex = 2; // Higher index
        this.girl.zIndex = 1; // Lower index

        this.alphaState = "girl";
      } else {
        // Scale girl and bring to the top
        this.girl.setScale(1.18);
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


 -->
