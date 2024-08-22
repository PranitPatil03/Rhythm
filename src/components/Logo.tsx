import { logo } from "@/assets";

const Logo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 sm:static sm:bg-transparent flex flex-row sm:flex-row items-center sm:items-start sm:h-full py-4 px-4 sm:px-0 gap-6">
      <img src={logo} alt="Logo" className="w-auto h-8 lg:h-12" />
      {/* <img src={profile} alt="Profile" className="w-auto h-10 lg:h-12 mt-auto" /> */}
    </div>
  );
};

export default Logo;
