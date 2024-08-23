import { usePlayer } from "@/context/PlayerContext";
import MusicPlayer from "./MusicPlayer";
import { ChevronDown, List, Play, Pause } from "lucide-react";
import SongsList from "./SongsList";

const MobilePlayerMobile = () => {
  const {
    isMobilePlayerExpanded,
    setIsMobilePlayerExpanded,
    currentTrack,
    isPlaying,
    togglePlayPause,
    showSongsList,
    setShowSongsList,
  } = usePlayer();

  if (!currentTrack) return null;

  const handleToggleSongsList = () => {
    setShowSongsList(!showSongsList);
    setIsMobilePlayerExpanded(false);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ease-in-out bg-background-color ${
        isMobilePlayerExpanded ? "h-full" : "h-20"
      }`}
    >
      {isMobilePlayerExpanded ? (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => setIsMobilePlayerExpanded(false)}
              className="text-white"
            >
              <ChevronDown size={24} />
            </button>
            <button onClick={handleToggleSongsList} className="text-white">
              <List size={24} />
            </button>
          </div>
          <MusicPlayer />
        </div>
      ) : (
        <div className="h-full flex items-center justify-between px-4">
          <div
            className="flex items-center flex-1"
            onClick={() => setIsMobilePlayerExpanded(true)}
          >
            <img
              src={`https://cms.samespace.com/assets/${currentTrack.cover}`}
              alt={currentTrack.name}
              className="w-12 h-12 rounded-md mr-3"
            />
            <div>
              <h3 className="text-white font-medium">{currentTrack.name}</h3>
              <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
            </div>
          </div>
          <button onClick={togglePlayPause} className="text-white ml-4">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      )}
      {showSongsList && (
        <div className="fixed inset-0 bg-background-color z-50 overflow-y-auto">
          <div className="p-4">
            <button onClick={handleToggleSongsList} className="text-white mb-4">
              <ChevronDown size={24} />
            </button>
            <SongsList />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePlayerMobile;
