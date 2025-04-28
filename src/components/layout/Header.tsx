import AppLogo from "./AppLogo";
import ModulesMenu from "../navigation/ModulesMenu";
import UserProfileMenu from "../navigation/UserProfileMenu";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-100 bg-white px-4 py-0.5">
      <div className="flex items-center justify-between w-full">
        {/* Logo e nome app a sinistra */}
        <div className="flex items-center">
          <AppLogo />
        </div>

        {/* Menu dei moduli al centro */}
        <ModulesMenu />

        <div className="flex items-center space-x-4">
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
