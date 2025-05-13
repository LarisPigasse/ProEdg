import modulesConfig from "../../../app/moduleItems";
import ModuleMenuItem from "./ModuleMenuItem";

const ModulesMenu = () => {
  return (
    <div className="flex items-center space-x-2">
      {modulesConfig.map((item, index) => (
        <ModuleMenuItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ModulesMenu;
