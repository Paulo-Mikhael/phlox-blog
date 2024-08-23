import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRecoilValue } from "recoil";
import Markdown from "markdown-to-jsx";
import { v4 as uuidV4 } from "uuid";
import clsx from "clsx";
import { http } from "../http";
import { IImage, IPost, IPostBadges } from "../interfaces/IPost";
import { encodeImageToBase64 } from "../utils/base64Encoder";
import { HandleBadges } from "../utils/HandleBadges";
import { DateInfo } from "../utils/DateInfo";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import { handleBadgeItems } from "../state/atom";
import { UserCardInfos } from "../components/UserCard";
import { Form } from "../components/Form";
import { Toolbar } from "../components/Toolbar";
import Header from "../components/Header";

export default function AddPost() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [newImageId, setNewImageId] = useState<string>("");
  const [highlightedTxt, setHighlightedTxt] = useState("");
  const [htmlPreview, setHtmlPreview] = useState<boolean>(false);
  // const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItems);

  // async function submitPost(evt: React.FormEvent<HTMLFormElement>) {
  //   evt.preventDefault();

  //   if (base64 === "") return;

  //   const newPostId = uuidV4();

  //   const newImage: IImage = {
  //     id: newImageId,
  //     base64String: base64
  //   }
  //   const newPost: IPost = {
  //     id: newPostId,
  //     imageUrl: `images/${newImageId}`,
  //     title: "",
  //     postDate: new Date(),
  //     content: postContent,
  //     badges: {
  //       defaultBadges: {
  //         storyPressed: handleBadgesItems.defaultBadges.storyPressed,
  //         newsPressed: handleBadgesItems.defaultBadges.newsPressed,
  //         programationPressed: handleBadgesItems.defaultBadges.programationPressed,
  //         offerPressed: handleBadgesItems.defaultBadges.offerPressed,
  //         tecnologyPressed: handleBadgesItems.defaultBadges.tecnologyPressed,
  //         opportunityPressed: handleBadgesItems.defaultBadges.opportunityPressed,
  //       },
  //       personalizedBadges: [...handleBadgesItems.personalizedBadges]
  //     }
  //   }

  //   await http.post("images", newImage)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setPostTitle("");
  //       setPostContent("");
  //     });

  //   await http.post("posts", newPost)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setPostTitle("");
  //       setPostContent("");
  //     });
  // }

  useEffect(() => {
    if (!image) return;

    encodeImageToBase64(image)
      .then((base64Image) => {
        setBase64(base64Image);
        setNewImageId(uuidV4());
        setImage(null);
      }).catch(error => {
        console.error("Erro ao codificar imagem:", error);
      });
  }), [image];

  useEffect(() => {
    if (postContent.trim() === "") {
      setHighlightedTxt("");
    }
  }, [postContent]);

  return (
    <>
      <input
        onChange={(evt) => {
          const file = evt.target.files?.[0].type.startsWith("image") ? evt.target.files?.[0] : null;
          setImage(file);
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
      </main>
    </>
  );
}