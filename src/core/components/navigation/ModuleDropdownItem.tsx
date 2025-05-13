// src/components/navigation/ModuleDropdownItem.tsx
import { FC } from "react";
import { NavLink } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { SubMenuItem } from "../../config/modulesConfig";

interface ModuleDropdownItemProps {
  item: SubMenuItem;
}

const ModuleDropdownItem: FC<ModuleDropdownItemProps> = ({ item }) => {
  // Ottieni l'icona dinamicamente da Lucide
  const IconComponent = item.icon
    ? LucideIcons[item.icon as keyof typeof LucideIcons]
    : null;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm whitespace-nowrap ${
          isActive
            ? "bg-gray-100 text-sky-600 font-medium"
            : "text-gray-700 hover:bg-gray-50 hover:text-sky-500"
        }`
      }
    >
      {IconComponent && <IconComponent className="mr-1 h-3.5 w-3.5" />}
      {item.title}
    </NavLink>
  );
};

export default ModuleDropdownItem;
