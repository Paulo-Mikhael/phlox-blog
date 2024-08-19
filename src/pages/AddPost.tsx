import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { IImage, IPost, IPostBadges } from "../interfaces/IPost";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Link } from "react-router-dom";
import { http } from "../http";
import { HandleBadges } from "../utils/HandleBadges";
import { useRecoilValue } from "recoil";
import { handleBadgeItems } from "../state/atom";
import Markdown from "react-markdown";
import { encodeImageToBase64 } from "../utils/base64Encoder";
import { StyledMarkdown } from "../styles/StyledMarkdown";
import { languages } from "../data/languages";

export default function AddPost() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [newImageId, setNewImageId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      title: postTitle,
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
    <Form.Root className="gap-2 p-4" onSubmit={(evt) => submitPost(evt)}>
      <Form.Label text="Título do Post:" />
      <Form.Input
        onChange={(evt) => setPostTitle(evt.target.value.replace("#", ""))}
        value={postTitle}
      />
      <Form.Label text="Conteúdo do Post:" />
      <Form.Input
        textarea
        onChangeTextarea={(evt) => setPostContent(evt.target.value)}
        value={postContent}
      />
      <Form.Label text="Categorias/Badges do Post:" />
      <HandleBadges />
      <Form.Input
        type="file"
        onChange={(evt) => setImage(evt.target.files?.[0].type.startsWith("image") ? evt.target.files?.[0] : null)}
        twPaddingX="p-0"
      />
      <Button.Root isLoading={isLoading} type="submit">
        <Button.Text content="Postar" />
      </Button.Root>
      <Link to="/">
        Voltar
      </Link>
      <StyledMarkdown $languages={languages}>
        <Markdown>{`# ${postTitle}`}</Markdown>
        <Markdown>{postContent}</Markdown>
      </StyledMarkdown>
    </Form.Root>
  );
}