import { NavLink } from "react-router-dom";
import menuItems from "../../config/menuItems";

const HorizontalMenu = () => {
  return (
    <nav className="border-b border-gray-100 bg-white px-6 py-2">
      <ul className="flex space-x-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block py-2 text-sm ${
                  isActive
                    ? "border-b-2 border-blue-500 font-medium text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalMenu;
