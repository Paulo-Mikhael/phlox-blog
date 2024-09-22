import { INavItems } from "../interfaces/INavItems";

export const navItems: INavItems[] = [
  {
    name: "Home",
    path: "/",
    current: true,
  },
  {
    name: "Categorias",
    path: "/",
    current: false,
    onClick: () => {
      scrollTo(0, 882);
    },
  },
  {
    name: "Shop",
    path: "https://phlox-psi.vercel.app/",
    current: false,
    target: "_blank",
  },
  {
    name: "Contate-nos",
    path: "/",
    current: false,
  },
];
