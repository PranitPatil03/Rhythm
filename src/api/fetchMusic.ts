import axios from "axios";

export interface Track {
  id: number;
  status: string;
  sort: null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
}

export const fetchMusic = async () => {
  try {
    const response = await axios.get("https://cms.samespace.com/items/songs");
    const musicData = response.data;
    localStorage.setItem("musicData", JSON.stringify(musicData));
    return musicData;
  } catch (error) {
    console.error("Error fetching music:", error);
    return [];
  }
};
