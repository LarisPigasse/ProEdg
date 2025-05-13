// src/components/layout/VersionInfo.tsx
import { APP_CONFIG } from "../../../app/constants";
const VersionInfo = () => {
  return (
    <div>
      <span className="text-xxs text-gray-600 font-semibold">{APP_CONFIG.NAME}</span>
      <span className="text-xxs text-violet-800 font-bold ms-1">{APP_CONFIG.VERSION}</span>
    </div>
  );
};

export default VersionInfo;
