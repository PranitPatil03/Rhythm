import { logo, profile } from "@/assets";

const Logo = () => {
  return (
    <div className="flex flex-col items-start justify-between h-full py-36">
      <img src={logo} alt="Logo" className="w-auto h-10" />
      <img src={profile} alt="Logo" className="w-auto h-10" />
    </div>
  );
};

export default Logo;
