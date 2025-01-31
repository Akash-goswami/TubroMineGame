import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BackgroundClassProvider } from "./context/backgroundClassProvider.tsx";
import { SocketContextProvider } from "./context/socket/socketProvider.tsx";
import { SoundProvider } from "./context/soundContext.tsx";
import "./index.css";
import { MainGameProvider } from "./context/MainGameContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SocketContextProvider>
    <MainGameProvider>
      <BackgroundClassProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </BackgroundClassProvider>
    </MainGameProvider>
  </SocketContextProvider>
  // </StrictMode>,
);
