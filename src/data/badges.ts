import { Album, Code, Cpu, HandHelping, Newspaper, Tag } from "lucide-react";
import { IBadge } from "../interfaces/IBadge";
import { colors } from "../styles/variables";

export const badges: IBadge[] = [
  {
    icon: Album,
    title: "Histórias",
    backgroundColor: colors.badge.history
  },
  {
    icon: Tag,
    title: "Ofertas",
    backgroundColor: colors.badge.offer
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    backgroundColor: colors.badge.tecnology
  },
  {
    icon: Newspaper,
    title: "Notícias",
    backgroundColor: colors.badge.news
  },
  {
    icon: HandHelping,
    title: "Oportunidades",
    backgroundColor: colors.badge.oportunity
  },
  {
    icon: Code,
    title: "Programação",
    backgroundColor: colors.badge.programation,
    twBackgroundColor: "bg-badge-programation"
  },
]