import { Assets, settings, SCALE_MODES } from "pixi.js";

export const loadAssets = async () => {
  settings.SCALE_MODE = SCALE_MODES.LINEAR;
  if (settings.RENDER_OPTIONS) {
    settings.RENDER_OPTIONS.antialias = true;
  }
  try {
    await Assets.load([
      "/assets/bg_landscape/bg_landscape.json",
      "/assets/bg_portrait/bg_portrait.json",
      "/assets/characters/character.json",
      "/assets/back/desktop.webp",
      "/assets/back/lg_mob.webp",
      "/assets/back/md_mob.webp",
      "/assets/back/sm_mob.webp",
    ]);

    console.log("Assets loaded successfully");

    const loadedTextures = {
      background: {
        land: Assets.cache.get("/assets/bg_landscape/bg_landscape.json"),
        portrait: Assets.cache.get("/assets/bg_portrait/bg_portrait.json"),
      },
      characters: Assets.cache.get("/assets/characters/character.json"),
      back: {
        desktop: Assets.cache.get("/assets/back/desktop.webp"),
        lg_mob: Assets.cache.get("/assets/back/lg_mob.webp"),
        md_mob: Assets.cache.get("/assets/back/md_mob.webp"),
        sm_mob: Assets.cache.get("/assets/back/sm_mob.webp"),
      },
    };

    return loadedTextures;
  } catch (error) {
    console.log("Error while loading assets", error);
  }
};
