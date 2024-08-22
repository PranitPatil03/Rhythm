import "../App.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Track } from "@/api/fetchMusic";
import { usePlayer } from "@/context/PlayerContext";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const SongsList = () => {
  const {
    tracks,
    currentTrack,
    setCurrentTrack,
    activeTab,
    setActiveTab,
    selectedAccent,
    setSelectedAccent,
    hoveredTrackId,
    setHoveredTrackId,
  } = usePlayer();

  const handleSongClick = (song: Track) => {
    setCurrentTrack(currentTrack?.id === song.id ? null : song);
    setSelectedAccent(song.accent);
  };

  const [durations, setDurations] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadDurations = async () => {
      const newDurations: { [key: string]: number } = {};
      for (const track of tracks) {
        const duration = await getDuration(track.url);
        newDurations[track.id] = duration;
      }
      setDurations(newDurations);
    };

    loadDurations();
  }, [tracks]);

  const getDuration = (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        resolve(audio.duration);
      };
    });
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-[400px] mx-auto text-white p-4 rounded-lg flex flex-col">
      <div className="sticky top-0 z-10 pb-4">
        <div className="flex space-x-2 sm:space-x-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("for-you")}
            className={`px-2 sm:px-4 py-2 text-sm sm:text-base hover:bg-transparent hover:text-white ${
              activeTab === "for-you" ? "text-white" : "text-gray-400"
            }`}
          >
            For You
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("top-tracks")}
            className={`px-2 sm:px-4 py-2 text-sm sm:text-base hover:bg-transparent hover:text-white ${
              activeTab === "top-tracks" ? "text-white" : "text-gray-400"
            }`}
          >
            Top Tracks
          </Button>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search Song, Artist"
            style={{ backgroundColor: selectedAccent }}
            className="text-gray-400 px-4 py-2 pr-10 rounded-md outline-none w-full shadow-sm"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        <div className="space-y-4">
          {tracks.length > 0 ? (
            tracks
              .filter((track) => activeTab === "for-you" || track.top_track)
              .map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleSongClick(track)}
                  onMouseEnter={() => setHoveredTrackId(track.id)}
                  onMouseLeave={() => setHoveredTrackId(null)}
                  style={{
                    backgroundColor:
                      currentTrack?.id === track.id ||
                      hoveredTrackId === track.id
                        ? selectedAccent
                        : "transparent",
                    transition: "background-color 0.3s",
                  }}
                  className="flex items-center justify-between rounded-md cursor-pointer p-2"
                >
                  <div className="flex items-center">
                    <img
                      src={`https://cms.samespace.com/assets/${track.cover}`}
                      alt={track.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-medium">
                        {track.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm">
                    {durations[track.id]
                      ? formatDuration(durations[track.id])
                      : "..."}
                  </span>
                </div>
              ))
          ) : (
            <p>No tracks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongsList;
