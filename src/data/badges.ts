import { Album, Code, Cpu, HandHelping, Newspaper, Tag } from "lucide-react";
import { IBadge } from "../interfaces/IBadge";
import { colors } from "../styles/variables";

export const badges: IBadge[] = [
  {
    icon: Album,
    title: "Histórias",
    backgroundColor: colors.badge.history,
    badgeKey: "story",
  },
  {
    icon: Tag,
    title: "Ofertas",
    backgroundColor: colors.badge.offer,
    badgeKey: "offer",
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    backgroundColor: colors.badge.tecnology,
    badgeKey: "tecnology",
  },
  {
    icon: Newspaper,
    title: "Notícias",
    backgroundColor: colors.badge.news,
    badgeKey: "news",
  },
  {
    icon: HandHelping,
    title: "Oportunidades",
    backgroundColor: colors.badge.oportunity,
    badgeKey: "opportunity",
  },
  {
    icon: Code,
    title: "Programação",
    backgroundColor: colors.badge.programation,
    badgeKey: "programation",
    twBackgroundColor: "bg-badge-programation",
  },
];
