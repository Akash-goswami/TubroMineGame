import { TextureAtlas } from "pixi-spine";
import { Application, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { useBackground } from "../../context/backgroundClassProvider";
import { loadAssets } from "../../utils/load_textue";
import { BackGround } from "./background/background";

export interface SpineData {
  spineAtlas: TextureAtlas;
  spineData: any;
}

export interface backs {
  desktop: Texture;
  lg_mob: Texture;
  md_mob: Texture;
  sm_mob: Texture;
}

export interface background {
  land: SpineData;
  portrait: SpineData;
}

export interface LoadedData {
  background: background;
  characters: SpineData;
  back: backs;
}

interface canvasProps {
  setCurrentPlayer: (value: string) => void;
  currentPlayer: string;
}

const Canvas = ({ setCurrentPlayer }: canvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<Application | null>(null);

  const { setBackgroundClass } = useBackground();

  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState<Texture>();

  useEffect(() => {
    const fetchTexture = async () => {
      const data = await loadAssets();
      if (data) {
        // @ts-ignore
        setTextures(data);
        setIsLoading(false);
      }
    };

    fetchTexture();
    const setSize = () => {
      appRef.current?.renderer.resize(
        window.innerWidth,
        window.innerHeight - 60
      );
    };
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  const initializeGame = (texture: any) => {
    if (texture) {
      const app = new Application({
        view: canvasRef.current!,
        resizeTo: document.getElementsByClassName("game")[0] as HTMLElement,
      });

      // @ts-ignore
      globalThis.__PIXI_APP__ = app;

      appRef.current = app;

      const background = new BackGround(app, texture, setCurrentPlayer);
      setBackgroundClass(background);

      // const boy = new Boy(app, texture);

      app.stage.addChild(background);

      // app.stage.addChild(boy);
    }
  };

  useEffect(() => {
    if (!isLoading && textures) {
      console.log("Re-render");

      console.log(textures);
      initializeGame(textures);
    }
  }, [textures]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        background: "black",
      }}
    />
  );
};

export default Canvas;
