// src/components/navigation/ModuleMenuItem.tsx
import { FC, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ModuleMenuItem as ModuleMenuItemType } from "../../../app/moduleItems";
import ModuleDropdownItem from "./ModuleDropdownItem";
import { useAppSelector } from "../../../app/hooks";

interface ModuleMenuItemProps {
  item: ModuleMenuItemType;
}

const ModuleMenuItem: FC<ModuleMenuItemProps> = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const auth = useAppSelector((state) => state.auth);

  // Verifica se l'utente ha i permessi necessari
  const hasPermission = !item.permissions || !item.permissions.length || (auth.user?.profilo && item.permissions.includes(auth.user.profilo));

  // Se l'utente non ha i permessi, non mostrare l'elemento
  if (!hasPermission) {
    return null;
  }

  // Ottieni l'icona dinamicamente da Lucide
  const IconComponent = item.icon ? LucideIcons[item.icon as keyof typeof LucideIcons] : null;

  // Se è un elemento con dropdown
  if (item.dropdownItems && item.dropdownItems.length > 0) {
    return (
      <div className="relative" ref={dropdownRef} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
        <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-sky-500">
          {IconComponent && <IconComponent className="mr-1.5 h-4 w-4" />}
          {item.title}
          <ChevronDown className="ml-1 h-3 w-3" />
        </button>

        {/* Aggiunto div di collegamento per evitare "buchi" nello spazio tra pulsante e dropdown */}
        <div className="absolute left-0 h-2 w-full"></div>

        <div
          className={`absolute left-0 z-10 mt-0 w-48 rounded-md border border-gray-100 bg-white py-1 shadow-lg transition-all duration-150 ${
            isDropdownOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
          }`}
        >
          {item.dropdownItems.map((subItem, index) => (
            <ModuleDropdownItem key={index} item={subItem} />
          ))}
        </div>
      </div>
    );
  }

  // Se è un elemento semplice con link
  return (
    <NavLink
      to={item.path || "/"}
      className={({ isActive }) => `flex items-center px-3 py-2 text-sm ${isActive ? "text-sky-600 font-medium" : "text-gray-700 hover:text-sky-500"}`}
    >
      {IconComponent && <IconComponent className="mr-1 h-3.5 w-3.5" />}
      {item.title}
    </NavLink>
  );
};

export default ModuleMenuItem;
