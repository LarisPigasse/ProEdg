import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";

const UserProfileMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Gestione click fuori dal dropdown per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dati utente di esempio - Verranno sostituiti con i dati reali dall'autenticazione
  const userInfo = {
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    profilo: "admin",
    livello: 32,
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <User className="mr-1 h-3.5 w-3.5" />
        {userInfo.name}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md border border-gray-100 bg-white py-1 shadow-lg">
          <div className="border-b border-gray-100 px-4 py-2">
            <p className="font-medium text-stone-800">{userInfo.name}</p>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              {userInfo.email}
            </div>
          </div>

          {/* Profilo e livello (solo per operatori) */}
          <div className="border-b border-gray-100 px-4 py-2">
            <div className="flex items-center text-sm text-gray-500 py-1">
              <span className="mr-1">Profilo:</span>
              <span className="font-medium text-stone-800">
                {userInfo.profilo}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 py-1">
              <span className="mr-1">Livello:</span>
              <span className="font-medium text-stone-800">
                {userInfo.livello}
              </span>
            </div>
          </div>

          {/* Opzione logout */}
          <div className="px-2 py-1">
            <button className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100">
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
