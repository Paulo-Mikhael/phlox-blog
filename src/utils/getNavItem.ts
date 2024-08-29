import { navItems } from "../data/navItems";
import { INavItems } from "../interfaces/INavItems";

export function getNavItem(currentItemName: string, newItems?: INavItems[]): INavItems[] {
  const newNavItems: INavItems[] = [];
  const itemsData = [
    ...navItems
  ];
  if (newItems) {
    newItems.map((item) => {
      itemsData.push(item);
    });
  };

  itemsData.map((item) => {
    const newItem: INavItems = {
      name: item.name,
      path: item.path,
      current: currentItemName === item.name,
      target: item.target
    }

    newNavItems.push(newItem);
  });

  return newNavItems;
}