import { cover } from "@/assets";

import { Progress } from "@/components/ui/progress";
import {
  Ellipsis,
  FastForward,
  Play,
  Rewind,
  Volume2,
} from "lucide-react";

const MusicPlayer = () => {
  return (
    <div className="">
      <div className="">
        <p className="">Viva La Vida</p>
        <p className="">Coldplay</p>
      </div>
      <div className="">
        <img src={cover} alt="cover" className="w-96 h-96 object-cover" />
      </div>
      <div className="">
        <Progress value={60} className="w-full h-1 mt-3 rounded-2xl" />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="bg-white rounded-full p-1">
          <Ellipsis />
        </div>

        <div className="flex flex-row justify-between items-center">
          <Rewind />
          <Play />
          <FastForward />
        </div>
        <div className="bg-white rounded-full p-1">
          <Volume2 />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
