// src/config/menuItems.ts
export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  permissions?: string[]; // Per controllo accessi basato su ruoli
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: "dashboard",
  },
  {
    title: "Operatori",
    path: "/operatori",
    icon: "people",
    permissions: ["admin", "root"],
  },
  {
    title: "Clienti",
    path: "/clienti",
    icon: "business",
  },
  {
    title: "Progetti",
    path: "/progetti",
    icon: "folder",
  },
  {
    title: "Impostazioni",
    path: "/impostazioni",
    icon: "settings",
  },
];

export default menuItems;
