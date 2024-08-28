import { Clock } from "lucide-react";
import { Header } from "../components/Header";
import { SimpleCard } from "../components/SimpleCard";
import { UserCard } from "../components/UserCard";
import { usePosts } from "../state/hooks/usePosts";
import { DateInfo } from "../utils/DateInfo";
import { colors } from "../styles/variables";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import Markdown from "markdown-to-jsx";

export default function ViewPost() {
  const post = usePosts();

  return (
    <main>
      <Header />
      <div className="px-[160px] py-[40px] flex flex-col gap-[30px]">
        <h1 className="text-highlight text-main-red-300 font-bold">
          {post[1] && post[1].title}
        </h1>
        {post[1] && <img className="h-[358px] w-full rounded-[10px]" src={post[1].imageUrl} alt="" />}
        {!post[1] && (
          <div className="h-[358px] w-full rounded-[10px] bg-typo-200 animate-pulse flex items-center justify-center">
            <p className="text-typo-700 w-[50px] h-[50px] animate-pulse">
              Carregando...
            </p>
          </div>
        )}
      </div>
      <div className="bg-typo-150 shadow-typo-700/30 shadow-inner w-full h-[80px] flex items-center justify-between px-[160px]">
        <UserCard.Root>
          <UserCard.Infos userName="Usuário" userAvatar="images/user.png" userPostsNumber={1} />
          <UserCard.HandleMark marked />
        </UserCard.Root>
      </div>
      <main className="px-[160px] py-[30px] flex justify-between gap-[30px]">
        <div>
          <SimpleCard title="Tópicos">
            <ul className="w-[308px] h-full list-disc pl-[26px] text-main-red-300">
              <li className="text-section font-bold underline cursor-pointer">
                Lorem ipsum dolor sit amet
              </li>
              <li className="text-section font-bold underline cursor-pointer">
                Lorem ipsum dolor sit amet
              </li>
            </ul>
          </SimpleCard>
        </div>
        <article className="w-full">
          <div className="flex justify-between w-full">
            <span className="flex gap-2">
              <Clock color={colors.redMain[300]} />
              <DateInfo onlyDay date={post[1] ? post[1].postDate : ""} />
            </span>
            <DateInfo onlyWeek date={post[1] ? post[1].postDate : ""} />
          </div>
          <StyledMarkdown>
            <Markdown>
              {post[1] ? post[1].content : ""}
            </Markdown>
          </StyledMarkdown>
        </article>
      </main>
    </main>
  );
}