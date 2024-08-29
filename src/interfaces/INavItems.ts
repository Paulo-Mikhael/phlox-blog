export interface INavItems {
  name: string,
  path: string,
  current: boolean,
  target?: "_blank" | "_parent" | "_self" | "_top"
}