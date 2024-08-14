import { useEffect, useState } from "react";
import { v4 as uuidV4, v4 } from "uuid";
import { IPost } from "../interfaces/IPost";
import { Badge } from "../components/Bagde";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Link } from "react-router-dom";
import { http } from "../http";
import { IPersonalizedBadge } from "../interfaces/IBadge";

export default function AddPost() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [personalizedTags, setPersonalizedTags] = useState<IPersonalizedBadge[]>([]);
  const [storyPressed, setStoryPressed] = useState<boolean>(false);
  const [newsPressed, setNewsPressed] = useState<boolean>(false);
  const [programationPressed, setProgramationPressed] = useState<boolean>(false);
  const [offerPressed, setOfferPressed] = useState<boolean>(false);
  const [tecnologyPressed, setTecnologyPressed] = useState<boolean>(false);
  const [opportunityPressed, setOpportunityPressed] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");

  async function submitPost(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!image) return;

    const readFile = new FileReader(); // Cria um novo objeto FileReader para ler o arquivo de imagem.

    readFile.onload = function (event) { // Define uma função de retorno de chamada a ser executada quando a leitura do arquivo for concluída.
      const baseMeiaQuatro = event.target?.result as string; // Obtém o resultado da leitura (base64) como uma string.
      setBase64(baseMeiaQuatro); // Define o estado com a string base64.
    };

    readFile.readAsDataURL(image); // Inicia a leitura do arquivo de imagem como um URL de dados. OBS: "image" é do tipo File

    if (base64 === "") return;

    const newPost: IPost = {
      id: uuidV4(),
      image: base64,
      title: postTitle,
      postDate: new Date(),
      content: postContent,
      badges: {
        defaultBadges: {
          storyPressed: storyPressed,
          newsPressed: newsPressed,
          programationPressed: programationPressed,
          offerPressed: offerPressed,
          tecnologyPressed: tecnologyPressed,
          opportunityPressed: opportunityPressed,
        },
        personalizedBadges: [...personalizedTags]
      }
    }

    await http.post("posts", newPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setPostTitle("");
    setPostContent("");
    setPersonalizedTags([]);
  }

  useEffect(() => {
    console.log(image);
  }, [image]);
  useEffect(() => {
    console.log(base64);
  }, [base64]);

  return (
    <Form.Root className="gap-2 p-4" onSubmit={(evt) => submitPost(evt)}>
      <Form.Label text="Título do Post:" />
      <Form.Input
        onChange={(evt) => setPostTitle(evt.target.value)} value={postTitle}
      />
      <Form.Label text="Conteúdo do Post:" />
      <Form.Input
        onChange={(evt) => setPostContent(evt.target.value)} value={postContent}
      />
      <Form.Label text="Categorias/Badges do Post:" />
      <div className="flex gap-2 flex-wrap">
        <Badge.HandlePress onClick={() => setStoryPressed(!storyPressed)} children={<Badge.Story />} />
        <Badge.HandlePress onClick={() => setNewsPressed(!newsPressed)} children={<Badge.News />} />
        <Badge.HandlePress onClick={() => setProgramationPressed(!programationPressed)} children={<Badge.Programation />} />
        <Badge.HandlePress onClick={() => setOfferPressed(!offerPressed)} children={<Badge.Offer />} />
        <Badge.HandlePress onClick={() => setTecnologyPressed(!tecnologyPressed)} children={<Badge.Tecnology />} />
        <Badge.HandlePress onClick={() => setOpportunityPressed(!opportunityPressed)} children={<Badge.Opportunity />} />
        {personalizedTags.map((item, index) => (
          <Badge.HandlePress 
            key={index} 
            pressed={item.pressed} 
            children={<Badge.Personalize text={item.title}/>}
            onClick={() => {
              setPersonalizedTags(previous => previous.map(badge => {
                return {
                  id: badge.id,
                  title: badge.title,
                  pressed: badge.id === item.id ? !badge.pressed : badge.pressed
                }
              }));
            }}
          />
        ))}
        <Badge.Root children={
          <Badge.Add onClick={() => { setPersonalizedTags(previous => [...previous, { id: uuidV4(), title: "Tag Personalizada", pressed: false }]) }} />
        } />
      </div>
      <Form.Input
        type="file"
        onChange={(evt) => setImage(evt.target.files?.[0].type.startsWith("image") ? evt.target.files?.[0] : null)}
        twPaddingX="p-0"
      />
      <Button.Root type="submit">
        <Button.Text content="Postar" />
      </Button.Root>
      <Link to="/">
        Voltar
      </Link>
      {personalizedTags.map((item, index) => (
        <p key={index}>
          Título: {item.title}; Pressionado: {item.pressed ? "Sim" : "Não"};
        </p>
      ))}
      <p>
        {postTitle}
      </p>
    </Form.Root>
  );
}