import { Clock } from "lucide-react";
import { colors } from "../../../styles/variables";
import { createContext, ReactNode, useContext } from "react";
import { Pagination, ScrollShadow } from "@nextui-org/react";
import { Badge } from "../../Bagde";
import { IPost, IPostBadges } from "../../../interfaces/IPost";

const FormatContext = createContext<{ format?: "table" | "list" }>({});

export function PostRoot({ format = "table", children }: { format?: "table" | "list", children: ReactNode }) {
  return (
    <FormatContext.Provider value={{ format }}>
      {format === "table"
        ? <div className="flex flex-wrap justify-between gap-10">
          {children}
        </div>
        : <div className="flex flex-wrap flex-col gap-10">
          {children}
        </div>}
    </FormatContext.Provider>
  );
}

export function PostCard({ ...post }: IPost) {
  const { format } = useContext(FormatContext)

  return (
    format === "table" ? <CardTable {...post} /> : <CardList {...post} />
  );
}

function CardTable({ ...post }: IPost) {
  return (
    <article className="w-[375px] max-xl:w-full shadow-xl shadow-typo-700/20 rounded-[10px]">
      <figure className="h-[251px] max-xl:h-auto w-full">
        <img src={post.image} alt={post.imageAlt} className="rounded-t-[10px] h-full w-full" />
      </figure>
      <section className="bg-typo-100 w-full h-[305px] rounded-b-[10px] px-[18px] pt-[18px] flex flex-col gap-5">
        <PostDateInfo date={String(post.postDate)} />
        <span className="flex gap-2 flex-wrap">
          <PostBadges defaultBadges={post.badges.defaultBadges} personalizedBadges={post.badges.personalizedBadges} />
        </span>
        <ScrollShadow className="flex flex-col gap-[15px] overflow-y-scroll scrollbar scrollbar-none pb-5">
          <PostSection text={post.title} />
          <PostText text={post.content} />
        </ScrollShadow>
      </section>
    </article>
  );
}

function CardList({ ...post }: IPost) {
  return (
    <article className="w-full h-[202px] bg-typo-100 rounded-[10px] shadow-xl shadow-typo-700/10 flex">
      <figure className="w-[326px]">
        <img src={post.image} alt={post.imageAlt} className="w-full h-full rounded-l-[10px]" />
      </figure>
      <section className="p-5 w-full flex flex-col gap-2">
        <PostDateInfo date={String(post.postDate)} />
        <PostSection text={post.title} />
        <div className="overflow-hidden">
          <PostText text={post.content} />
        </div>
        <ScrollShadow size={9} hideScrollBar className="h-[30px] flex gap-2 mt-2 flex-wrap pb-2">
          <PostBadges defaultBadges={post.badges.defaultBadges} personalizedBadges={post.badges.personalizedBadges} />
        </ScrollShadow>
      </section>
    </article>
  );
}

function PostDateInfo({ date }: { date: string }) {
  const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const dateObjc = new Date(date);
  
  return (
    <span className="flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        <Clock color={colors.redMain[300]} size={22} />
        <p className="text-typo-700">{`${dateObjc.toLocaleString().slice(0, 10)}`}</p>
      </div>
      <p className="text-typo-700">
        {daysOfWeek[dateObjc.getDay()]}
      </p>
    </span>
  );
}

function PostSection({ text }: { text: string }) {
  return (
    <h3 className="text-main-red-300 text-section-subtitle">
      {text}
    </h3>
  );
}

function PostText({ text }: { text: string }) {
  const { format } = useContext(FormatContext);

  return (
    <p className={`text-normal w-full max-w-[528px] text-typo-700 text-wrap text-ellipsis ${format === "list" ? "h-[45px]" : "h-auto"}`}>
      {text}
    </p>
  );
}

function PostBadges({ defaultBadges, personalizedBadges }: IPostBadges) {
  return (
    <>
      {defaultBadges.storyPressed === false && <Badge.Root children={<Badge.Story />} />}
      {defaultBadges.tecnologyPressed === false && <Badge.Root children={<Badge.Tecnology />} />}
      {defaultBadges.newsPressed === false && <Badge.Root children={<Badge.News />} />}
      {defaultBadges.programationPressed === false && <Badge.Root children={<Badge.Programation />} />}
      {defaultBadges.opportunityPressed === false && <Badge.Root children={<Badge.Opportunity />} />}
      {defaultBadges.offerPressed === false && <Badge.Root children={<Badge.Offer />} />}
      {personalizedBadges.map((item, index) => (
        item.pressed === false && <Badge.Root key={index} children={<Badge.Personalize text={item.title} />} />
      ))}
    </>
  );
}

export function PostPagination({ total, initialPage }: { total: number, initialPage: number }) {
  return (
    <nav className="p-16 w-full flex items-center justify-center gap-1">
      <Pagination color="danger" total={total} initialPage={initialPage} />
    </nav>
  );
}