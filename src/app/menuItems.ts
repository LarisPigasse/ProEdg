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
];

export default menuItems;
