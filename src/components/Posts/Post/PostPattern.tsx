import { ReactNode, useEffect, useState } from "react";
import { Pagination, ScrollShadow } from "@nextui-org/react";
import Markdown from "markdown-to-jsx";
import { IPost, IPostBadges } from "../../../interfaces/IPost";
import { StyledMarkdown } from "../../../styles/StyledMarkdown";
import { DateInfo } from "../../../utils/DateInfo";
import { Badge } from "../../Bagde";
import { SwitchButton } from "../../SwitchButton";
import { Book, BookOpen, List, Pencil, Table, Trash2 } from "lucide-react";
import { postCardFormatState } from "../../../state/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Post } from ".";
import { Link, useNavigate } from "react-router-dom";
import { useFilteredPosts } from "../../../state/hooks/useFilteredPosts";
import { getUserById } from "../../../utils/getUserById";
import { useSetModalValue } from "../../../state/hooks/useSetModalValue";
import { ConfirmateDeletionModal } from "./ConfirmateDeletionModal";
import { useCreateModal } from "../../../state/hooks/useCreateModal";

interface IPostCard extends IPost {
  deleteButton?: boolean;
}

export function PostRoot({
  format = "table",
  children,
}: { format?: "table" | "list"; children: ReactNode }) {
  const setFormat = useSetRecoilState(postCardFormatState);

  useEffect(() => {
    setFormat(format);
  }, []);

  return (
    <div className={`flex flex-wrap ${format === "table" ? "justify-between" : "flex-col"} gap-10`}>
      {children}
    </div>
  );
}

export function PostCard({ deleteButton = false, ...post }: IPostCard) {
  const format = useRecoilValue(postCardFormatState);

  return format === "table" ? (
    <CardTable {...post} deleteButton={deleteButton} />
  ) : (
    <CardList {...post} deleteButton={deleteButton} />
  );
}

function CardTable({ ...post }: IPostCard) {
  const user = getUserById(post.userAuthorId);
  if (!user) return;

  return (
    <article className="w-[375px] max-xl:w-full shadow-xl bg-transparent rounded-[10px] relative">
      <figure className="h-[251px] max-xl:h-auto w-full">
        <Link to={`/view?${post.id}`} className="relative">
          <img
            src={user.avatarUrl ? user.avatarUrl : "images/user.png"}
            className="w-14 h-14 z-[2] rounded-full border border-main-red-300 absolute bottom-2 left-2"
          />
          <img
            src={post.imageUrl}
            alt={post.imageAlt}
            className="rounded-t-[10px] h-full w-full z-[1]"
          />
        </Link>
      </figure>
      <section className="bg-typo-100 w-full max-h-[405px] rounded-b-[10px] px-[18px] pt-[18px] flex flex-col gap-5">
        <DateInfo icon date={String(new Date(post.postDate))} />
        <span className="flex gap-2 flex-wrap">
          <PostBadges
            defaultBadges={post.badges.defaultBadges}
            personalizedBadges={post.badges.personalizedBadges}
          />
        </span>
        <ScrollShadow
          size={26}
          className="flex flex-col overflow-y-scroll scrollbar scrollbar-none pb-5"
        >
          <StyledMarkdown>
            <Markdown>{`### **${post.title}**`}</Markdown>
            <Markdown>{post.content}</Markdown>
          </StyledMarkdown>
        </ScrollShadow>
      </section>
    </article>
  );
}

