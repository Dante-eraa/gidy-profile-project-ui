import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  // Extract profile safely
  const profileImage = user?.profile?.profileImage;
  const firstName =
    user?.profile?.firstName || user?.profile?.fullName || user?.email || "";

  const avatarLetter = firstName.charAt(0).toUpperCase();

  return (
    <header className="bg-white  border-0">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <img
              src="	https://d2d0jobwzy0nc3.cloudfront.net/static/Gidy_logo_full_transparent"
              alt="logo"
              className="w-23"
            />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black">
              Jobs
            </a>
            <a href="#" className="hover:text-black">
              Hackathons
            </a>
            <a href="#" className="hover:text-black">
              Projects
            </a>
            <a href="#" className="hover:text-black">
              Tasks
            </a>
            <a href="#" className="hover:text-black">
              Organization
            </a>
          </nav>
        </div>

        {/* Profile Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#0059d6] text-white font-medium cursor-pointer">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            avatarLetter
          )}
        </div>
      </div>
    </header>
  );
}
