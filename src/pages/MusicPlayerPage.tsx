import Logo from "@/components/Logo";
import SongsList from "@/components/SongsList";
import MusicPlayer from "@/components/MusicPlayer";
import { usePlayer } from "@/context/PlayerContext";

const MusicPlayerPage = () => {
  const { isMobile, isMobilePlayerExpanded, showSongsList } = usePlayer();

  return (
    <div className="flex flex-col items-center justify-between w-full p-4 gap-6 lg:flex-row lg:items-start lg:p-8 lg:gap-10 mt-12 max-w-7xl">
      <div className="w-full max-w-xs lg:w-auto">
        <Logo />
      </div>
      {(!isMobile || (!isMobilePlayerExpanded && !showSongsList)) && (
        <div className="w-full max-w-md lg:max-w-md">
          <SongsList />
        </div>
      )}
      {!isMobile && (
        <div className="w-full max-w-sm lg:w-auto flex items-center justify-center mt-0 lg:mt-14">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default MusicPlayerPage;
