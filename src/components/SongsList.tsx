import React, { useState } from "react";
import { Button } from "./ui/button";
import { data } from "@/api/data";
import { Input } from "./ui/input";
import "../App.css";

const SongsList = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const handleSongClick = (songId: string) => {
    if (selectedSong === songId) {
      setSelectedSong(null); 
    } else {
      setSelectedSong(songId);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto text-white p-4 rounded-lg flex flex-col">
      <div className="sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("for-you")}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-lg hover:bg-transparent hover:text-white ${
                activeTab === "for-you" ? "text-white" : "text-gray-400"
              }`}
            >
              For You
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("top-tracks")}
              className={`px-2 sm:px-4 py-2 text-sm sm:text-lg hover:bg-transparent hover:text-white ${
                activeTab === "top-tracks" ? "text-white" : "text-gray-400"
              }`}
            >
              Top Tracks
            </Button>
          </div>
        </div>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search Song, Artist"
            className="bg-[#59123F] text-gray-400 px-4 py-2 pr-10 rounded-md outline-none w-full shadow-sm"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow">
        <div className="space-y-4">
          {data
            .filter((track) => activeTab === "for-you" || track.top_track)
            .map((track) => (
              <div
                key={track.id}
                onClick={() => handleSongClick(track.id.toString())}
                className={`flex items-center justify-between rounded-md cursor-pointer p-2 ${
                  selectedSong === track.id.toString()
                    ? "bg-[#59123fe4]"
                    : "hover:bg-[#59123fe4]"
                }`}
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
                <p className="text-gray-400 text-xs sm:text-sm">4.55</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SongsList;