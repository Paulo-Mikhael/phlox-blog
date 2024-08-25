import { createContext, ReactNode, useContext } from "react";
import { Pagination, ScrollShadow } from "@nextui-org/react";
import Markdown from "markdown-to-jsx";
import { IPost, IPostBadges } from "../../../interfaces/IPost";
import { StyledMarkdown } from "../../../styles/StyledMarkdown";
import { DateInfo } from "../../../utils/DateInfo";
import { Badge } from "../../Bagde";

const FormatContext = createContext<{ format?: "table" | "list" }>({});

export function PostRoot({ format = "table", children }: { format?: "table" | "list", children: ReactNode }) {
  return (
    <FormatContext.Provider value={{ format }}>
      <div className={`flex flex-wrap ${format === "table" ? "justify-between" : "flex-col"} gap-10`}>
        {children}
      </div>
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
    <article className="w-[375px] max-xl:w-full shadow-xl bg-transparent rounded-[10px]">
      <figure className="h-[251px] max-xl:h-auto w-full">
        <img src={post.imageUrl} alt={post.imageAlt} className="rounded-t-[10px] h-full w-full" />
      </figure>
      <section className="bg-typo-100 w-full max-h-[405px] rounded-b-[10px] px-[18px] pt-[18px] flex flex-col gap-5">
        <DateInfo icon date={String(post.postDate)} />
        <span className="flex gap-2 flex-wrap">
          <PostBadges defaultBadges={post.badges.defaultBadges} personalizedBadges={post.badges.personalizedBadges} />
        </span>
        <ScrollShadow size={26} className="flex flex-col overflow-y-scroll scrollbar scrollbar-none pb-5">
          <StyledMarkdown>
            <Markdown>{`### **${post.title}**`}</Markdown>
            <Markdown>{post.content}</Markdown>
          </StyledMarkdown>
        </ScrollShadow>
      </section>
    </article>
  );
}

function CardList({ ...post }: IPost) {
  return (
    <div className="w-full dark">
      <article className="w-full h-[202px] bg-typo-100 rounded-[10px] shadow-xl shadow-typo-700/10 flex">
        <figure className="w-[326px] max-xl:hidden">
          <img src={post.imageUrl} alt={post.imageAlt} className="w-full h-full rounded-l-[10px]" />
        </figure>
        <ScrollShadow size={18} className="p-5 w-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-none">
          <DateInfo icon date={String(post.postDate)} />
          <StyledMarkdown>
            <Markdown>{`#### **${post.title}**`}</Markdown>
            <Markdown>{post.content}</Markdown>
          </StyledMarkdown>
        </ScrollShadow>
      </article>
      <span className="flex gap-2 flex-wrap mt-3">
        <PostBadges defaultBadges={post.badges.defaultBadges} personalizedBadges={post.badges.personalizedBadges} />
      </span>
    </div>
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