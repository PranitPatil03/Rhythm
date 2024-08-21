import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from "@/api/data";

const SongsList = () => {
  return (
    <div className="w-[400px]  text-white p-4 rounded-lg">
      <Tabs defaultValue="for-you">
        <TabsList className="flex">
          <TabsTrigger value="for-you" className="px-4 py-2 ">
            For You
          </TabsTrigger>
          <TabsTrigger value="top-tracks" className="px-4 py-2   ">
            Top Tracks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="mt-4">
          <div className="space-y-4">
            {data.map((track) => (
              <div key={track.id} className="flex items-center">
                <img
                  src={`https://via.placeholder.com/50?text=${track.cover}`}
                  alt={track.name}
                  className="w-10 h-10 rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium">{track.name}</h3>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="top-tracks" className="mt-4">
          <div className="space-y-4">
            {data
              .filter((track) => track.top_track)
              .map((track) => (
                <div key={track.id} className="flex items-center">
                  <img
                    src={`https://via.placeholder.com/50?text=${track.cover}`}
                    alt={track.name}
                    className="w-10 h-10 rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{track.name}</h3>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SongsList;
