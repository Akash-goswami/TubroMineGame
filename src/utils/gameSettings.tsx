import { Howl, Howler } from "howler";
import TileClick from "../sound/click_forTile.mp3"
import BlueDimond from "../sound/blue_dimond.mp3"
import GreenDimond from "../sound/green_dimond.mp3"
import GoldDimond from "../sound/gold_dimond.mp3"
import BombBlast from "../sound/bomb_open.mp3"

// let toggleSound: Howl | null;
// let girlLetsGo: Howl | null;
// let boyLetsGo: Howl | null;
// let girlPumpIt: Howl | null;
// let boyPumpIt: Howl | null;
// let tryAgain: Howl | null;
// let blueWin: Howl | null;
let tileClick: Howl | null;
let blueDimond: Howl | null;
let greenDimond: Howl | null;
let goldDimond: Howl | null;
let bombBlast: Howl | null;
// let greenWin: Howl | null;
// let yellowWin: Howl | null;
// let firstPull: Howl | null;
// let secoundPull: Howl | null;
// let thirdPull: Howl | null;
// let sound: boolean = true;
let gameVolume: number = 1;

export function loadSounds(): void {
  tileClick = new Howl({
    src: [TileClick],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("tileClick Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("tileClick Sound Play Error:", error);
    },
  });
  blueDimond = new Howl({
    src: [BlueDimond],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("blueDimond Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("blueDimond Sound Play Error:", error);
    },
  });
  greenDimond = new Howl({
    src: [GreenDimond],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("greenDimond Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("greenDimond Sound Play Error:", error);
    },
  });
  goldDimond = new Howl({
    src: [GoldDimond],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("goldDimond Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("goldDimond Sound Play Error:", error);
    },
  });
  bombBlast = new Howl({
    src: [BombBlast],
    html5: false,
    volume: gameVolume,
    loop: false,
    onloaderror: (error) => {
      console.error("bombBlast Sound Load Error:", error);
    },
    onload: () => {},
    onplayerror: (error) => {
      console.error("bombBlast Sound Play Error:", error);
    },
  });
}
export function tileClickSound() {
  if (tileClick && !tileClick.playing()) {
    tileClick.play(); // Stop the sound
  }
}
export function blueDimondSound() {
  if (blueDimond && !blueDimond.playing()) {
    blueDimond.play(); // Stop the sound
  }
}
export function GreenDimondSound() {
  if (greenDimond && !greenDimond.playing()) {
    greenDimond.play(); // Stop the sound
  }
}
export function GoldDimondSound() {
  if (goldDimond && !goldDimond.playing()) {
    goldDimond.play(); // Stop the sound
  }
}
export function BombBlastSound() {
  if (bombBlast && !bombBlast.playing()) {
    bombBlast.play(); // Stop the sound
  }
}


// export function stopAllPullSound() {
//   if (firstPull && firstPull.playing()) {
//     firstPull.stop(); // Stop the sound
//   }

//   if (secoundPull && secoundPull.playing()) {
//     secoundPull.stop(); // Stop the sound
//   }

//   if (thirdPull && thirdPull.playing()) {
//     thirdPull.stop(); // Stop the sound
//   }
// }

// export function playSound(): void {
//   if (sound) {
//     toggleSound?.mute(false);
//   }
// }

// export function pauseSound(): void {
//   toggleSound?.mute(false);
// }

export function setMuted(muted: boolean): void {
  Howler.mute(muted);
}

export function setVolume(volume: number): void {
  Howler.volume(volume); // Sets global volume (range 0 to 1)
}

export function getVolume(): number {
  return Howler.volume(); // Returns current global volume
}

// Initialize sounds on import
loadSounds();
