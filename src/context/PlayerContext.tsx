import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Track, fetchMusic } from "@/api/fetchMusic";
import { useMediaQuery } from "react-responsive";

interface PlayerContextType {
  tracks: Track[];
  currentTrack: Track | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track | null>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedAccent: string;
  setSelectedAccent: React.Dispatch<React.SetStateAction<string>>;
  hoveredTrackId: number | null;
  setHoveredTrackId: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  togglePlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  previousTrack: () => void;
  nextTrack: () => void;
  isMobile: boolean;
  isMobilePlayerExpanded: boolean;
  setIsMobilePlayerExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  showSongsList: boolean;
  setShowSongsList: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [activeTab, setActiveTab] = useState("for-you");
  const [selectedAccent, setSelectedAccent] = useState("#59123F");
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMobilePlayerExpanded, setIsMobilePlayerExpanded] = useState(false);
  const [showSongsList, setShowSongsList] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const storedMusicData = localStorage.getItem("musicData");
    if (storedMusicData) {
      const parsedData = JSON.parse(storedMusicData);
      setTracks(parsedData.data || []);
    } else {
      fetchMusic().then((data) => {
        setTracks(data.data || []);
        localStorage.setItem("musicData", JSON.stringify(data));
      });
    }
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const previousTrack = () => {
    if (tracks.length === 0 || !currentTrack) return;
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[previousIndex]);
    setSelectedAccent(tracks[previousIndex].accent);
  };

  const nextTrack = () => {
    if (tracks.length === 0 || !currentTrack) return;
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setSelectedAccent(tracks[nextIndex].accent);
  };

  const value = {
    tracks,
    currentTrack,
    setCurrentTrack,
    activeTab,
    setActiveTab,
    selectedAccent,
    setSelectedAccent,
    hoveredTrackId,
    setHoveredTrackId,
    isPlaying,
    togglePlayPause,
    audioRef,
    previousTrack,
    nextTrack,
    isMobile,
    isMobilePlayerExpanded,
    setIsMobilePlayerExpanded,
    showSongsList,
    setShowSongsList,
  };

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
