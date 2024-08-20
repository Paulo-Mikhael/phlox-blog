import { ElementType, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidV4 } from "uuid";
import { handleBadgeItems } from "../state/atom";
import { IImage, IPost, IPostBadges } from "../interfaces/IPost";
import { encodeImageToBase64 } from "../utils/base64Encoder";
import { http } from "../http";
import { UserCardInfos } from "../components/UserCard";
import Header from "../components/Header";
import { DateInfo } from "../utils/DateInfo";
import { Form } from "../components/Form";
import { Bold, Eraser, ImagePlus, ImageUp, Italic, Link, List, ListOrdered, Type } from "lucide-react";
import { colors } from "../styles/variables";
import styled from "styled-components";
import { HandleBadges } from "../utils/HandleBadges";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import Markdown from "react-markdown";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

const StyledLine = styled.div`
  height: 24px;
  width: 2px;
  background-color: ${colors.typo[500]};
`

export default function AddPost() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [newImageId, setNewImageId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toolbarItems, setToolbarItems] = useState<{ icon: ElementType, onClick?: () => void }[]>([
    {
      icon: Type,
      onClick: () => {
        setPostContent(prv => prv + "#");
      }
    },
    {
      icon: Bold,
      onClick: () => {
      }
    },
    {
      icon: Italic,
      onClick: () => null
    },
    {
      icon: List,
      onClick: () => null
    },
    {
      icon: ListOrdered,
      onClick: () => null
    },
    {
      icon: ImagePlus,
      onClick: () => null
    },
    {
      icon: ImageUp,
      onClick: () => null
    },
    {
      icon: Link,
      onClick: () => null
    }
  ]);
  const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItems);

  async function submitPost(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsLoading(true);

    if (base64 === "") return;

    const newPostId = uuidV4();

    const newImage: IImage = {
      id: newImageId,
      base64String: base64
    }
    const newPost: IPost = {
      id: newPostId,
      imageUrl: `images/${newImageId}`,
      title: "",
      postDate: new Date(),
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

    await http.post("images", newImage)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPostTitle("");
        setPostContent("");
        setIsLoading(false);
      });

    await http.post("posts", newPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPostTitle("");
        setPostContent("");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!image) return;

    encodeImageToBase64(image).then((base64Image) => {
      setBase64(base64Image);
      setNewImageId(uuidV4());
    }).catch(error => {
      console.error("Erro ao codificar imagem:", error);
    });
  }), [image];

  return (
    <>
      <Header items={false}>
        <div className="w-full px-[161px] flex justify-between">
          <UserCardInfos userAvatar="images/user.png" userName="Usuário" userPostsNumber={0} />
          <DateInfo date={new Date().toDateString()} />
        </div>
      </Header>
      <main className="w-full px-[161px] mt-[50px] flex flex-col pb-14">
        <Form.Root className="gap-3">
          <Form.Label text="Selecione as categorias do post:" />
          <HandleBadges />
        </Form.Root>
        <Form.Root className="mt-[10px]">
          <Form.Label text="Título do post:" id="" />
          <Form.Input value={postTitle} onChange={(evt) => setPostTitle(evt.target.value)} placeholder="Digite o título do post" />
          <Form.Hint hintText="Essa será a frase que será filtrada ao pesquisar esta postagem" />
        </Form.Root>
        <span className="h-[40px] bg-typo-200 rounded-[10px] flex justify-between items-center px-3 mt-[20px]">
          <div className="h-full flex items-center gap-2">
            {toolbarItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <item.icon 
                  className="cursor-pointer" 
                  color={colors.typo[600]} 
                  size={22} 
                  onClick={item.onClick}
                />
                <StyledLine />
              </div>
            ))}
          </div>
          <Eraser className="cursor-pointer" color={colors.redMain[300]} size={22} />
        </span>
        <Form.Root className="mt-[10px] gap-3" twFlexDirection="flex-row">
          <Form.Input
            textarea
            placeholder="Qual o assunto de hoje?"
            twMinHeightTextArea="min-h-[480px]"
            onChangeTextarea={(evt) => setPostContent(evt.target.value)}
            value={postContent}
          />
          <StyledMarkdown>
            <ScrollShadow className="w-[430px]">
              <Markdown>
                {`# ${postTitle}`}
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