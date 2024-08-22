/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { Track, fetchMusic } from "@/api/fetchMusic";

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

  useEffect(() => {
    const storedMusicData = localStorage.getItem("musicData");
    if (storedMusicData) {
      const parsedData = JSON.parse(storedMusicData);
      console.log("Stored data:", parsedData);
      setTracks(parsedData.data || []);
    } else {
      fetchMusic().then((data) => {
        console.log("Fetched data:", data);
        setTracks(data.data || []);
        localStorage.setItem("musicData", JSON.stringify(data));
      });
    }
  }, []);

  console.log("Tracks in context:", tracks);

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
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
