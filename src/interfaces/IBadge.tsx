import { ElementType } from "react";

export interface IBadge { 
  icon: ElementType,
  title: string,
  backgroundColor: string,
  twBackgroundColor?: string
}