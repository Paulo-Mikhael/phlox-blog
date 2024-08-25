import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { v4 as uuidV4 } from "uuid";
import { ref as refDb, set } from "firebase/database";
import { getDownloadURL, ref as refStorage, uploadBytes } from "firebase/storage";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { IPostBadges } from "../interfaces/IPost";
import { handleBadgeItems } from "../state/atom";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import { firebaseRealtimeDatabase, firebaseStorage } from "../utils/firebase";
import { HandleBadges } from "../utils/HandleBadges";
import { DateInfo } from "../utils/DateInfo";
import { UserCardInfos } from "../components/UserCard";
import { Toolbar } from "../components/Toolbar";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import Header from "../components/Header";

export default function AddPost() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [postImageUrl, setPostImageUrl] = useState<string>("");
  const [highlightedTxt, setHighlightedTxt] = useState("");
  const [htmlPreview, setHtmlPreview] = useState<boolean>(false);
  const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItems);
  const db = firebaseRealtimeDatabase;
  const storage = firebaseStorage;

  async function submitPost() {
    const newPostId = uuidV4();
    const newPost = {
      id: newPostId,
      imageUrl: postImageUrl,
      title: postTitle,
      postDate: new Date().toString(),
      content: postContent,
      badges: {
        defaultBadges: {
          storyPressed: handleBadgesItems.defaultBadges.storyPressed,
          newsPressed: handleBadgesItems.defaultBadges.newsPressed,
          programationPressed: handleBadgesItems.defaultBadges.programationPressed,
          offerPressed: handleBadgesItems.defaultBadges.offerPressed,
          tecnologyPressed: handleBadgesItems.defaultBadges.tecnologyPressed,
          opportunityPressed: handleBadgesItems.defaultBadges.opportunityPressed,
        },
        personalizedBadges: [...handleBadgesItems.personalizedBadges]
      }
    }

    set(refDb(db, "posts/" + uuidV4()), newPost)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostTitle("");
        setPostContent("");
      });
  }

  function submitImage(image: File){
    if (!image) return;

    const storageRef = refStorage(storage, `images/${image.name.trim()}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot);

        getDownloadURL(storageRef)
          .then((url) => {
            setPostImageUrl(url);
          });
      });
  }

  useEffect(() => {
    if (postContent.trim() === "") {
      setHighlightedTxt("");
    }
  }, [postContent]);

  return (
    <>
      <input
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          const file = evt.target.files?.[0].type.startsWith("image") ? evt.target.files?.[0] : null;
          file && submitImage(file);
          // Aqui é criado uma url local apenas para ficar "legível" ao usuário, não é necessário trabalhar com esta linha
          setPostContent(prv => prv + ` ![desc](${file && URL.createObjectURL(file)})`);
        }}
        type="file"
        hidden
        ref={fileInput}
      />
      <Header items={false}>
        <div className="w-full px-[161px] flex justify-between">
          <UserCardInfos userAvatar="images/user.png" userName="Usuário" userPostsNumber={0} />
          <DateInfo date={new Date().toDateString()} />
        </div>
      </Header>
      <main className="w-full px-[161px] mt-[30px] flex flex-col pb-14">
        <div className="gap-3 flex flex-col">
          <Form.Label text="Selecione as categorias do post:" />
          <HandleBadges />
        </div>
        <Form.Root className="mt-[10px]">
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