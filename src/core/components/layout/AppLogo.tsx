import { Link } from "react-router-dom";
import { APP_CONFIG, ROUTES } from "../../../app/constants";

const AppLogo = () => {
  return (
    <Link to={ROUTES.HOME} className="flex items-center text-2xl font-bold text-gray-800">
      <img
        src={APP_CONFIG.ICON_PRO}
        alt={`${APP_CONFIG.NAME} Logo`}
        className="h-5 mr-2" // h-5 equivale a 20px in Tailwind
      />
      <span className="text-sky-500">ed</span>
      <span className="text-stone-600">g</span>
      <span className="text-violet-600 font-semibold ms-0">Pro</span>
    </Link>
  );
};

export default AppLogo;
