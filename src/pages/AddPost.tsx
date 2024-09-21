import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { v4 as uuidV4 } from "uuid";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { actualUserState, handleBadgeItemsState } from "../state/atom";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import { HandleBadges } from "../utils/HandleBadges";
import { DateInfo } from "../utils/DateInfo";
import { Toolbar } from "../components/Toolbar";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Header } from "../components/Header";
import { insertToDatabase } from "../utils/firebase/functions/insertToDatabase";
import { UserCard } from "../components/UserCard";
import { useSetUsers } from "../state/hooks/useSetUsers";
import { useSetPosts } from "../state/hooks/useSetPosts";
import { getPosts } from "../utils/getPosts";
import { getUsers } from "../utils/getUsers";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { submitImageToStorage } from "../utils/firebase/functions/submitImageToStorage";
import { getPostById } from "../utils/getPostById";

interface IPostContentImage {
  localUrl: string;
  file: File;
  databaseUrl?: string;
}

export default function AddPost({ editing }: { editing?: boolean }) {
  const location = useLocation();
  const postId = location.search.replace("?", "");
  const userPost = getPostById(postId);
  const fileInput = useRef<HTMLInputElement>(null);
  const dropzone = useRef<HTMLDivElement>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postImageUrl, setPostImageUrl] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postContentImages, setPostContentImages] = useState<IPostContentImage[]>([]);
  const [highlightedTxt, setHighlightedTxt] = useState("");
  const [htmlPreview, setHtmlPreview] = useState<boolean>(false);
  const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItemsState);
  const user = useRecoilValue(actualUserState);
  const navigate = useNavigate();
  const setUsers = useSetUsers();
  const setPosts = useSetPosts();

  if (!user) {
    return <NotFound />;
  }

  async function submitPost() {
    if (!user || !user.auth || !user.data.id) {
      console.log("sem usuário");
      return;
    }

    const newPostId = editing ? postId : uuidV4();
    const newPost: IPost = {
      id: newPostId,
      title: postTitle,
      content: changeContentUrls(postContent),
      imageUrl: postImageUrl,
      postDate: new Date().toString(),
      userAuthorId: user.data.id,
      badges: handleBadgesItems,
    };

    insertToDatabase(`users/${user.data.id}/posts/${newPost.id}`, newPost)
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setPostTitle("");
        setPostContent("");
        setPostImageUrl("");
        getPosts(setPosts);
        getUsers(setUsers);
        navigate(-1);
      });
  }

  function submitPostImage(image: File) {
    if (!image) return;

    submitImageToStorage(image)
      .then((url) => {
        setPostImageUrl(url);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function submitPostContentImage(postContentImage: IPostContentImage) {
    if (!postContentImage) return;

    setPostContent(
      (prv) => prv + ` ![${postContentImage.file.name}](${postContentImage.localUrl})`
    );

    submitImageToStorage(postContentImage.file)
      .then((url) => {
        setPostContentImages((prv) => [...prv, { ...postContentImage, databaseUrl: url }]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function changeContentUrls(content: string): string {
    let updatedContent = content;

    for (let i = 0; i < postContentImages.length; i++) {
      const localUrl = postContentImages[i].localUrl;
      const databaseUrl = postContentImages[i].databaseUrl;

      if (!databaseUrl) return "";

      updatedContent = updatedContent.replace(localUrl, databaseUrl);
    }

    return updatedContent;
  }

  function submitDroppedImage(evt: DragEvent) {
    evt.preventDefault();

    if (!evt.dataTransfer) return;

    const file = evt.dataTransfer.files[0];

    if (!String(file.type).startsWith("image")) return;

    const postContentImage: IPostContentImage = {
      localUrl: URL.createObjectURL(file),
      file: file,
    };

    submitPostContentImage(postContentImage);

    dropzone.current?.removeEventListener("drop", submitDroppedImage);
    dropzone.current?.addEventListener("drop", submitDroppedImage);
  }

  function submitPastedImage(evt: ClipboardEvent) {
    if (!evt.clipboardData) return;

    const clipboardItems = evt.clipboardData.items;
    const items: DataTransferItem[] = [].slice.call(clipboardItems).filter(function (
      item: DataTransferItem
    ) {
      return /^image\//.test(item.type);
    });
    if (items.length === 0) {
      return;
    }

    const item = items[0];
    const file = item.getAsFile();

    if (file) {
      const postContentImage: IPostContentImage = {
        localUrl: URL.createObjectURL(file),
        file: file,
      };

      submitPostContentImage(postContentImage);
    }

    dropzone.current?.removeEventListener("paste", submitPastedImage);
    dropzone.current?.addEventListener("paste", submitPastedImage);
  }

  useEffect(() => {
    if (postContent.trim() === "") {
      setHighlightedTxt("");
    }
  }, [postContent]);

  useEffect(() => {
    dropzone.current?.addEventListener("paste", submitPastedImage);
    dropzone.current?.addEventListener("dragover", (evt) => {
      evt.preventDefault();
    });
    dropzone.current?.addEventListener("drop", submitDroppedImage);

    if (editing) {
      if (userPost.id !== "invalid data") {
        setPostContent(userPost.content);
        setPostImageUrl(userPost.imageUrl);
        setPostTitle(userPost.title);
      }
    }
  }, []);

  return (
    <>
      <input
        accept="image/*"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          const file = evt.target.files?.[0];
          if (!file) return;
          // Aqui é criado uma url local apenas para ficar "legível" ao usuário, não é necessário trabalhar com esta linha
          const postContentImage: IPostContentImage = {
            localUrl: URL.createObjectURL(file),
            file: file,
          };

          submitPostContentImage(postContentImage);
        }}
        type="file"
        hidden
        ref={fileInput}
      />
      <Header items={false}>
        <div className="w-full px-[161px] flex justify-between">
          {user && (
            <UserCard.Root>
              <UserCard.Infos
                userName={user.data.email}
                userAvatar={user.data.avatarUrl ? user.data.avatarUrl : "images/user.png"}
                userPostsNumber={user.data.postsNumber ? user.data.postsNumber : 0}
              />
              <DateInfo date={new Date().toDateString()} />
            </UserCard.Root>
          )}
        </div>
      </Header>
      <main className="w-full px-[161px] mt-[30px] flex flex-col pb-14">
        <div className="gap-3 flex flex-col">
          <Form.Label text="Selecione as categorias do post:" />
          <HandleBadges />
        </div>
        <Form.Root className="mt-[10px]">
          <Form.Label text="Imagem do post:" />
          <Form.Input
            twPaddingX="p-0"
            type="file"
            accept="image/*"
            onChange={(evt) => {
              const file = evt.target.files?.[0];
              file && submitPostImage(file);
              !file && setPostImageUrl("");
            }}
          />
        </Form.Root>
        <Form.Root className="">
          <Form.Label text="Título do post:" id="" />
          <Form.Input
            value={postTitle}
            onChange={(evt) => setPostTitle(evt.target.value)}
            placeholder="Digite o título do post"
          />
          <Form.Hint hintText="Essa será a frase que será filtrada ao pesquisar por esta postagem" />
        </Form.Root>
        <Toolbar
          fileInput={fileInput}
          highlightedTxt={highlightedTxt}
          setHighlightedTxt={setHighlightedTxt}
          setContent={setPostContent}
        />
        <Form.Root
          className={clsx("mt-[10px] mb-[16px]", {
            "gap-3": htmlPreview,
          })}
          twFlexDirection="flex-row"
        >
          <div ref={dropzone} className="w-full">
            <Form.Input
              textarea
              placeholder="Qual o assunto de hoje?"
              twMinHeightTextArea="min-h-[480px]"
              onChangeTextarea={(evt) => setPostContent(evt.target.value)}
              value={postContent}
              className="relative"
            >
              <Form.InputIcon
                absolute
                size={24}
                icon={htmlPreview ? EyeOff : Eye}
                onClick={() => setHtmlPreview(!htmlPreview)}
              />
            </Form.Input>
          </div>
          <StyledMarkdown>
            <ScrollShadow className={htmlPreview ? "w-[430px] 2xl:w-[700px]" : "hidden"}>
              <Markdown>{`${postTitle !== "" ? "#" : ""} ${postTitle}`}</Markdown>
              {postImageUrl !== "" && <Markdown>{`![imagem do post](${postImageUrl})`}</Markdown>}
              <Markdown>{postContent}</Markdown>
            </ScrollShadow>
          </StyledMarkdown>
        </Form.Root>
        <SubmitPostButton submitPostFunction={submitPost} />
      </main>
    </>
  );
}

function SubmitPostButton({ submitPostFunction }: { submitPostFunction: () => void }) {
  const [sending, setSending] = useState<boolean>(false);

  return (
    <Button.Root
      disabled={sending}
      type="submit"
      onClick={() => {
        setSending(true);
        submitPostFunction();
      }}
    >
      <Button.Text content="Enviar" />
    </Button.Root>
  );
}
