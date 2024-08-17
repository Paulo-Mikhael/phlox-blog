import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Link } from "react-router-dom";
import { http } from "../http";
import { HandleBadges } from "../utils/HandleBadges";
import { useRecoilValue } from "recoil";
import { handleBadgeItems } from "../state/atom";
import { MarkdownToHtml } from "../utils/markdownToHtml";
import Markdown from "react-markdown";

export default function AddPost() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBadgesItems: IPostBadges = useRecoilValue(handleBadgeItems);

  async function submitPost(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsLoading(true);

    if (base64 === "") return;

    const newPost: IPost = {
      id: uuidV4(),
      image: base64,
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

    const readFile = new FileReader(); // Cria um novo objeto FileReader para ler o arquivo de imagem.

    readFile.onload = function (event) { // Define uma função de retorno de chamada a ser executada quando a leitura do arquivo for concluída.
      const baseMeiaQuatro = event.target?.result as string; // Obtém o resultado da leitura (base64) como uma string.
      setBase64(baseMeiaQuatro); // Define o estado com a string base64.
    };

    readFile.readAsDataURL(image); // Inicia a leitura do arquivo de imagem como um URL de dados. OBS: "image" é do tipo File
  }), [image];

  return (
    <Form.Root className="gap-2 p-4" onSubmit={(evt) => submitPost(evt)}>
      <Form.Label text="Título do Post:" />
      <Form.Input
        onChange={(evt) => setPostTitle(evt.target.value)}
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
      <Markdown>{postContent}</Markdown>
    </Form.Root>
  );
}