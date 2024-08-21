import Logo from "@/components/Logo"
import MusicPlayer from "@/components/MusicPlayer"
import SongsList from "@/components/SongsList"

const MusicPlayerPage = () => {
  return (
    <div className="flex flex-row items-center justify-evenly mx-40  h-full">
      <Logo/>
      <SongsList/>
      <MusicPlayer/>
    </div>
  )
}

export default MusicPlayerPage
