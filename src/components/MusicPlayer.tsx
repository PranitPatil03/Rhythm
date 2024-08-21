import { cover } from "@/assets";

import { Progress } from "@/components/ui/progress";
import { Ellipsis, FastForward, Play, Rewind, Volume2 } from "lucide-react";

const MusicPlayer = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-between gap-4 sm:gap-7 w-full max-w-sm mx-auto p-4">
      <div className="flex flex-col items-center sm:items-start justify-start gap-2 w-full">
        <p className="text-white text-xl sm:text-2xl font-bold">Viva La Vida</p>
        <p className="text-gray-400 text-sm">Coldplay</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={cover}
          alt="cover"
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-lg"
        />
      </div>
      <div className="w-full">
        <Progress
          value={60}
          className="w-full h-1 rounded-2xl bg-[#231F1B]"
          color="white"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="bg-[#231F1B] rounded-full p-1 sm:p-2">
          <Ellipsis className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        <div className="flex flex-row justify-between items-center gap-4 sm:gap-6 ">
          <Rewind
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D9B9A]"
            fill="#9D9B9A"
          />
          <div className="rounded-full p-1 sm:p-2 bg-white">
            <Play className="w-5 h-5 text-black" fill="black" />
          </div>
          <FastForward
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D9B9A]"
            fill="#9D9B9A"
          />
        </div>
        <div className="bg-[#231F1B] rounded-full p-1 sm:p-2">
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
