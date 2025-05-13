import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown, Key } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { logout, authService, ChangePasswordModal } from "../../../features/auth";
import useModal from "../../../core/hooks/useModal";

const UserProfileMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen: isChangePasswordOpen, openModal: openChangePassword, closeModal: closeChangePassword } = useModal();

  // Gestione click fuori dal dropdown per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  const handleChangePassword = () => {
    setIsDropdownOpen(false); // Chiudi il dropdown
    openChangePassword(); // Apri la modal cambio password
  };

  if (!user) return null;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <User className="mr-1 h-3.5 w-3.5" />
          {user.operatore || user.name}
          <ChevronDown className="ml-1 h-3 w-3" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-md border border-gray-100 bg-white py-1 shadow-lg">
            <div className="border-b border-gray-100 px-4 py-2">
              <p className="font-medium text-stone-800">{user.operatore || user.name}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">{user.email}</div>
            </div>

            {/* Profilo e livello (solo per operatori) */}
            <div className="border-b border-gray-100 px-4 py-2">
              <div className="flex items-center text-sm text-gray-500 py-1">
                <span className="mr-1">Profilo:</span>
                <span className="font-medium text-stone-800">{user.profilo}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 py-1">
                <span className="mr-1">Livello:</span>
                <span className="font-medium text-stone-800">{user.livello}</span>
              </div>
            </div>

            {/* Opzione Change Password */}
            <div className="px-2 py-1">
              <button onClick={handleChangePassword} className="flex w-full items-center rounded-md px-2 py-1 text-xs text-violet-600 hover:bg-gray-100">
                <Key className="mr-1.5 h-3.5 w-3.5" />
                Cambia Password
              </button>
            </div>

            {/* Opzione logout */}
            <div className="px-2 py-1">
              <button onClick={handleLogout} className="flex w-full items-center rounded-md px-2 py-1 text-xs text-red-600 hover:bg-gray-100">
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal cambio password */}
      <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={closeChangePassword} />
    </>
  );
};

export default UserProfileMenu;
