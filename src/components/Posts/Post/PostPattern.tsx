import { Clock } from "lucide-react";
import { colors } from "../../../styles/variables";
import { createContext, ReactNode, useContext } from "react";
import { Pagination } from "@nextui-org/react";

const FormatContext = createContext<{ format?: "table" | "list" }>({ });

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

export function PostCard() {
  const { format } = useContext(FormatContext)

  return (
    format === "table" ? <CardTable /> : <CardList />
  );
}

function CardTable() {
  return (
    <article className="w-[375px] max-xl:w-full shadow-xl shadow-typo-700/20 rounded-[10px]">
      <figure className="h-[251px] max-xl:h-auto w-full">
        <img src="images/post-coffee.png" alt="" className="rounded-t-[10px]" />
      </figure>
      <section className="bg-typo-100 w-full h-[305px] rounded-b-[10px] px-[18px] pt-[18px] flex flex-col gap-5">
        <PostDateInfo />
        <span className="flex gap-2">
          {/* <Badge text="História" twBackgroundColor="bg-badge-history" />
          <Badge text="Oferta" twBackgroundColor="bg-badge-offer" />
          <Badge text="Notícia" twBackgroundColor="bg-badge-news" /> */}
        </span>
        <span className="flex flex-col gap-[15px] overflow-y-scroll scrollbar scrollbar-none pb-5">
          <PostSection text="Lorem ipsum dolor sit amet" />
          <PostText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, neque in malesuada efficitur, nunc massa 
          ornare sem, sit amet ullamcorper magna turpis eu arcu." />
          <figure>
            <img src="images/post-coffee-content.png" alt="" />
          </figure>
          <PostText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, neque in malesuada efficitur, nunc massa 
          ornare sem, sit amet ullamcorper magna turpis eu arcu." />
        </span>
      </section>
    </article>
  );
}

function CardList() {
  return (
    <article className="w-full h-[202px] bg-typo-100 rounded-[10px] shadow-xl shadow-typo-700/10 flex">
      <figure className="w-[326px]">
        <img src="images/post-coffee.png" alt="" className="w-full h-full rounded-l-[10px]" />
      </figure>
      <section className="p-5 w-full flex flex-col gap-2">
        <PostDateInfo />
        <PostSection text="Lorem ipsum dolor sit amet" />
        <div className="overflow-hidden">
          <PostText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, neque in malesuada efficitur, nunc massa 
          ornare sem, sit amet ullamcorper magna turpis eu arcu." />
        </div>
        <span className="flex gap-2 mt-2">
          {/* <Badge text="História" twBackgroundColor="bg-badge-history" />
          <Badge text="Oferta" twBackgroundColor="bg-badge-offer" />
          <Badge text="Notícia" twBackgroundColor="bg-badge-news" /> */}
        </span>
      </section>
    </article>
  );
}

function PostDateInfo() {
  return (
    <span className="flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        <Clock color={colors.redMain[300]} size={22} />
        <p className="text-typo-700">01/01/2000</p>
      </div>
      <p className="text-typo-700">
        Quarta-Feira
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

export function PostPagination({ total, initialPage }: { total: number, initialPage: number }) {
  return (
    <nav className="p-16 w-full flex items-center justify-center gap-1">
      <Pagination color="danger" total={total} initialPage={initialPage} />      
    </nav>
  );
}