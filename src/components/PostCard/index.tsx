import { Clock } from "lucide-react";
import { colors } from "../../styles/variables";
import { Badge } from "../Bagde";

export function PostCard() {
  return (
    <article className="w-[375px] shadow-xl shadow-typo-700/20 rounded-[10px]">
      <figure className="h-[251px] w-full">
        <img src="images/post-coffee.png" alt="" className="rounded-t-[10px]" />
      </figure>
      <section className="bg-typo-100 w-full h-[305px] rounded-b-[10px] px-[18px] pt-[18px] flex flex-col gap-5">
        <span className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Clock color={colors.redMain[300]} size={29} />
            <p className="text-typo-700">01/01/2000</p>
          </div>
          <p className="text-typo-700">
            Quarta-Feira
          </p>
        </span>
        <span className="flex gap-2">
          <Badge text="História" twBackgroundColor="bg-badge-history" />
          <Badge text="Oferta" twBackgroundColor="bg-badge-offer" />
          <Badge text="Notícia" twBackgroundColor="bg-badge-news" />
        </span>
        <span className="flex flex-col gap-[15px] overflow-y-scroll scrollbar scrollbar-none pb-5">
          <h3 className="text-main-red-300 text-section-subtitle">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="text-normal text-typo-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur, neque in malesuada efficitur, nunc massa ornare sem,
            sit amet ullamcorper magna turpis eu arcu.
          </p>
          <figure>
            <img src="images/post-coffee-content.png" alt="" />
          </figure>
        </span>
      </section>
    </article>
  );
}