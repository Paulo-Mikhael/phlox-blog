import { Clock } from "lucide-react";
import { Header } from "../components/Header";
import { UserCard } from "../components/UserCard";
import { DateInfo } from "../utils/DateInfo";
import { colors } from "../styles/variables";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import { getPostById } from "../utils/getPostById";
import NotFound from "./NotFound";

export default function ViewPost() {
  const { postId } = useParams();
  if (!postId) return <NotFound />;

  const post = getPostById(postId);
  if (!post) return <NotFound />;

  return (
    <>
      <Header />
      <main>
        <div className="px-[160px] py-[40px] flex flex-col gap-[30px]">
          <h1 className="text-highlight text-main-red-300 font-bold">
            {post && post.title}
          </h1>
          {post && <img className="h-[358px] w-full rounded-[10px]" src={post.imageUrl} alt="" />}
          {!post && (
            <div className="h-[358px] w-full rounded-[10px] bg-typo-200 animate-pulse flex items-center justify-center">
              <p className="text-typo-700 w-[50px] h-[50px] animate-pulse">
                Carregando...
              </p>
            </div>
          )}
        </div>
        <div className="bg-typo-150 shadow-typo-700/30 shadow-inner w-full h-[80px] flex items-center justify-between px-[160px]">
          <UserCard.Root>
            <UserCard.Infos userName="Usuário" userAvatar="icons/phlox-p-icon.png" userPostsNumber={1} />
            <UserCard.HandleMark marked />
          </UserCard.Root>
        </div>
        <section className="px-[30px] py-[30px] flex justify-between gap-[30px]">
          <article className="w-full">
            <div className="flex justify-between w-full">
              <span className="flex gap-2">
                <Clock color={colors.redMain[300]} />
                <DateInfo onlyDay date={post ? post.postDate : ""} />
              </span>
              <DateInfo onlyWeek date={post ? post.postDate : ""} />
            </div>
            <StyledMarkdown>
              <Markdown>
                {post ? post.content : ""}
              </Markdown>
            </StyledMarkdown>
          </article>
        </section>
      </main>
    </>
  );
}