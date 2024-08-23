import React from "react";
import MusicPlayerPage from "./pages/MusicPlayerPage";
import { PlayerProvider, usePlayer } from "@/context/PlayerContext";
import MobilePlayerMobile from "./components/MobilePlayerMobile";

const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { selectedAccent, isMobile } = usePlayer();

  return (
    <div
      className="flex flex-col items-center justify-center p-4 w-full mx-auto min-h-screen"
      style={{
        background: `linear-gradient(to right, ${selectedAccent}, #000000)`,
      }}
    >
      {children}
      {isMobile && <MobilePlayerMobile />}
    </div>
  );
};

function App() {
  return (
    <PlayerProvider>
      <BackgroundWrapper>
        <MusicPlayerPage />
      </BackgroundWrapper>
    </PlayerProvider>
  );
}

export default App;
