import React, { createContext, useContext, useEffect, useState } from "react";
import { setVolume } from "../utils/gameSettings";

interface SoundProviderProps {
  children: React.ReactNode;
}

interface SoundContextProps {
  sound: boolean;
  setSound: (value: boolean) => void;
  volume: number;
  setVolumeLevel: (value: number) => void;
  toggleMute: () => void;
}

export const SoundContext = createContext<SoundContextProps | undefined>(
  undefined
);

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [sound, setSound] = useState<boolean>(
    JSON.parse( "true")
  );

  const [volume, setVolumeLevel] = useState<number>(
    JSON.parse("1")
  );

  const [previousVolume, setPreviousVolume] = useState<number>(volume);

  // useEffect(() => {
  //   if (sound) {
  //     playSound();
  //   } else {
  //     pauseSound();
  //   }
  // }, [sound]);

  useEffect(() => {
    localStorage.setItem("sound", JSON.stringify(sound));
  }, [sound]);

  useEffect(() => {
    setVolume(volume); // Assuming setVolume adjusts the sound level in your utils
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  const toggleMute = () => {
    if (sound) {
      setPreviousVolume(volume); // Save current volume
      setSound(false);
      setVolumeLevel(0);
    } else {
      setSound(true);
      setVolumeLevel(previousVolume || 1); // Restore saved volume
    }
  };

  return (
    <SoundContext.Provider
      value={{ sound, setSound, volume, setVolumeLevel, toggleMute }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
