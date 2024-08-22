import { Progress } from "@/components/ui/progress";
import {
  Ellipsis,
  FastForward,
  Play,
  Rewind,
  Volume2,
  Pause,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    audioRef,
    previousTrack,
    nextTrack,
  } = usePlayer();
  const [progressValue, setProgressValue] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const progressBarWidth = rect.width;
      const clickPercentage = clickPosition / progressBarWidth;
      const newTime = clickPercentage * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgressValue(progress);
      }
    };

    audioRef.current?.addEventListener("timeupdate", updateProgress);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioRef]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="hidden md:flex flex-col items-center justify-between gap-4 sm:gap-7 w-full max-w-sm mx-auto p-4">
      <div className="flex flex-col items-center sm:items-start justify-start gap-2 w-full">
        <p className="text-white text-xl sm:text-2xl font-bold">
          {currentTrack.name}
        </p>
        <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={`https://cms.samespace.com/assets/${currentTrack.cover}`}
          alt="cover"
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-lg"
        />
      </div>
      <div
        className="w-full"
        ref={progressBarRef}
        onClick={handleProgressBarClick}
      >
        <Progress
          value={progressValue}
          className="w-full h-1 rounded-2xl bg-[#231F1B] cursor-pointer"
          color="white"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="bg-[#231F1B] rounded-full p-1 sm:p-2">
          <Ellipsis className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex flex-row justify-between items-center gap-4 sm:gap-6">
          <Rewind
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D9B9A]"
            fill="#9D9B9A"
            onClick={previousTrack}
          />
          <div
            className="rounded-full p-1 sm:p-2 bg-white cursor-pointer"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause
                className="w-5 h-5 text-black cursor-pointer"
                fill="black"
              />
            ) : (
              <Play
                className="w-5 h-5 text-black cursor-pointer"
                fill="black"
              />
            )}
          </div>
          <FastForward
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D9B9A]"
            fill="#9D9A9A"
            onClick={nextTrack}
          />
        </div>
        <div
          className="bg-[#231F1B] rounded-full p-1 sm:p-2 cursor-pointer"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
