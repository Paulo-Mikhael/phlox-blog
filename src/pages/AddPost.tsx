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
import { insertToStorage } from "../utils/firebase/functions/insertToStorage";
import { getUrlFromStorage } from "../utils/firebase/functions/getUrlFromStorage";
import { UserCard } from "../components/UserCard";

interface IPostContentImage {
  localUrl: string,
  file: File,
  databaseUrl?: string
}

export default function AddPost() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postImageUrl, setPostImageUrl] = useState<string>("");
  const [postContentImages, setPostContentImages] = useState<IPostContentImage[]>([]);
  const [highlightedTxt, setHighlightedTxt] = useState("");
  const [htmlPreview, setHtmlPreview] = useState<boolean>(false);
  const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItemsState);
  const user = useRecoilValue(actualUserState);

  async function submitPost() {
    if (!user) {
      console.log("sem usuário");
      return;
    };

    changeContentUrls();

    const newPostId = uuidV4();
    const newPost: IPost = {
      id: newPostId,
      imageUrl: postImageUrl,
      title: postTitle,
      postDate: new Date().toString(),
      content: postContent,
      badges: handleBadgesItems
    }

    insertToDatabase(`users/${user.data.id}/posts/${newPost.id}`, newPost)
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setPostTitle("");
        setPostContent("");
        setPostImageUrl("");
      });
  }

  function submitPostImage(image: File) {
    if (!image) return;
    const path = `images/${image.name.trim()}`;

    insertToStorage(path, image)
      .then(() => {
        getUrlFromStorage(path)
          .then((url) => {
            setPostImageUrl(url);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function submitPostContentImage(postContentImage: IPostContentImage) {
    if (!postContentImage) return;

    setPostContent(prv => prv + ` ![desc](${postContentImage.localUrl})`);
    const path = `images/${postContentImage.file.name.trim()}`;

    insertToStorage(path, postContentImage.file)
      .then(() => {
        getUrlFromStorage(path)
          .then((url) => {
            setPostContentImages(prv => [...prv, { ...postContentImage, databaseUrl: url }]);
            console.log(postContentImages);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  function changeContentUrls() {
    for (let i = 0; i < postContentImages.length; i++) {
      const localUrl = postContentImages[i].localUrl;
      const databaseUrl = postContentImages[i].databaseUrl;
      databaseUrl && setPostContent(prv => prv.replace(localUrl, databaseUrl));
    };
  }

  useEffect(() => {
    if (postContent.trim() === "") {
      setHighlightedTxt("");
    }
  }, [postContent]);

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
            file: file
          }

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
              <UserCard.Infos userName={user.data.email} userAvatar={user.data.avatarUrl ? user.data.avatarUrl : "images/user.png"} userPostsNumber={user.data.postsNumber ? user.data.postsNumber : 0} />
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
          <Form.Input value={postTitle} onChange={(evt) => setPostTitle(evt.target.value)} placeholder="Digite o título do post" />
          <Form.Hint hintText="Essa será a frase que será filtrada ao pesquisar por esta postagem" />
        </Form.Root>
        <Toolbar fileInput={fileInput} highlightedTxt={highlightedTxt} setHighlightedTxt={setHighlightedTxt} setContent={setPostContent} />
        <Form.Root
          className={clsx(
            "mt-[10px]",
            {
              "gap-3": htmlPreview
            }
          )}
          twFlexDirection="flex-row"
        >
          <Form.Input
            textarea
            placeholder="Qual o assunto de hoje?"
            twMinHeightTextArea="min-h-[480px]"
            onChangeTextarea={(evt) => setPostContent(evt.target.value)}
            value={postContent}
          >
            <Form.InputIcon size={24} icon={htmlPreview ? EyeOff : Eye} onClick={() => setHtmlPreview(!htmlPreview)} />
          </Form.Input>
          <StyledMarkdown>
            <ScrollShadow className={htmlPreview ? "w-[430px] 2xl:w-[700px]" : "hidden"}>
              <Markdown>
                {`${postTitle !== "" ? "#" : ""} ${postTitle}`}
              </Markdown>
              {postImageUrl !== "" && (
                <Markdown>
                  {`![imagem do post](${postImageUrl})`}
                </Markdown>
              )}
              <Markdown>
                {postContent}
              </Markdown>
            </ScrollShadow>
          </StyledMarkdown>
        </Form.Root>
        <Form.Root className="mt-3" onSubmit={() => submitPost()}>
          <Button.Root type="submit">
            <Button.Text content="Enviar" />
          </Button.Root>
        </Form.Root>
      </main>
    </>
  );
}