function CardList({ ...post }: IPostCard) {
  const user = getUserById(post.userAuthorId);
  const postId = post.id;
  const navigate = useNavigate();
  const [helpPressed, setHelpPressed] = useState<boolean>(false);
  const createModal = useCreateModal();
  const setDeleteConfimationModal = useSetModalValue(postId);
  if (!user) return;

  const floatButtonStyle = `absolute bg-main-red-300 rounded-full p-2 cursor-pointer transition-all`;
  const floatButtonIconStyle = "size-5 text-typo-100";
  const HelpButton = helpPressed === false ? Book : BookOpen;

  useEffect(() => {
    createModal(postId);
  });

  return (
    <>
      <ConfirmateDeletionModal postId={postId} />
      <div className="w-full relative">
        <p>{postId}</p>
        {post.deleteButton && (
          <div className="absolute transition-all -top-3 right-7">
            <button
              className={`${floatButtonStyle} z-10`}
              onMouseEnter={() => setHelpPressed(!helpPressed)}
            >
              <HelpButton className={floatButtonIconStyle} />
            </button>
            <button
              className={`${floatButtonStyle} ${helpPressed === true ? "-top-10 -left-6" : ""}`}
              onClick={() => {
                navigate(`/edit?${postId}`);
              }}
            >
              <Pencil className={floatButtonIconStyle} />
            </button>
            <button
              className={`${floatButtonStyle} ${helpPressed === true ? "-top-10 left-6" : ""}`}
              onClick={() => {
                setDeleteConfimationModal(true);
                setHelpPressed(false);
              }}
            >
              <Trash2 className="size-5 text-typo-100" />
            </button>
          </div>
        )}
        <article className="w-full h-[202px] bg-typo-100 rounded-[10px] shadow-xl shadow-typo-700/10 flex">
          <figure className="w-[326px] max-xl:hidden">
            <Link to={`/view?${postId}`} className="relative">
              <img
                src={user.avatarUrl ? user.avatarUrl : "images/user.png"}
                className="w-12 h-12 z-[2] rounded-full border border-main-red-300 absolute bottom-2 left-2"
              />
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                className="w-full h-full rounded-l-[10px]"
              />
            </Link>
          </figure>
          <ScrollShadow
            size={18}
            className="p-5 w-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-none"
          >
            <DateInfo icon date={String(new Date(post.postDate))} />
            <StyledMarkdown>
              <Markdown>{`#### **${post.title}**`}</Markdown>
              <Markdown>{post.content}</Markdown>
            </StyledMarkdown>
          </ScrollShadow>
        </article>
        <span className="flex gap-2 flex-wrap mt-3">
          <PostBadges
            defaultBadges={post.badges.defaultBadges}
            personalizedBadges={post.badges.personalizedBadges}
          />
        </span>
      </div>
    </>
  );
}

function PostBadges({ defaultBadges, personalizedBadges }: IPostBadges) {
  return (
    <>
      {defaultBadges.storyPressed === false && <Badge.Root children={<Badge.Story />} />}
      {defaultBadges.tecnologyPressed === false && <Badge.Root children={<Badge.Tecnology />} />}
      {defaultBadges.newsPressed === false && <Badge.Root children={<Badge.News />} />}
      {defaultBadges.programationPressed === false && (
        <Badge.Root children={<Badge.Programation />} />
      )}
      {defaultBadges.opportunityPressed === false && (
        <Badge.Root children={<Badge.Opportunity />} />
      )}
      {defaultBadges.offerPressed === false && <Badge.Root children={<Badge.Offer />} />}
      {personalizedBadges.map(
        (item, index) =>
          item.pressed === false && (
            <Badge.Root key={index} children={<Badge.Personalize text={item.title} />} />
          )
      )}
    </>
  );
}

export function PostPagination({ total, initialPage }: { total: number; initialPage: number }) {
  return (
    <nav className="p-16 w-full flex items-center justify-center gap-1">
      <Pagination color="danger" total={total} initialPage={initialPage} />
    </nav>
  );
}

export function PostFormatButton() {
  const [switchActivedSide, setSwitchActivedSide] = useState<"left" | "right">("left");
  const setFormat = useSetRecoilState(postCardFormatState);

  return (
    <SwitchButton.Root>
      <SwitchButton.LeftIcon
        icon={Table}
        actived={switchActivedSide === "left"}
        onClick={() => {
          setSwitchActivedSide("left");
          setFormat("table");
        }}
      />
      <SwitchButton.RightIcon
        icon={List}
        actived={switchActivedSide === "right"}
        onClick={() => {
          setSwitchActivedSide("right");
          setFormat("list");
        }}
      />
    </SwitchButton.Root>
  );
}

export function PostCards() {
  const posts = useFilteredPosts();

  return (
    <Post.Root>
      {posts.map((item) => (
        <Post.Card key={item.id} {...item} />
      ))}
    </Post.Root>
  );
}
