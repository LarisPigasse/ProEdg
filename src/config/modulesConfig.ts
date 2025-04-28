// src/config/modulesConfig.ts
export interface SubMenuItem {
  title: string;
  path: string;
  icon?: string;
  permissions?: string[];
}

export interface ModuleMenuItem {
  title: string;
  path?: string; // Opzionale per elementi con dropdown
  icon?: string;
  permissions?: string[];
  dropdownItems?: SubMenuItem[];
}

const modulesConfig: ModuleMenuItem[] = [
  {
    title: "Home",
    path: "/",
    icon: "",
  },
  {
    title: "Sistema",
    icon: "settings",
    dropdownItems: [
      {
        title: "Operatori",
        path: "/operatori",
        icon: "",
        permissions: ["admin", "root"],
      },
      {
        title: "Tabelle di base",
        path: "/tabelle",
        icon: "",
      },
      {
        title: "Configurazione",
        path: "/configurazione",
        icon: "",
      },
    ],
  },
  {
    title: "Setup",
    path: "/setup",
    icon: "",
    permissions: ["root"],
  },
];

export default modulesConfig;
