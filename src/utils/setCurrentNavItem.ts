import { navItems } from "../data/navItems";
import { INavItems } from "../interfaces/INavItems";

export function setCurrentNavItem(itemName: string): INavItems[]{
  const newItems: INavItems[] = [];
  const itemsData = [
    ...navItems
  ];

  itemsData.map((item) => {
    const newItem: INavItems = {
      name: item.name,
      path: item.path,
      current: itemName === item.name
    }

    newItems.push(newItem);
  });

  return newItems;
}