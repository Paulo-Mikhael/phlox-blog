import { Search, User } from "lucide-react";
import { Badge } from "../Bagde";
import { Form } from "../Form";
import { SimpleCard } from "../SimpleCard";

export default function Posts() {
  return (
    <aside className="flex flex-col gap-5 w-[320px]">
      <Form.Root>
        <Form.Label text="Pesquisar post:" />
        <Form.Input placeholder="Digite o título do post..." iconRight={Search} />
      </Form.Root>
      <SimpleCard title="Categorias">
        <div className="flex gap-2 flex-wrap">
          <Badge text="História" twBackgroundColor="bg-badge-history" removeButton />
          <Badge text="Oferta" twBackgroundColor="bg-badge-offer" removeButton />
          <Badge text="Notícia" twBackgroundColor="bg-badge-news" removeButton />
          <Badge text="Tecnologia" twBackgroundColor="bg-badge-tecnology" removeButton />
          <Badge text="Programação" twBackgroundColor="bg-badge-programation" removeButton />
          <Badge text="Oportunidade" twBackgroundColor="bg-badge-oportunity" removeButton />
          <Badge removeButton />
        </div>
      </SimpleCard>
      <SimpleCard title="Usuários">
        <Form.Root>
          <Form.Input placeholder="Pesquisar usuário..." iconRight={User} />
        </Form.Root>
      </SimpleCard>
    </aside>
  );
}